@echo off
setlocal EnableExtensions
title Acailandia PE - Instalador da balanca
set "ACAI_DIR=C:\Acailandia\Balanca"
set "ACAI_STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

echo ============================================================
echo   ACAILANDIA PE - AGENTE DA BALANCA PRIX / TOLEDO
echo ============================================================
echo.
if not exist "%~dp0acailandia-agente-balanca.py" (echo [ERRO] Arquivo do agente nao encontrado. Extraia todo o ZIP.& pause & exit /b 1)
set /p ACAI_PORT=Porta COM da balanca [COM4]:
if not defined ACAI_PORT set "ACAI_PORT=COM4"
set /p ACAI_KEY=Cole a chave gerada no Painel do proprietario - Integracoes:
if not defined ACAI_KEY (echo [ERRO] A chave e obrigatoria. Gere-a no painel e execute novamente.& pause & exit /b 1)

call :LOCALIZAR_PYTHON
if not defined ACAI_PYTHON (
  where winget >nul 2>nul
  if errorlevel 1 (echo [ERRO] Instale Python 3.12 pelo site python.org e execute novamente.& start "" "https://www.python.org/downloads/windows/" & pause & exit /b 1)
  echo Instalando Python 3.12 pelo Windows. Aguarde...
  winget install --id Python.Python.3.12 --exact --source winget --accept-package-agreements --accept-source-agreements
  if errorlevel 1 (echo [ERRO] Instalacao do Python nao concluida.& pause & exit /b 1)
  call :LOCALIZAR_PYTHON
  if not defined ACAI_PYTHON (echo Feche esta janela e rode o instalador novamente para concluir.& pause & exit /b 0)
)

if not exist "%ACAI_DIR%" mkdir "%ACAI_DIR%"
if not exist "%ACAI_DIR%" (echo [ERRO] Nao foi possivel criar %ACAI_DIR%.& pause & exit /b 1)
copy /Y "%~dp0acailandia-agente-balanca.py" "%ACAI_DIR%\acailandia-agente-balanca.py" >nul
if errorlevel 1 (echo [ERRO] Nao foi possivel copiar o agente.& pause & exit /b 1)
> "%ACAI_DIR%\acailandia-scale-config.py" echo URL_PDV = "https://acailandia.wpnz.com.br"
>>"%ACAI_DIR%\acailandia-scale-config.py" echo TOKEN = "%ACAI_KEY%"
>>"%ACAI_DIR%\acailandia-scale-config.py" echo PORTA = "%ACAI_PORT%"
>>"%ACAI_DIR%\acailandia-scale-config.py" echo VELOCIDADE = 9600
>>"%ACAI_DIR%\acailandia-scale-config.py" echo UNIDADE = "auto"
>>"%ACAI_DIR%\acailandia-scale-config.py" echo FLUXO_HARDWARE = True
>>"%ACAI_DIR%\acailandia-scale-config.py" echo CAPACIDADE_MAXIMA_KG = 32.0
>>"%ACAI_DIR%\acailandia-scale-config.py" echo PESO_MINIMO = 0.010
>>"%ACAI_DIR%\acailandia-scale-config.py" echo VARIACAO_MINIMA = 0.005
>>"%ACAI_DIR%\acailandia-scale-config.py" echo LEITURAS_ESTAVEIS = 3
>>"%ACAI_DIR%\acailandia-scale-config.py" echo REENVIO_SEGUNDOS = 30
>>"%ACAI_DIR%\acailandia-scale-config.py" echo CONSULTAR_COM_ENQ = True
>>"%ACAI_DIR%\acailandia-scale-config.py" echo INTERVALO_ENQ_SEGUNDOS = 0.8

%ACAI_PYTHON% -m ensurepip --upgrade >nul 2>nul
%ACAI_PYTHON% -m pip install --user --upgrade pyserial requests
if errorlevel 1 (echo [ERRO] Nao foi possivel instalar pyserial e requests.& pause & exit /b 1)

> "%ACAI_DIR%\Executar-Agente-Balanca.bat" echo @echo off
>>"%ACAI_DIR%\Executar-Agente-Balanca.bat" echo %ACAI_PYTHON% "%ACAI_DIR%\acailandia-agente-balanca.py" ^>^> "%ACAI_DIR%\agente-balanca.log" 2^>^&1
> "%ACAI_DIR%\Iniciar-Agente-Balanca.vbs" echo Set shell = CreateObject("WScript.Shell")
>>"%ACAI_DIR%\Iniciar-Agente-Balanca.vbs" echo shell.Run """%ACAI_DIR%\Executar-Agente-Balanca.bat""", 0, False
> "%ACAI_DIR%\Diagnostico-Balanca.bat" echo @echo off
>>"%ACAI_DIR%\Diagnostico-Balanca.bat" echo title Diagnostico da balanca - Acailandia PE
>>"%ACAI_DIR%\Diagnostico-Balanca.bat" echo %ACAI_PYTHON% "%ACAI_DIR%\acailandia-agente-balanca.py"
>>"%ACAI_DIR%\Diagnostico-Balanca.bat" echo pause

if not exist "%ACAI_STARTUP%" mkdir "%ACAI_STARTUP%"
copy /Y "%ACAI_DIR%\Iniciar-Agente-Balanca.vbs" "%ACAI_STARTUP%\Acailandia-Agente-Balanca.vbs" >nul
echo.
echo Instalacao concluida em %ACAI_DIR%.
echo A balanca vai iniciar com o Windows. Para testar agora, abra Diagnostico-Balanca.bat.
echo Configuracao inicial: %ACAI_PORT%, 9600 bps, 8N1 e fluxo de hardware.
echo Se a leitura nao chegar ao painel, confirme a porta COM e os parametros com o tecnico da balanca.
pause
exit /b 0

:LOCALIZAR_PYTHON
set "ACAI_PYTHON="
where py >nul 2>nul
if not errorlevel 1 (py -3 -c "import sys; print(sys.executable)" >nul 2>nul & if not errorlevel 1 set "ACAI_PYTHON=py -3")
if not defined ACAI_PYTHON (
  where python >nul 2>nul
  if not errorlevel 1 (python -c "import sys; print(sys.executable)" >nul 2>nul & if not errorlevel 1 set "ACAI_PYTHON=python")
)
exit /b 0
