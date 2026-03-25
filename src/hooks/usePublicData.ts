/**
 * Public data hooks that fetch from Supabase with fallback to hardcoded data.
 * These hooks return data in the same shape as the existing hardcoded types
 * so frontend components need minimal changes.
 */
import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  allProducts as hardcodedProducts,
  categories as hardcodedCategories,
  allBrands as hardcodedBrands,
  featuredProducts as hardcodedFeatured,
  getProductDetail as hardcodedGetDetail,
  type Product,
  type ProductDetail,
} from "@/data/products";

// Map Supabase product to frontend Product type
function mapProduct(p: any): Product {
  return {
    id: p.legacy_id ?? p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price,
    image: p.images?.[0]?.image_url || p.image_url || "/placeholder.svg",
    badge: p.badge || null,
    badgeColor: p.badge_color || "bg-red-500",
    category: p.category?.slug || p.category_slug || "",
    brand: p.brand?.name || p.brand_name || "",
  };
}

// Map Supabase product to frontend ProductDetail type
function mapProductDetail(p: any): ProductDetail {
  const base = mapProduct(p);
  return {
    ...base,
    images: p.images?.map((img: any) => img.image_url) || [base.image],
    rating: Number(p.rating) || 4.5,
    reviews: p.reviews || 0,
    categoryLabel: p.category?.name || "",
    description: p.description || "",
    features: p.features?.map((f: any) => f.feature) || [],
    specs: (p.specs || []).reduce(
      (acc: Record<string, string>, s: any) => {
        acc[s.spec_key] = s.spec_value;
        return acc;
      },
      {} as Record<string, string>
    ),
    warranty: p.warranty || "12 tháng",
    inStock: p.in_stock !== false,
    sku: p.sku || "",
  };
}

// All products
export function usePublicProducts() {
  return useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return hardcodedProducts;

      const { data, error } = await supabase
        .from("products")
        .select(
          `*, category:categories(slug, name), brand:brands(name), images:product_images(image_url, sort_order, is_primary)`
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) return hardcodedProducts;
      return (data || []).map(mapProduct);
    },
    staleTime: 60 * 1000,
    placeholderData: hardcodedProducts,
  });
}

// Featured products
export function usePublicFeaturedProducts() {
  return useQuery({
    queryKey: ["public-featured-products"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return hardcodedFeatured;

      const { data, error } = await supabase
        .from("products")
        .select(
          `*, category:categories(slug, name), brand:brands(name), images:product_images(image_url, sort_order, is_primary)`
        )
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(4);

      if (error) return hardcodedFeatured;
      return (data || []).map(mapProduct);
    },
    staleTime: 60 * 1000,
    placeholderData: hardcodedFeatured,
  });
}

// Categories
export function usePublicCategories() {
  return useQuery({
    queryKey: ["public-categories"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return hardcodedCategories;

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) return hardcodedCategories;
      return [
        { id: "all", name: "Tất cả", icon: "" },
        ...(data || []).map((c: any) => ({ id: c.slug, name: c.name, icon: c.icon || "" })),
      ];
    },
    staleTime: 2 * 60 * 1000,
    placeholderData: hardcodedCategories,
  });
}

// Brands
export function usePublicBrands() {
  return useQuery({
    queryKey: ["public-brands"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return hardcodedBrands;

      const { data, error } = await supabase
        .from("brands")
        .select("name")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (error) return hardcodedBrands;
      return (data || []).map((b: any) => b.name);
    },
    staleTime: 2 * 60 * 1000,
    placeholderData: hardcodedBrands,
  });
}

// Services with features
export function usePublicServices() {
  return useQuery({
    queryKey: ["public-services"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from("services")
        .select("*, features:service_features(feature, sort_order)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) return null;
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// Process steps
export function usePublicProcessSteps() {
  return useQuery({
    queryKey: ["public-process-steps"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .eq("is_active", true)
        .order("step_number", { ascending: true });
      if (error) return null;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// PC Component categories with components
export function usePublicPCComponents() {
  return useQuery({
    queryKey: ["public-pc-categories"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from("pc_component_categories")
        .select("*, components:pc_components(id, name, price, specs, sort_order)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) return null;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Prebuilt configs with specs
export function usePublicPrebuiltConfigs() {
  return useQuery({
    queryKey: ["public-prebuilt-configs"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from("prebuilt_configs")
        .select("*, specs:prebuilt_config_specs(label, sort_order)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) return null;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// About page content from site_settings
export function usePublicAboutContent() {
  return useQuery({
    queryKey: ["public-site-settings", "about_page"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "about_page")
        .single();
      if (error || !data) return null;
      return data.setting_value as any;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Single product detail
export function usePublicProductDetail(id: string) {
  return useQuery({
    queryKey: ["public-product-detail", id],
    queryFn: async () => {
      const hardcoded = hardcodedGetDetail(id);

      if (!isSupabaseConfigured()) return hardcoded || null;

      const numId = parseInt(id);
      let query;
      if (!isNaN(numId)) {
        query = supabase
          .from("products")
          .select(
            `*, category:categories(slug, name), brand:brands(name),
             images:product_images(image_url, sort_order, is_primary),
             features:product_features(feature, sort_order),
             specs:product_specs(spec_key, spec_value, sort_order)`
          )
          .eq("legacy_id", numId)
          .single();
      } else {
        query = supabase
          .from("products")
          .select(
            `*, category:categories(slug, name), brand:brands(name),
             images:product_images(image_url, sort_order, is_primary),
             features:product_features(feature, sort_order),
             specs:product_specs(spec_key, spec_value, sort_order)`
          )
          .eq("id", id)
          .single();
      }

      const { data, error } = await query;
      if (error || !data) return hardcoded || null;

      return mapProductDetail(data);
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
