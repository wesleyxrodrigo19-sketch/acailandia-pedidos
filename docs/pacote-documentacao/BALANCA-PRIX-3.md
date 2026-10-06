# Agente local da balança Prix 3 Toledo

## Finalidade

O agente lê o peso da Prix 3 pela porta USB serial e transmite a leitura estável para o PDV. A balança não fica exposta diretamente à internet.

## Self-service no balcão

O cartão **Self-service** fica no início da tela de novo pedido. O preço inicial é **R$ 30,00 por kg** e pode ser alterado em **Configurações > Mesas e self-service**.

1. Coloque o recipiente com o açaí na balança.
2. Aguarde a leitura estável ser transmitida.
3. Clique em **Ler balança e adicionar**.
4. Confira o peso com três casas decimais e o valor calculado.
5. Registre o pedido.

Por segurança, a leitura precisa ter no máximo dois minutos. O servidor também confere se o peso enviado ao pedido ainda é igual à última leitura recebida da Prix 3. Leituras antigas ou divergentes são recusadas.

## Configuração recomendada

- Protocolo Prt1 ou Prt3.
- 9600 baud.
- 8 bits de dados.
- Sem paridade.
- 1 stop bit.
- Cabo USB serial instalado no computador do caixa.

## Execução

```powershell
.\prix3-bridge.ps1 -Porta COM3 -Chave "CHAVE_CONFIGURADA_NO_WORKER"
```

Troque `COM3` pela porta exibida no Gerenciador de Dispositivos. A chave deve ser idêntica ao segredo `SCALE_BRIDGE_KEY` configurado no Worker.

## Teste

1. Inicie o agente.
2. Coloque um peso conhecido na balança.
3. Confirme a mensagem `Peso transmitido`.
4. Abra o painel e confira o peso e o horário da captura.

## Falhas comuns

- Porta inexistente: confira driver, cabo e número da COM.
- Sem resposta: confira Prt1 ou Prt3 e o baud rate.
- Erro 401: a chave local está diferente do segredo do Worker.
- Peso incorreto: valide se o equipamento retorna gramas e ajuste o divisor do script se necessário.
- Leitura antiga: confira a internet e se o agente continua em execução.
