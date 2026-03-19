import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Category } from "@/types/database";

export function useCategories(active = true) {
  return useQuery({
    queryKey: ["categories", { active }],
    queryFn: async () => {
      let query = supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (active) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Category[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Category;
    },
    enabled: isSupabaseConfigured() && !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: {
      slug: string;
      name: string;
      icon?: string;
      color?: string;
      description?: string;
      display_group?: string;
      sort_order?: number;
    }) => {
      const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Category> & { id: string }) => {
      const { error } = await supabase
        .from("categories")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
