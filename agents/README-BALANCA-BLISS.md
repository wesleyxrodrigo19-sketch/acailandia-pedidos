# Agente da balança — Bliss Açaiteria

Este pacote está configurado para a porta **USB-SERIAL CH340 (COM4)**:

- 9600 bps;
- 8 bits, sem paridade e 1 stop bit (8N1);
- controle de fluxo **Nenhum** (sem RTS/CTS);
- URL do sistema `https://bliss-acaiteria.wpnz.com.br/api/scale/weight`.

## Instalação

1. Mantenha juntos `bliss-agente-balanca.py`, `bliss-scale-config.py` e `instalar-agente-balanca-bliss.bat`.
2. Execute `instalar-agente-balanca-bliss.bat` no computador que tem a balança conectada.
3. Se aparecer que o Python não foi encontrado, escolha **A** para o próprio instalador baixar e instalar o Python pelo Windows. Se preferir fazer manualmente, escolha **M** e siga as cinco etapas mostradas na tela. É necessário executar novamente o instalador após instalar o Python.
4. Ao terminar, o agente já fica configurado para iniciar **oculto** junto com o Windows. Para iniciar imediatamente sem abrir Prompt de Comando, execute `C:\BlissAcaiteria\Iniciar-Balanca-Bliss.vbs`.
5. Para diagnóstico, execute `C:\BlissAcaiteria\Diagnostico-Balanca-Bliss.bat`; nele aparecem as mensagens como `Peso enviado ao PDV`.

O arquivo `bliss-scale-config.py` contém o token e é propositalmente ignorado pelo Git. Se um token novo for gerado em **Painel > Integrações**, substitua somente a variável `TOKEN` desse arquivo e reinicie o agente.
