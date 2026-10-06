"""Agente local da balança — Bliss Açaiteria.

Lê continuamente a USB-SERIAL CH340 do computador do caixa e envia a última
pesagem ao sistema. A configuração fica no arquivo bliss-scale-config.py,
na mesma pasta, para que o token não seja gravado no Git.
"""
from __future__ import annotations

from datetime import datetime, timezone
import importlib.util
import os
from pathlib import Path
import re
import sys
import time
from typing import Optional

try:
    import serial
    import serial.tools.list_ports
    import requests
except ImportError:
    print("\n[ERRO] Instale as dependências com: pip install pyserial requests\n")
    input("Pressione ENTER para fechar...")
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parent
CONFIG_CANDIDATES = [
    Path(os.environ["BLISS_CONFIG_PATH"]) if os.environ.get("BLISS_CONFIG_PATH") else None,
    ROOT / "bliss-scale-config.py",
    Path(r"C:\BlissAcaiteria\bliss-scale-config.py"),
]
CONFIG_PATH = next((path for path in CONFIG_CANDIDATES if path and path.is_file()), ROOT / "bliss-scale-config.py")

if not CONFIG_PATH.is_file():
    print("[ERRO] Não encontrei bliss-scale-config.py na mesma pasta do agente.")
    input("Pressione ENTER para fechar...")
    raise SystemExit(1)

config_spec = importlib.util.spec_from_file_location("bliss_scale_config", CONFIG_PATH)
if not config_spec or not config_spec.loader:
    print("[ERRO] Não foi possível abrir bliss-scale-config.py.")
    input("Pressione ENTER para fechar...")
    raise SystemExit(1)
config = importlib.util.module_from_spec(config_spec)
config_spec.loader.exec_module(config)

URL_PDV = str(config.URL_PDV).rstrip("/")
TOKEN = str(config.TOKEN).strip()
PORTA = str(getattr(config, "PORTA", "COM4"))
VELOCIDADE = int(getattr(config, "VELOCIDADE", 9600))
UNIDADE = str(getattr(config, "UNIDADE", "auto")).lower()
FLUXO_HARDWARE = bool(getattr(config, "FLUXO_HARDWARE", False))
CAPACIDADE_MAXIMA_KG = float(getattr(config, "CAPACIDADE_MAXIMA_KG", 32.0))
PESO_MINIMO = float(getattr(config, "PESO_MINIMO", 0.010))
VARIACAO_MINIMA = float(getattr(config, "VARIACAO_MINIMA", 0.005))
LEITURAS_ESTAVEIS = int(getattr(config, "LEITURAS_ESTAVEIS", 3))
REENVIO_SEGUNDOS = int(getattr(config, "REENVIO_SEGUNDOS", 30))
# Algumas balanças Prix/Toledo só respondem quando recebem ENQ (0x05), em vez
# de transmitir continuamente. Mantemos os dois modos para também aceitar
# equipamentos configurados em envio automático.
CONSULTAR_COM_ENQ = bool(getattr(config, "CONSULTAR_COM_ENQ", True))
INTERVALO_ENQ_SEGUNDOS = float(getattr(config, "INTERVALO_ENQ_SEGUNDOS", 0.8))

PADRAO_NUMERO = re.compile(r"[-+]?\d+(?:[.,]\d+)?")


def log(mensagem: str) -> None:
    print(f"[{time.strftime('%H:%M:%S')}] {mensagem}", flush=True)


def limpar(texto: str) -> str:
    return "".join(caractere for caractere in texto if caractere.isprintable())


def para_kg(bruto: str) -> Optional[float]:
    texto = bruto.strip().replace(" ", "")
    if not texto:
        return None
    try:
        valor = abs(float(texto.replace(",", ".")))
    except ValueError:
        return None
    if UNIDADE == "kg":
        return round(valor, 3)
    if UNIDADE == "g":
        return round(valor / 1000, 3)
    return round(valor, 3) if ("," in texto or "." in texto) else round(valor / 1000, 3)


def extrair_peso(linha: str) -> Optional[float]:
    candidatos = []
    for item in PADRAO_NUMERO.findall(limpar(linha)):
        peso = para_kg(item)
        if peso is not None and 0 <= peso <= CAPACIDADE_MAXIMA_KG:
            candidatos.append((peso, "," in item or "." in item))
    for peso, decimal in candidatos:
        if peso >= PESO_MINIMO and decimal:
            return peso
    for peso, _ in candidatos:
        if peso >= PESO_MINIMO:
            return peso
    return candidatos[0][0] if candidatos else None


def abrir_serial():
    def conectar(com_fluxo_hardware: bool):
        return serial.Serial(
            port=PORTA,
            baudrate=VELOCIDADE,
            bytesize=serial.EIGHTBITS,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            timeout=0.20,
            write_timeout=0.50,
            xonxoff=False,
            rtscts=com_fluxo_hardware,
            dsrdtr=False,
        )

    try:
        return conectar(FLUXO_HARDWARE)
    except serial.SerialException:
        if not FLUXO_HARDWARE:
            raise
        log("O driver recusou fluxo por hardware; tentando COM sem controle de fluxo.")
        return conectar(False)


def enviar(peso_kg: float) -> bool:
    gramas = round(peso_kg * 1000)
    try:
        resposta = requests.post(
            f"{URL_PDV}/api/scale/weight",
            headers={"x-scale-key": TOKEN},
            json={
                "grams": gramas,
                "Liquido": f"{peso_kg:.3f}",
                "Bruto": f"{peso_kg:.3f}",
                "Tara": "0.000",
                "captured_at": datetime.now(timezone.utc).isoformat(),
            },
            timeout=10,
        )
        if resposta.status_code == 200:
            log(f"Peso enviado ao PDV: {peso_kg:.3f} kg")
            return True
        if resposta.status_code == 401:
            log("[ERRO] Token inválido. Gere ou confira o token no painel > Integrações.")
        else:
            log(f"[AVISO] O PDV respondeu {resposta.status_code}: {resposta.text[:120]}")
    except requests.RequestException as erro:
        log(f"[AVISO] Sem conexão com o PDV ({erro.__class__.__name__}). Tentarei novamente.")
    return False


def rodar() -> None:
    fluxo = "fluxo por hardware" if FLUXO_HARDWARE else "sem controle de fluxo"
    log(f"Lendo a balança em {PORTA} ({VELOCIDADE} bps, 8N1, {fluxo}).")
    log("Coloque um peso na balança. Para encerrar, feche esta janela.")
    ultimo_enviado: Optional[float] = None
    ultimo_envio_em = 0.0
    anterior: Optional[float] = None
    repeticoes = 0
    buffer = ""
    ultimo_debug = 0.0
    ultima_consulta = 0.0

    with abrir_serial() as porta:
        porta.reset_input_buffer()
        while True:
            agora = time.time()
            if CONSULTAR_COM_ENQ and agora - ultima_consulta >= INTERVALO_ENQ_SEGUNDOS:
                try:
                    porta.write(b"\x05")
                    ultima_consulta = agora
                except serial.SerialTimeoutException:
                    log("[AVISO] A balança não respondeu à consulta serial.")
            dados = porta.read(porta.in_waiting or 1)
            if not dados:
                continue
            buffer = (buffer + dados.decode("latin-1", errors="ignore"))[-512:]
            peso = extrair_peso(buffer)
            agora = time.time()
            if peso is None:
                if agora - ultimo_debug >= 3:
                    visivel = "".join(caractere if caractere.isprintable() else "." for caractere in buffer[-100:])
                    if visivel.strip(". "):
                        log(f"RAW recebido: {visivel!r}")
                    ultimo_debug = agora
                continue
            buffer = ""
            if peso == anterior:
                repeticoes += 1
            else:
                anterior, repeticoes = peso, 1
            if repeticoes < LEITURAS_ESTAVEIS:
                continue
            if peso < PESO_MINIMO:
                if ultimo_enviado is not None and enviar(0):
                    ultimo_enviado = None
                    ultimo_envio_em = agora
                continue
            mudou = ultimo_enviado is None or abs(peso - ultimo_enviado) >= VARIACAO_MINIMA
            venceu = agora - ultimo_envio_em >= REENVIO_SEGUNDOS
            if (mudou or venceu) and enviar(peso):
                ultimo_enviado = peso
                ultimo_envio_em = agora


def main() -> None:
    if not TOKEN or TOKEN.startswith("COLE_"):
        log("[ERRO] Informe o token em bliss-scale-config.py antes de iniciar.")
        input("Pressione ENTER para fechar...")
        return
    log("Iniciando o agente da balança da Bliss Açaiteria.")
    while True:
        try:
            rodar()
        except KeyboardInterrupt:
            log("Agente encerrado.")
            return
        except serial.SerialException as erro:
            log(f"[ERRO SERIAL] {erro}. Reconectando em 5 segundos...")
            time.sleep(5)
        except Exception as erro:
            log(f"[ERRO] {erro}. Reconectando em 5 segundos...")
            time.sleep(5)


if __name__ == "__main__":
    main()
