import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useSiteSetting<T = Record<string, unknown>>(key: string) {
  return useQuery({
    queryKey: ["site-setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", key)
        .single();
      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }
      return data.setting_value as T;
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useAllSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("setting_key");
      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      key,
      value,
    }: {
      key: string;
      value: Record<string, unknown>;
    }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert(
          { setting_key: key, setting_value: value },
          { onConflict: "setting_key" }
        );
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["site-setting", variables.key],
      });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}
