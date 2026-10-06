@echo off
setlocal EnableExtensions
title Bliss Acaiteria - Instalador do Agente da Balanca
set "BLISS_DIR=C:\BlissAcaiteria"

echo ============================================================
echo   BLISS ACAITERIA - INSTALADOR DO AGENTE DA BALANCA
echo ============================================================
echo.

if not exist "%~dp0bliss-agente-balanca.py" (
  echo [ERRO] Nao encontrei bliss-agente-balanca.py na mesma pasta.
  pause
  exit /b 1
)
if not exist "%~dp0bliss-scale-config.py" (
  echo [ERRO] Nao encontrei bliss-scale-config.py na mesma pasta.
  echo Use o pacote pronto entregue junto com este instalador.
  pause
  exit /b 1
)

call :LOCALIZAR_PYTHON
if not defined BLISS_PYTHON (
  echo.
  echo ============================================================
  echo   PRIMEIRA ETAPA: INSTALAR O PYTHON
  echo ============================================================
  echo.
  echo O Python e necessario uma unica vez neste computador para ler a balanca.
  echo.
  echo [A] Instalar automaticamente agora pelo Windows
  echo [M] Abrir o site oficial e instalar manualmente
  choice /C AM /N /M "Escolha A ou M: "
  if errorlevel 2 goto INSTALACAO_MANUAL
  goto INSTALACAO_AUTOMATICA
)

goto PYTHON_PRONTO

:INSTALACAO_AUTOMATICA
where winget >nul 2>nul
if errorlevel 1 (
  echo.
  echo O instalador automatico do Windows nao esta disponivel neste computador.
  echo Vou abrir a instalacao manual do site oficial.
  goto INSTALACAO_MANUAL
)
echo.
echo O Windows vai baixar e instalar o Python. Aguarde ate aparecer "Successfully installed".
winget install --id Python.Python.3.12 --exact --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
  echo.
  echo Nao foi possivel concluir a instalacao automatica.
  echo Verifique a internet e tente novamente, ou use a opcao manual.
  pause
  exit /b 1
)
call :LOCALIZAR_PYTHON
if not defined BLISS_PYTHON (
  echo.
  echo O Python foi instalado, mas o Windows ainda nao o adicionou a esta janela.
  echo Feche esta janela e execute novamente este mesmo instalador.
  pause
  exit /b 0
)
goto PYTHON_PRONTO

:INSTALACAO_MANUAL
echo.
echo Siga exatamente estes passos na pagina que sera aberta:
echo  1. Clique em "Download Python 3".
echo  2. Abra o arquivo baixado.
echo  3. MARQUE a caixa "Add python.exe to PATH" na primeira tela.
echo  4. Clique em "Install Now" e espere finalizar.
echo  5. Feche esta janela e execute este instalador de novo.
echo.
start "" "https://www.python.org/downloads/windows/"
pause
exit /b 0

:PYTHON_PRONTO

echo Python encontrado:
%BLISS_PYTHON% -c "import sys; print(sys.executable)"
echo.
echo Instalando bibliotecas necessarias...
%BLISS_PYTHON% -m ensurepip --upgrade >nul 2>nul
%BLISS_PYTHON% -m pip install --user --upgrade pyserial requests
if errorlevel 1 (
  echo [ERRO] Nao foi possivel instalar pyserial e requests.
  pause
  exit /b 1
)

if not exist "%BLISS_DIR%" mkdir "%BLISS_DIR%"
if not exist "%BLISS_DIR%" (
  echo [ERRO] Nao foi possivel criar %BLISS_DIR%.
  pause
  exit /b 1
)

copy /Y "%~dp0bliss-agente-balanca.py" "%BLISS_DIR%\bliss-agente-balanca.py" >nul
if exist "%BLISS_DIR%\bliss-scale-config.py" (
  echo Configuracao existente preservada para nao substituir o token.
) else (
  copy /Y "%~dp0bliss-scale-config.py" "%BLISS_DIR%\bliss-scale-config.py" >nul
)
copy /Y "%BLISS_DIR%\bliss-scale-config.py" "%BLISS_DIR%\bliss_scale_config.py" >nul

> "%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat" echo @echo off
>>"%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat" echo setlocal EnableExtensions
>>"%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat" echo copy /Y "%BLISS_DIR%\bliss-scale-config.py" "%BLISS_DIR%\bliss_scale_config.py" ^>nul
>>"%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat" echo %BLISS_PYTHON% "%BLISS_DIR%\bliss-agente-balanca.py" ^>^> "%BLISS_DIR%\agente-balanca.log" 2^>^&1
>>"%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat" echo endlocal

> "%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs" echo Option Explicit
>>"%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs" echo Dim shell
>>"%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs" echo Set shell = CreateObject("WScript.Shell")
>>"%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs" echo shell.Run """%BLISS_DIR%\Executar-Agente-Balanca-Bliss.bat""", 0, False

> "%BLISS_DIR%\Iniciar-Balanca-Bliss.bat" echo @echo off
>>"%BLISS_DIR%\Iniciar-Balanca-Bliss.bat" echo start "" /b wscript.exe "%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs"
>>"%BLISS_DIR%\Iniciar-Balanca-Bliss.bat" echo exit /b 0

> "%BLISS_DIR%\Diagnostico-Balanca-Bliss.bat" echo @echo off
>>"%BLISS_DIR%\Diagnostico-Balanca-Bliss.bat" echo title Diagnostico da Balanca - Bliss Acaiteria
>>"%BLISS_DIR%\Diagnostico-Balanca-Bliss.bat" echo copy /Y "%BLISS_DIR%\bliss-scale-config.py" "%BLISS_DIR%\bliss_scale_config.py" ^>nul
>>"%BLISS_DIR%\Diagnostico-Balanca-Bliss.bat" echo %BLISS_PYTHON% "%BLISS_DIR%\bliss-agente-balanca.py"
>>"%BLISS_DIR%\Diagnostico-Balanca-Bliss.bat" echo pause

set "BLISS_STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
if exist "%BLISS_STARTUP%" (
  copy /Y "%BLISS_DIR%\Iniciar-Balanca-Bliss.vbs" "%BLISS_STARTUP%\Bliss-Agente-Balanca.vbs" >nul
) else (
  echo [AVISO] Nao encontrei a pasta Inicializar do Windows. O agente continua instalado, mas nao foi possivel criar a inicializacao automatica.
)

echo.
echo ============================================================
echo   INSTALACAO CONCLUIDA
echo ============================================================
echo Pasta: %BLISS_DIR%
echo Porta configurada: COM4 - 9600 bps - 8N1 - fluxo por hardware
echo Inicializacao automatica: configurada para iniciar sem janela ao entrar no Windows.
echo Para iniciar agora sem janela, abra: %BLISS_DIR%\Iniciar-Balanca-Bliss.vbs
echo Para conferir mensagens da balanca, abra: %BLISS_DIR%\Diagnostico-Balanca-Bliss.bat
echo.
pause
endlocal
exit /b 0

:LOCALIZAR_PYTHON
set "BLISS_PYTHON="
where py >nul 2>nul
if not errorlevel 1 (
  py -3 -c "import sys; print(sys.executable)" >nul 2>nul
  if not errorlevel 1 set "BLISS_PYTHON=py -3"
)
if not defined BLISS_PYTHON (
  where python >nul 2>nul
  if not errorlevel 1 (
    python -c "import sys; print(sys.executable)" >nul 2>nul
    if not errorlevel 1 set "BLISS_PYTHON=python"
  )
)
if not defined BLISS_PYTHON if exist "%LocalAppData%\Programs\Python\Python312\python.exe" set "BLISS_PYTHON=%LocalAppData%\Programs\Python\Python312\python.exe"
if not defined BLISS_PYTHON if exist "%LocalAppData%\Programs\Python\Python313\python.exe" set "BLISS_PYTHON=%LocalAppData%\Programs\Python\Python313\python.exe"
exit /b 0
