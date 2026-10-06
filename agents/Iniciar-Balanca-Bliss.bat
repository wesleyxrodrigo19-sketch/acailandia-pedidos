@echo off
rem Atalho de compatibilidade: o agente normal agora roda sem janela via VBS.
if exist "%~dp0Iniciar-Balanca-Bliss.vbs" (
  start "" /b wscript.exe "%~dp0Iniciar-Balanca-Bliss.vbs"
  exit /b 0
)
echo [ERRO] Nao encontrei Iniciar-Balanca-Bliss.vbs.
echo Execute instalar-agente-balanca-bliss.bat novamente.
pause
