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
import { sortBySortOrder } from "@/lib/sort";
import type {
  AboutClient,
  AboutValue,
  Brand,
  Category,
  PCComponent,
  PCComponentCategory,
  PrebuiltConfig,
  PrebuiltConfigSpec,
  ProcessStep,
  ProductFeature,
  ProductImage,
  ProductSpec,
  ProductVariant,
  Service,
  ServiceFeature,
} from "@/types/database";

type PublicProductRow = {
  id: string;
  legacy_id: number | null;
  name: string;
  price: string;
  original_price: string;
  image_url?: string | null;
  badge: string | null;
  badge_color: string | null;
  category?: Pick<Category, "slug" | "name"> | null;
  category_slug?: string | null;
  brand?: Pick<Brand, "name"> | null;
  brand_name?: string | null;
  images?: Pick<ProductImage, "image_url" | "sort_order" | "is_primary">[];
  rating?: number | string | null;
  reviews?: number | null;
  description?: string | null;
  features?: Pick<ProductFeature, "feature" | "sort_order">[];
  specs?: Pick<ProductSpec, "spec_key" | "spec_value" | "sort_order">[];
  warranty?: string | null;
  in_stock?: boolean | null;
  sku?: string | null;
  variants?: Pick<ProductVariant, "id" | "label" | "price" | "original_price" | "sort_order">[];
};

export type AboutPageContent = {
  values?: Pick<AboutValue, "icon" | "title" | "description">[];
  clients?: Pick<AboutClient, "icon" | "title" | "description">[];
};

export type PublicService = Service & {
  features?: Pick<ServiceFeature, "feature" | "sort_order">[];
};

export type PublicPCCategory = PCComponentCategory & {
  components?: Pick<PCComponent, "id" | "name" | "price" | "specs" | "sort_order">[];
};

export type PublicPrebuiltConfig = PrebuiltConfig & {
  specs?: Pick<PrebuiltConfigSpec, "label" | "sort_order">[];
};

const sortImages = (images: PublicProductRow["images"] = []) =>
  [...images].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

// Map Supabase product to frontend Product type. Returns the entity plus the
// sorted image list, so callers building ProductDetail can reuse it without
// re-sorting.
function mapProductBase(p: PublicProductRow): { product: Product; sortedImages: NonNullable<PublicProductRow["images"]> } {
  const sortedImages = sortImages(p.images);
  return {
    product: {
      id: p.legacy_id ?? p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.original_price,
      image: sortedImages[0]?.image_url || p.image_url || "/placeholder.svg",
      badge: p.badge || null,
      badgeColor: p.badge_color || "bg-red-500",
      category: p.category?.slug || p.category_slug || "",
      brand: p.brand?.name || p.brand_name || "",
    },
    sortedImages,
  };
}

function mapProduct(p: PublicProductRow): Product {
  return mapProductBase(p).product;
}

// Map Supabase product to frontend ProductDetail type
function mapProductDetail(p: PublicProductRow): ProductDetail {
  const { product: base, sortedImages } = mapProductBase(p);
  const variants = sortBySortOrder(p.variants).map((v) => ({
    id: v.id,
    label: v.label,
    price: v.price,
    originalPrice: v.original_price || null,
  }));
  const imageUrls = sortedImages.map((img) => img.image_url);
  return {
    ...base,
    images: imageUrls.length ? imageUrls : [base.image],
    rating: Number(p.rating) || 4.5,
    reviews: p.reviews || 0,
    categoryLabel: p.category?.name || "",
    description: p.description || "",
    features: p.features?.map((f) => f.feature) || [],
    specs: (p.specs || []).reduce(
      (acc: Record<string, string>, s) => {
        acc[s.spec_key] = s.spec_value;
        return acc;
      },
      {} as Record<string, string>
    ),
    warranty: p.warranty || "12 tháng",
    inStock: p.in_stock !== false,
    sku: p.sku || "",
    variants,
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
      return ((data || []) as PublicProductRow[]).map(mapProduct);
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
      return ((data || []) as PublicProductRow[]).map(mapProduct);
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
        ...((data || []) as Category[]).map((c) => ({ id: c.slug, name: c.name, icon: c.icon || "" })),
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
      return ((data || []) as Pick<Brand, "name">[]).map((b) => b.name);
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
      return data as PublicService[];
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
      return data as ProcessStep[];
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
      return data as PublicPCCategory[];
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
      return data as PublicPrebuiltConfig[];
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
      return data.setting_value as AboutPageContent;
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

      // The variants embed is fetched separately so that a missing
      // product_variants table (migration 004 not yet applied) doesn't 400
      // the entire query and break every product detail page.
      const baseSelect = `*, category:categories(slug, name), brand:brands(name),
        images:product_images(image_url, sort_order, is_primary),
        features:product_features(feature, sort_order),
        specs:product_specs(spec_key, spec_value, sort_order)`;

      // Use a strict regex — parseInt("123e4567-...") returns 123, not NaN,
      // so UUIDs starting with digits would wrongly take the legacy_id branch.
      const numId = /^\d+$/.test(id) ? parseInt(id, 10) : NaN;
      const productQuery = !isNaN(numId)
        ? supabase.from("products").select(baseSelect).eq("legacy_id", numId).maybeSingle()
        : supabase.from("products").select(baseSelect).eq("id", id).maybeSingle();

      const { data, error } = await productQuery;
      if (error) {
        console.error("Product detail query failed:", error);
        return hardcoded || null;
      }
      if (!data) return hardcoded || null;

      // Variants are best-effort. If the table is missing or RLS blocks the
      // read, the product still renders without a variant picker.
      const { data: variantsData } = await supabase
        .from("product_variants")
        .select("id, label, price, original_price, sort_order")
        .eq("product_id", (data as PublicProductRow).id);

      return mapProductDetail({
        ...(data as PublicProductRow),
        variants: (variantsData || []) as PublicProductRow["variants"],
      });
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
