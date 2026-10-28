param(
    [int]$ExpectedBaud = 4800,
    [int]$ListenSeconds = 6,
    [int]$EnquirySeconds = 4
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$report = New-Object System.Collections.Generic.List[string]
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$desktop = [Environment]::GetFolderPath('Desktop')
if (-not $desktop -or -not (Test-Path -LiteralPath $desktop)) { $desktop = $env:TEMP }
$reportPath = Join-Path $desktop "Diagnostico-Balanca-Acailandia-$stamp.txt"

function Add-Report([string]$Text) {
    $line = "[$(Get-Date -Format 'HH:mm:ss')] $Text"
    $report.Add($line)
    Write-Host $line
}

function Get-ConfigValue([string]$Content, [string]$Name) {
    $pattern = '(?m)^\s*' + [regex]::Escape($Name) + '\s*=\s*(.*?)\s*$'
    $match = [regex]::Match($Content, $pattern)
    if ($match.Success) { return $match.Groups[1].Value.Trim().Trim('"').Trim("'") }
    return $null
}

function Read-SerialFor([System.IO.Ports.SerialPort]$Serial, [int]$Seconds, [System.Collections.Generic.List[byte]]$Bytes) {
    $until = [DateTime]::UtcNow.AddSeconds($Seconds)
    while ([DateTime]::UtcNow -lt $until) {
        $available = $Serial.BytesToRead
        if ($available -gt 0) {
            $buffer = New-Object byte[] ([Math]::Min($available, 4096))
            $read = $Serial.Read($buffer, 0, $buffer.Length)
            if ($read -gt 0) { $Bytes.AddRange([byte[]]$buffer[0..($read - 1)]) }
        } else {
            Start-Sleep -Milliseconds 40
        }
    }
}

function Get-ReadableRatio([byte[]]$Bytes) {
    if (-not $Bytes -or $Bytes.Length -eq 0) { return 0 }
    $readable = 0
    foreach ($byte in $Bytes) {
        if (($byte -ge 32 -and $byte -le 126) -or $byte -eq 9 -or $byte -eq 10 -or $byte -eq 13) { $readable++ }
    }
    return [Math]::Round(100 * $readable / $Bytes.Length, 1)
}

Add-Report 'DIAGNOSTICO PASSIVO DA BALANCA - ACAILANDIA PE'
Add-Report "Computador: $env:COMPUTERNAME | Windows: $([Environment]::OSVersion.VersionString) | PowerShell: $($PSVersionTable.PSVersion)"
Add-Report 'O teste nao grava configuracoes na balanca nem envia dados ao PDV.'
Add-Report 'O unico comando enviado durante o teste ativo e ENQ (byte 0x05), uma consulta de leitura.'

$agentConfigPath = 'C:\Acailandia\Balanca\acailandia-scale-config.py'
$configuredPort = $null
$configuredBaud = $null
if (Test-Path -LiteralPath $agentConfigPath) {
    $configText = Get-Content -LiteralPath $agentConfigPath -Raw
    $configuredPort = Get-ConfigValue $configText 'PORTA'
    $configuredBaudText = Get-ConfigValue $configText 'VELOCIDADE'
    if ($configuredBaudText -match '^\d+$') { $configuredBaud = [int]$configuredBaudText }
    Add-Report "Agente instalado: sim | porta=$configuredPort | velocidade=$configuredBaud bps | fluxo_hardware=$(Get-ConfigValue $configText 'FLUXO_HARDWARE') | UNIDADE=$(Get-ConfigValue $configText 'UNIDADE')"
} else {
    Add-Report 'Agente instalado: nao encontrei C:\Acailandia\Balanca\acailandia-scale-config.py.'
}

$ports = @([System.IO.Ports.SerialPort]::GetPortNames() | Sort-Object -Unique)
if ($ports.Count) { Add-Report "Portas seriais detectadas pelo Windows: $($ports -join ', ')" }
else { Add-Report 'ERRO: o Windows nao listou nenhuma porta serial. Confira USB, cabo e driver CH340.' }

try {
    $pnpPorts = @(Get-PnpDevice -Class Ports -ErrorAction Stop | Select-Object -ExpandProperty FriendlyName)
    if ($pnpPorts.Count) { Add-Report "Dispositivos PnP da classe Portas: $($pnpPorts -join ' | ')" }
} catch {
    Add-Report "Aviso: nao foi possivel consultar nomes PnP das portas ($($_.Exception.GetType().Name))."
}

if ($configuredBaud -and $configuredBaud -ne $ExpectedBaud) {
    Add-Report "DIVERGENCIA: agente configurado em $configuredBaud bps; velocidade informada para o teste: $ExpectedBaud bps. A balanca e o agente precisam usar a mesma velocidade."
}

$defaultPort = if ($configuredPort) { $configuredPort } else { 'COM10' }
$inputPort = Read-Host "Porta COM a testar [$defaultPort]"
$portName = if ([string]::IsNullOrWhiteSpace($inputPort)) { $defaultPort } else { $inputPort.Trim().ToUpperInvariant() }
if ($portName -notmatch '^COM\d+$') {
    Add-Report "ERRO: '$portName' nao parece uma porta COM valida. Relatorio salvo sem teste serial."
    $report | Set-Content -LiteralPath $reportPath -Encoding UTF8
    Write-Host "`nRelatorio: $reportPath"
    exit 2
}

$baudRates = @($ExpectedBaud, 9600, 2400, 19200) + @($configuredBaud)
$baudRates = @($baudRates | Where-Object { $_ -and $_ -gt 0 } | Select-Object -Unique)
Add-Report "Porta selecionada: $portName | velocidade esperada informada: $ExpectedBaud bps | testes: $($baudRates -join ', ') bps, 8N1"
Write-Host "`nMantenha um peso visivel na plataforma durante os testes. Feche o agente atual da balanca antes de continuar, se ele estiver em execucao."
Read-Host 'Quando estiver pronto, pressione ENTER para iniciar' | Out-Null

$results = New-Object System.Collections.Generic.List[object]
foreach ($baud in $baudRates) {
    foreach ($flow in @('Nenhum', 'RTS/CTS')) {
        $serial = $null
        $bytes = New-Object System.Collections.Generic.List[byte]
        $testLabel = "$portName / $baud bps / 8N1 / fluxo $flow"
        Add-Report "INICIO: $testLabel"
        try {
            $serial = New-Object System.IO.Ports.SerialPort($portName, $baud, [System.IO.Ports.Parity]::None, 8, [System.IO.Ports.StopBits]::One)
            $serial.ReadTimeout = 100
            $serial.WriteTimeout = 500
            if ($flow -eq 'RTS/CTS') { $serial.Handshake = [System.IO.Ports.Handshake]::RequestToSend }
            else { $serial.Handshake = [System.IO.Ports.Handshake]::None }
            $serial.Open()
            $cts = 'indisponivel'
            $dsr = 'indisponivel'
            try { $cts = [string]$serial.CtsHolding } catch {}
            try { $dsr = [string]$serial.DsrHolding } catch {}
            Add-Report "Porta aberta. Sinais CTS=$cts; DSR=$dsr. Escutando sem transmitir por $ListenSeconds s."
            Read-SerialFor $serial $ListenSeconds $bytes
            $passiveCount = $bytes.Count
            Add-Report "Recepcao passiva: $passiveCount byte(s)."
            try {
                $serial.Write([byte[]]@(5), 0, 1)
                Add-Report "Consulta ENQ enviada (0x05); escutando por $EnquirySeconds s."
                Read-SerialFor $serial $EnquirySeconds $bytes
            } catch {
                Add-Report "Nao foi possivel enviar/ler ENQ: $($_.Exception.GetType().Name): $($_.Exception.Message)"
            }
            $allBytes = $bytes.ToArray()
            $hex = if ($allBytes.Length) { [BitConverter]::ToString($allBytes) } else { '(nenhum byte)' }
            $text = if ($allBytes.Length) { [System.Text.Encoding]::GetEncoding(28591).GetString($allBytes) } else { '' }
            $visible = -join ($text.ToCharArray() | ForEach-Object { if ([char]::IsControl($_) -and $_ -notin @([char]9,[char]10,[char]13)) { '.' } else { [string]$_ } })
            $numbers = [regex]::Matches($visible, '[-+]?\d+(?:[.,]\d+)?') | ForEach-Object { $_.Value }
            $ratio = Get-ReadableRatio $allBytes
            Add-Report "TOTAL: $($allBytes.Length) byte(s) | texto imprimivel: $ratio% | numeros encontrados: $(if($numbers){$numbers -join ', '}else{'nenhum'})"
            Add-Report "HEX: $(if($hex.Length -gt 500){$hex.Substring(0,500)+' ... (truncado)'}else{$hex})"
            Add-Report "ASCII/Latin-1: $(if($visible.Length -gt 240){$visible.Substring(0,240)+' ... (truncado)'}else{$visible})"
            $results.Add([pscustomobject]@{ Baud=$baud; Flow=$flow; Bytes=$allBytes.Length; PassiveBytes=$passiveCount; ReadablePercent=$ratio; Error=$null })
        } catch {
            $message = $_.Exception.Message
            Add-Report "FALHA ao abrir/comunicar: $($_.Exception.GetType().Name): $message"
            if ($message -match 'denied|access|acesso|already|in use|em uso|nao permitido') {
                Add-Report 'A porta pode estar ocupada pelo agente atual. Feche o agente/Diagnostico antigo e rode este teste novamente.'
            }
            $results.Add([pscustomobject]@{ Baud=$baud; Flow=$flow; Bytes=0; PassiveBytes=0; ReadablePercent=0; Error=$message })
        } finally {
            if ($serial) {
                try { if ($serial.IsOpen) { $serial.Close() } } catch {}
                $serial.Dispose()
            }
        }
    }
}

$received = @($results | Where-Object { $_.Bytes -gt 0 } | Sort-Object Bytes -Descending)
if ($received.Count) {
    $best = $received[0]
    Add-Report "RESULTADO: foram recebidos dados em $($best.Baud) bps, fluxo $($best.Flow). Compare HEX/ASCII e o manual/modelo da balanca antes de alterar a configuracao do agente."
    if ($best.Baud -eq $ExpectedBaud) { Add-Report 'A comunicacao respondeu na velocidade informada para a balanca.' }
    else { Add-Report "A melhor resposta nao foi na velocidade informada ($ExpectedBaud bps); confirme o menu de comunicacao da balanca com o tecnico." }
} elseif ($results | Where-Object Error) {
    Add-Report 'RESULTADO: nenhuma configuracao abriu a porta com sucesso. O bloqueio de porta/driver deve ser resolvido antes de avaliar protocolo ou baud rate.'
} else {
    Add-Report 'RESULTADO: a porta abriu mas nao recebeu bytes em nenhum teste. Verifique cabo/adaptador, modo de transmissao/Prt da balanca e porta COM no equipamento.'
}
Add-Report 'Limite: o teste identifica resposta serial e compara parametros, mas nao altera nem confirma menus internos da balanca; para isso e necessario conferir o modelo e o menu do equipamento.'
$report | Set-Content -LiteralPath $reportPath -Encoding UTF8
Write-Host "`nRelatorio salvo em: $reportPath"
