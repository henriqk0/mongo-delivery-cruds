# Prompt 8 — Erro de conexão com MongoDB (SSL)

## Prompts
- Log de erro: `SSL handshake failed: TLSV1_ALERT_INTERNAL_ERROR` ao acessar página de clientes

## Ações
- Diagnosticado que o CORS está funcionando (OPTIONS 200 OK)
- Erro real é de conexão com MongoDB Atlas: SSL handshake falhou
- Causas possíveis: IP não liberado no Network Access do Atlas, cluster pausado, ou incompatibilidade TLS
- Sugerido adicionar `&tls=true&tlsAllowInvalidCertificates=true` na string de conexão para teste
