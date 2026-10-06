"""Configuração do agente da balança Bliss Açaiteria.

Copie este arquivo como bliss-scale-config.py e informe o token gerado no
Painel do proprietário > Integrações. Esse arquivo real é ignorado pelo Git.
"""

URL_PDV = "https://bliss-acaiteria.wpnz.com.br"
TOKEN = "COLE_AQUI_O_TOKEN_GERADO_NO_PAINEL"

# Configurações conferidas no computador do caixa.
PORTA = "COM4"
VELOCIDADE = 4800
UNIDADE = "auto"
FLUXO_HARDWARE = False

CAPACIDADE_MAXIMA_KG = 32.0
PESO_MINIMO = 0.010
VARIACAO_MINIMA = 0.005
LEITURAS_ESTAVEIS = 3
REENVIO_SEGUNDOS = 30

# Consulte a balança Prix/Toledo quando ela não enviar peso automaticamente.
CONSULTAR_COM_ENQ = True
INTERVALO_ENQ_SEGUNDOS = 0.8
