-- ============================================
-- SECURITY MODEL — READ BEFORE EDITING
-- ============================================
-- The policies below grant full CRUD on every CMS table and storage bucket to
-- ANY user with auth.role() = 'authenticated'. They do NOT restrict by user
-- identity. This is only safe because Supabase email/phone/anonymous/social
-- self-signup is disabled in the project dashboard, so the only account that
-- can ever authenticate is the single manually-provisioned admin.
--
-- If you re-enable signup, add a second authenticated role, or introduce
-- non-admin users (e.g. customer accounts), these policies become an open
-- door — rewrite them against an `admins` table or a JWT claim FIRST.
-- See /SECURITY.md at the repo root for the full setup checklist and tripwires.
-- ============================================

-- ============================================
-- Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pc_component_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pc_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE prebuilt_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE prebuilt_config_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_expertise_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_clients ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Public read policies (for website visitors)
-- ============================================
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read product_features" ON product_features FOR SELECT USING (true);
CREATE POLICY "Public read product_specs" ON product_specs FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read service_features" ON service_features FOR SELECT USING (true);
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read pc_component_categories" ON pc_component_categories FOR SELECT USING (true);
CREATE POLICY "Public read pc_components" ON pc_components FOR SELECT USING (true);
CREATE POLICY "Public read prebuilt_configs" ON prebuilt_configs FOR SELECT USING (true);
CREATE POLICY "Public read prebuilt_config_specs" ON prebuilt_config_specs FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read about_expertise" ON about_expertise FOR SELECT USING (true);
CREATE POLICY "Public read about_expertise_features" ON about_expertise_features FOR SELECT USING (true);
CREATE POLICY "Public read about_values" ON about_values FOR SELECT USING (true);
CREATE POLICY "Public read about_clients" ON about_clients FOR SELECT USING (true);

-- ============================================
-- Admin write policies (for authenticated users)
-- ============================================
CREATE POLICY "Admin manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage brands" ON brands FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage products" ON products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage product_features" ON product_features FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage product_specs" ON product_specs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage services" ON services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage service_features" ON service_features FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage process_steps" ON process_steps FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage pc_component_categories" ON pc_component_categories FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage pc_components" ON pc_components FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage prebuilt_configs" ON prebuilt_configs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage prebuilt_config_specs" ON prebuilt_config_specs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage about_expertise" ON about_expertise FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage about_expertise_features" ON about_expertise_features FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage about_values" ON about_values FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage about_clients" ON about_clients FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- Storage buckets
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public read site assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admin upload site assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update site assets" ON storage.objects FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete site assets" ON storage.objects FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
