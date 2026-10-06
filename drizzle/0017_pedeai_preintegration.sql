-- Preparação da integração PedeAI. As credenciais ficam disponíveis somente no painel do proprietário.
ALTER TABLE settings ADD COLUMN pedeai_enabled integer NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN pedeai_environment text NOT NULL DEFAULT 'sandbox';
ALTER TABLE settings ADD COLUMN pedeai_store_id text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_client_id text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_api_base_url text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_api_token text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_webhook_secret text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_last_sync_at text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_last_error text NOT NULL DEFAULT '';
