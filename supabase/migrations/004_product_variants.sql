-- ============================================
-- Product variants (e.g., capacity options for memory cards,
-- SSDs, RAM, etc.). Each variant shares SKU + images with its
-- parent product and only differs in label + price.
--
-- A product without any rows in this table renders normally
-- (no selector shown). Adding variants turns on the selector
-- on the public detail page and switches the displayed price
-- to the selected variant's price.
--
-- Run this migration in the Supabase dashboard after 001-003.
-- ============================================

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,             -- "32GB", "16GB DDR5", "1TB NVMe", ...
  price TEXT NOT NULL,             -- same VND-formatted string convention
  original_price TEXT,             -- optional; null hides the struck-through price
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id
  ON product_variants(product_id);

-- ============================================
-- RLS — same model as other CMS tables.
-- Public can read; authenticated (= single provisioned admin) can write.
-- See supabase/migrations/003_rls_policies.sql for the security model.
-- ============================================
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read product_variants"
  ON product_variants FOR SELECT USING (true);

CREATE POLICY "Admin manage product_variants"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
