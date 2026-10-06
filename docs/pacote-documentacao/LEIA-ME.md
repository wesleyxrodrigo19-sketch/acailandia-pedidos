# Documentação completa do Prime Açaí PDV

Este pacote reúne os documentos necessários para operar, manter e evoluir o sistema Prime Açaí PDV.

## Conteúdo

- `Manual Completo Prime Acai PDV.docx`: manual principal para proprietário, operação e equipe técnica.
- `Guia Integracao PedeAI Acai Prime.docx`: dados, configuração e homologação necessários para a futura integração.
- `REFERENCIA-TECNICA.md`: resumo técnico de arquitetura, rotas, banco e implantação.
- `BALANCA-PRIX-3.md`: instalação e diagnóstico do agente local da Toledo Prix 3.
- O manual e a referência técnica incluem o self-service do balcão, inicialmente configurado a R$ 30,00 por kg.
- `INVENTARIO-DO-PACOTE.txt`: relação dos arquivos incluídos e sua finalidade.
- `migracoes/`: cópia das migrações SQL que documentam a evolução do banco.
- `agente-prix3/`: script do agente local e instruções rápidas.

## Endereços

- Cardápio: https://prime-acai.wpnz.com.br/
- Painel: https://prime-acai.wpnz.com.br/painel
- Repositório: https://github.com/wesleyxrodrigo19-sketch/prime-acai-pdv

## Segurança

O pacote não contém PIN, token, segredo de sessão, chave da balança nem credenciais PedeAI. Esses valores devem permanecer nos segredos da Cloudflare ou ser preenchidos pelo proprietário no painel.
