param(
  [Parameter(Mandatory=$true)][string]$Porta,
  [Parameter(Mandatory=$true)][string]$Chave,
  [string]$Url = "https://prime-acai.wpnz.com.br/api/scale/weight",
  [int]$BaudRate = 9600
)

# Prix 3 Toledo: 8 bits, sem paridade e 1 stop bit. O protocolo Prt1/Prt3
# responde ao caractere ENQ (0x05) com STX + peso + ETX.
$serial = [System.IO.Ports.SerialPort]::new($Porta,$BaudRate,[System.IO.Ports.Parity]::None,8,[System.IO.Ports.StopBits]::One)
$serial.ReadTimeout = 1200
$serial.NewLine = "`r"
$serial.Open()
Write-Host "Ponte Prix 3 conectada em $Porta. Ctrl+C para encerrar."

try {
  while ($true) {
    try {
      $serial.DiscardInBuffer()
      $serial.Write([byte[]](5),0,1) # ENQ
      $raw = $serial.ReadExisting()
      $deadline = (Get-Date).AddMilliseconds(900)
      while ((Get-Date) -lt $deadline -and $raw -notmatch [char]3) { Start-Sleep -Milliseconds 80; $raw += $serial.ReadExisting() }
      if ($raw -match "`u0002(\d{1,6})`u0003") {
        # Prt1/Prt3 enviam o peso sem ponto decimal; ajuste o divisor se a balança usar outra configuração.
        $grams = [int]$Matches[1]
        if ($grams -gt 0) {
          $body = @{ grams=$grams; captured_at=(Get-Date).ToUniversalTime().ToString('o') } | ConvertTo-Json -Compress
          Invoke-RestMethod -Method Post -Uri $Url -Headers @{ 'x-scale-key'=$Chave } -ContentType 'application/json' -Body $body | Out-Null
          Write-Host "Peso transmitido: $grams g"
          Start-Sleep -Milliseconds 700
        }
      }
    } catch { Write-Warning $_.Exception.Message; Start-Sleep -Seconds 2 }
  }
} finally { if ($serial.IsOpen) { $serial.Close() } }
