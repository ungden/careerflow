ALTER TABLE public.transactions
  ADD COLUMN IF NOT EXISTS transfer_content text,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS transactions_transfer_content_key
  ON public.transactions (transfer_content)
  WHERE transfer_content IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS transactions_provider_transaction_id_key
  ON public.transactions (provider, provider_transaction_id)
  WHERE provider_transaction_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS transactions_pending_lookup_idx
  ON public.transactions (status, transfer_content)
  WHERE status = 'pending';
