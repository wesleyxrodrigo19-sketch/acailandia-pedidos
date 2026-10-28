@echo off
setlocal EnableExtensions
title Instalador de Diagnostico da Balanca - Acailandia PE
set "DEST=%LOCALAPPDATA%\Acailandia\DiagnosticoBalanca"
set "PS1=%DEST%\Diagnostico-Balanca-Acailandia.ps1"
set "RUNNER=%DEST%\Executar-Diagnostico-Balanca.bat"

echo ============================================================
echo   DIAGNOSTICO DE COMUNICACAO DA BALANCA - ACAILANDIA PE
echo ============================================================
echo.
if not exist "%~dp0Diagnostico-Balanca-Acailandia.ps1" (
  echo [ERRO] Extraia todos os arquivos do ZIP antes de instalar.
  pause
  exit /b 1
)

if not exist "%DEST%" mkdir "%DEST%"
if not exist "%DEST%" (
  echo [ERRO] Nao foi possivel criar a pasta local do diagnostico.
  pause
  exit /b 1
)
copy /Y "%~dp0Diagnostico-Balanca-Acailandia.ps1" "%PS1%" >nul
if errorlevel 1 (
  echo [ERRO] Nao foi possivel instalar o script de diagnostico.
  pause
  exit /b 1
)

>"%RUNNER%" echo @echo off
>>"%RUNNER%" echo title Diagnostico de Balanca - Acailandia PE
>>"%RUNNER%" echo powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%PS1%" -ExpectedBaud 4800
>>"%RUNNER%" echo pause

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "$s=New-Object -ComObject WScript.Shell; $p=[Environment]::GetFolderPath('Desktop'); $l=$s.CreateShortcut((Join-Path $p 'Diagnostico Balanca Acailandia.lnk')); $l.TargetPath='%RUNNER%'; $l.WorkingDirectory='%DEST%'; $l.Save()" >nul 2>nul

echo Instalado em: %DEST%
echo Atalho criado na Area de Trabalho.
echo Nenhuma configuracao da balanca foi alterada.
echo.
echo Feche o agente antigo da balanca. Depois abra o atalho criado na Area de Trabalho.
pause
exit /b 0
