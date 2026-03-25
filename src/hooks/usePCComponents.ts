import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  PCComponentCategory,
  PCComponent,
  PrebuiltConfig,
  PrebuiltConfigSpec,
} from "@/types/database";

export type PCCategoryWithComponents = PCComponentCategory & {
  components: PCComponent[];
};
export type PrebuiltConfigWithSpecs = PrebuiltConfig & {
  specs: PrebuiltConfigSpec[];
};

export function usePCComponentCategories() {
  return useQuery({
    queryKey: ["pc-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pc_component_categories")
        .select("*, components:pc_components(*)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as PCCategoryWithComponents[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdatePCCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      components,
      ...data
    }: {
      id: string;
      name?: string;
      icon?: string;
      components?: { name: string; price: number; specs: string }[];
    }) => {
      if (Object.keys(data).length) {
        const { error } = await supabase
          .from("pc_component_categories")
          .update(data)
          .eq("id", id);
        if (error) throw error;
      }
      if (components !== undefined) {
        const { error: delError } = await supabase
          .from("pc_components")
          .delete()
          .eq("category_id", id);
        if (delError) throw delError;

        if (components.length) {
          const { error: insError } = await supabase
            .from("pc_components")
            .insert(
              components.map((c, i) => ({
                category_id: id,
                ...c,
                sort_order: i,
              }))
            );
          if (insError) throw insError;
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pc-categories"] });
      qc.invalidateQueries({ queryKey: ["public-pc-categories"] });
      qc.invalidateQueries({ queryKey: ["public-prebuilt-configs"] });
    },
  });
}

export function usePrebuiltConfigs() {
  return useQuery({
    queryKey: ["prebuilt-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prebuilt_configs")
        .select("*, specs:prebuilt_config_specs(*)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as PrebuiltConfigWithSpecs[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdatePrebuiltConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      configSpecs,
      ...data
    }: {
      id: string;
      name?: string;
      description?: string;
      price?: number;
      color?: string;
      configSpecs?: string[];
    }) => {
      if (Object.keys(data).length) {
        const { error } = await supabase
          .from("prebuilt_configs")
          .update(data)
          .eq("id", id);
        if (error) throw error;
      }
      if (configSpecs !== undefined) {
        const { error: delError } = await supabase
          .from("prebuilt_config_specs")
          .delete()
          .eq("config_id", id);
        if (delError) throw delError;

        if (configSpecs.length) {
          const { error: insError } = await supabase
            .from("prebuilt_config_specs")
            .insert(
              configSpecs.map((s, i) => ({
                config_id: id,
                label: s,
                sort_order: i,
              }))
            );
          if (insError) throw insError;
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prebuilt-configs"] });
      qc.invalidateQueries({ queryKey: ["public-pc-categories"] });
      qc.invalidateQueries({ queryKey: ["public-prebuilt-configs"] });
    },
  });
}

export function useCreatePrebuiltConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (config: {
      slug: string;
      name: string;
      description?: string;
      price: number;
      color?: string;
      configSpecs?: string[];
    }) => {
      const { configSpecs, ...data } = config;
      const { data: newConfig, error } = await supabase
        .from("prebuilt_configs")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      if (configSpecs?.length) {
        const { error: specError } = await supabase
          .from("prebuilt_config_specs")
          .insert(
            configSpecs.map((s, i) => ({
              config_id: newConfig.id,
              label: s,
              sort_order: i,
            }))
          );
        if (specError) throw specError;
      }
      return newConfig;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prebuilt-configs"] });
      qc.invalidateQueries({ queryKey: ["public-pc-categories"] });
      qc.invalidateQueries({ queryKey: ["public-prebuilt-configs"] });
    },
  });
}
