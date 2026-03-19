import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Brand } from "@/types/database";

export function useBrands(active = true) {
  return useQuery({
    queryKey: ["brands", { active }],
    queryFn: async () => {
      let query = supabase.from("brands").select("*").order("name", { ascending: true });
      if (active) query = query.eq("is_active", true);
      const { data, error } = await query;
      if (error) throw error;
      return data as Brand[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brand: { name: string; logo_url?: string }) => {
      const { data, error } = await supabase
        .from("brands")
        .insert(brand)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Brand> & { id: string }) => {
      const { error } = await supabase
        .from("brands")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("brands").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}
