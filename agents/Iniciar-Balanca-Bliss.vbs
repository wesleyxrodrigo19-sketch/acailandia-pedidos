Option Explicit

' Executa o agente sem janela de Prompt. O mesmo arquivo e copiado para a
' pasta Inicializar pelo instalador, entao ele inicia junto com o Windows.
Dim shell, folder, command
Set shell = CreateObject("WScript.Shell")
folder = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
command = """" & folder & "\Executar-Agente-Balanca-Bliss.bat"""
shell.Run command, 0, False
