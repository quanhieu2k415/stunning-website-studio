-- ============================================
-- Atomic variant replace.
--
-- The admin "save product" flow needs to replace a product's variants in one
-- step. Doing this client-side as DELETE-then-INSERT is non-atomic: if the
-- INSERT fails (RLS, network blip, validation), the product is left with zero
-- variants and the storefront price picker silently disappears.
--
-- This function wraps both statements in the same plpgsql transaction, so a
-- failed insert rolls back the delete.
--
-- security invoker: runs as the calling user. RLS still applies — same
-- single-admin model documented in 003_rls_policies.sql. Do not switch to
-- security definer without re-deriving the threat model.
--
-- Run this migration in the Supabase dashboard after 004.
-- ============================================

CREATE OR REPLACE FUNCTION public.replace_product_variants(
  p_product_id UUID,
  p_variants JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.product_variants WHERE product_id = p_product_id;

  IF p_variants IS NOT NULL AND jsonb_array_length(p_variants) > 0 THEN
    INSERT INTO public.product_variants (product_id, label, price, original_price, sort_order)
    SELECT
      p_product_id,
      v.value ->> 'label',
      v.value ->> 'price',
      NULLIF(v.value ->> 'original_price', ''),
      (v.ordinality - 1)::INT
    FROM jsonb_array_elements(p_variants) WITH ORDINALITY AS v(value, ordinality);
  END IF;
END;
$$;
