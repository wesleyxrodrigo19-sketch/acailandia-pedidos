# Ponte local — Prix 3 Toledo

Execute no computador do caixa, com a balança conectada por USB/serial:

```powershell
.\prix3-bridge.ps1 -Porta COM3 -Chave "CHAVE_CONFIGURADA_NO_WORKER"
```

Configure a Prix 3 em Prt1 ou Prt3, 8 bits, sem paridade e 1 stop bit. Confirme a porta no Gerenciador de Dispositivos. A ponte nunca expõe a balança à internet: ela só envia leituras estáveis para o endpoint protegido do PDV.
