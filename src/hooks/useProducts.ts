import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ProductWithRelations } from "@/types/database";

// Fetch all products with relations
export function useProducts(options?: { featured?: boolean; categorySlug?: string; active?: boolean }) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(`
          *,
          category:categories(*),
          brand:brands(*),
          images:product_images(*),
          features:product_features(*),
          specs:product_specs(*)
        `)
        .order("sort_order", { ascending: true });

      if (options?.active !== false) {
        query = query.eq("is_active", true);
      }
      if (options?.featured) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ProductWithRelations[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch all products for admin (include inactive)
export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(id, name, slug),
          brand:brands(id, name)
        `)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 1000,
  });
}

// Fetch single product by ID or legacy_id
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // Try legacy_id first (for public pages)
      const numId = parseInt(id);
      let query;

      if (!isNaN(numId)) {
        query = supabase
          .from("products")
          .select(`
            *,
            category:categories(*),
            brand:brands(*),
            images:product_images(*, order:sort_order),
            features:product_features(*, order:sort_order),
            specs:product_specs(*, order:sort_order)
          `)
          .eq("legacy_id", numId)
          .single();
      } else {
        query = supabase
          .from("products")
          .select(`
            *,
            category:categories(*),
            brand:brands(*),
            images:product_images(*),
            features:product_features(*),
            specs:product_specs(*)
          `)
          .eq("id", id)
          .single();
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ProductWithRelations;
    },
    enabled: isSupabaseConfigured() && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      name: string;
      slug: string;
      price: string;
      original_price: string;
      category_id?: string;
      brand_id?: string;
      badge?: string;
      badge_color?: string;
      description?: string;
      warranty?: string;
      in_stock?: boolean;
      rating?: number;
      reviews?: number;
      is_featured?: boolean;
      sort_order?: number;
      features?: string[];
      specs?: { key: string; value: string }[];
      images?: { url: string; is_primary: boolean }[];
    }) => {
      const { features, specs, images, ...productData } = product;

      // Insert product
      const { data: newProduct, error: productError } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single();

      if (productError) throw productError;

      // Insert features
      if (features?.length) {
        const { error } = await supabase.from("product_features").insert(
          features.map((f, i) => ({
            product_id: newProduct.id,
            feature: f,
            sort_order: i,
          }))
        );
        if (error) throw error;
      }

      // Insert specs
      if (specs?.length) {
        const { error } = await supabase.from("product_specs").insert(
          specs.map((s, i) => ({
            product_id: newProduct.id,
            spec_key: s.key,
            spec_value: s.value,
            sort_order: i,
          }))
        );
        if (error) throw error;
      }

      // Insert images
      if (images?.length) {
        const { error } = await supabase.from("product_images").insert(
          images.map((img, i) => ({
            product_id: newProduct.id,
            image_url: img.url,
            is_primary: img.is_primary,
            sort_order: i,
          }))
        );
        if (error) throw error;
      }

      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}

// Update product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string;
      name?: string;
      slug?: string;
      price?: string;
      original_price?: string;
      category_id?: string | null;
      brand_id?: string | null;
      badge?: string | null;
      badge_color?: string | null;
      description?: string | null;
      warranty?: string;
      in_stock?: boolean;
      rating?: number;
      reviews?: number;
      is_featured?: boolean;
      is_active?: boolean;
      sort_order?: number;
      features?: string[];
      specs?: { key: string; value: string }[];
      images?: { url: string; is_primary: boolean }[];
    }) => {
      const { features, specs, images, ...productData } = updates;

      // Update product
      const { error: productError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id);

      if (productError) throw productError;

      // Replace features
      if (features !== undefined) {
        await supabase.from("product_features").delete().eq("product_id", id);
        if (features.length) {
          const { error } = await supabase.from("product_features").insert(
            features.map((f, i) => ({
              product_id: id,
              feature: f,
              sort_order: i,
            }))
          );
          if (error) throw error;
        }
      }

      // Replace specs
      if (specs !== undefined) {
        await supabase.from("product_specs").delete().eq("product_id", id);
        if (specs.length) {
          const { error } = await supabase.from("product_specs").insert(
            specs.map((s, i) => ({
              product_id: id,
              spec_key: s.key,
              spec_value: s.value,
              sort_order: i,
            }))
          );
          if (error) throw error;
        }
      }

      // Replace images
      if (images !== undefined) {
        await supabase.from("product_images").delete().eq("product_id", id);
        if (images.length) {
          const { error } = await supabase.from("product_images").insert(
            images.map((img, i) => ({
              product_id: id,
              image_url: img.url,
              is_primary: img.is_primary,
              sort_order: i,
            }))
          );
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

// Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}
