# Agente da balança — Açailandia PE

1. No Painel do proprietário, abra **Integrações > Balança Prix 3 Toledo** e gere a chave do agente.
2. Baixe e extraia todos os arquivos do pacote no computador conectado à balança.
3. Execute `instalar-agente-balanca-acailandia.bat`, cole a chave e confirme a porta COM (o padrão informado para o caixa é COM10).
4. O instalador adiciona o agente à inicialização do Windows. Abra `C:\Acailandia\Balanca\Diagnostico-Balanca.bat` para conferir a conexão e fazer uma pesagem.

Parâmetros iniciais atualizados conforme o agente funcional da Prix 3 Fit: 4800 bps, 8N1, sem fluxo de hardware e leitura passiva do quadro `STX + peso em kg com três casas + CR` (exemplo: `STX 00.182 CR`). O agente da Açailandia envia a leitura usando sua própria URL e token; nenhuma credencial do agente Bacana é copiada. A chave da Açailandia é gravada localmente; se gerar uma chave nova no painel, rode o instalador novamente.

Antes de substituir uma instalação ativa, feche o agente antigo para liberar a COM. O instalador regrava a configuração local com COM10/4800/sem fluxo; escolha a porta correta caso o Windows mostre outra. Se não houver leitura, rode o instalador de diagnóstico e envie o relatório ao técnico.
