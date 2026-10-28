# Agente da balança — Açailandia PE

1. No Painel do proprietário, abra **Integrações > Balança Prix 3 Toledo** e gere a chave do agente.
2. Baixe e extraia todos os arquivos do pacote no computador conectado à balança.
3. Execute `instalar-agente-balanca-acailandia.bat`, cole a chave e confirme a porta COM (o padrão é COM4).
4. O instalador adiciona o agente à inicialização do Windows. Abra `C:\Acailandia\Balanca\Diagnostico-Balanca.bat` para conferir a conexão e fazer uma pesagem.

Parâmetros iniciais do pacote: 9600 bps, 8N1 e fluxo de hardware. Se a balança usar outra porta ou configuração, confirme com o técnico antes de alterar. A chave é gravada no computador do caixa; se gerar uma chave nova no painel, rode o instalador novamente.
