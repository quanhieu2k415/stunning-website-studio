import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Service, ServiceFeature, ProcessStep } from "@/types/database";

export type ServiceWithFeatures = Service & { features: ServiceFeature[] };

export function useServices(context?: string) {
  return useQuery({
    queryKey: ["services", context],
    queryFn: async () => {
      let query = supabase
        .from("services")
        .select("*, features:service_features(*)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (context) {
        query = query.or(`display_context.eq.${context},display_context.eq.both`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as ServiceWithFeatures[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useAdminServices() {
  return useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*, features:service_features(*)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ServiceWithFeatures[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 1000,
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*, features:service_features(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as ServiceWithFeatures;
    },
    enabled: isSupabaseConfigured() && !!id,
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: {
      icon: string;
      title: string;
      description: string;
      display_context?: string;
      sort_order?: number;
      features?: string[];
    }) => {
      const { features, ...data } = service;
      const { data: newService, error } = await supabase
        .from("services")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      if (features?.length) {
        const { error: featError } = await supabase
          .from("service_features")
          .insert(
            features.map((f, i) => ({
              service_id: newService.id,
              feature: f,
              sort_order: i,
            }))
          );
        if (featError) throw featError;
      }
      return newService;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["admin-services"] });
    },
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      features,
      ...data
    }: {
      id: string;
      icon?: string;
      title?: string;
      description?: string;
      display_context?: string;
      sort_order?: number;
      is_active?: boolean;
      features?: string[];
    }) => {
      const { error: updateError } = await supabase
        .from("services")
        .update(data)
        .eq("id", id);
      if (updateError) throw updateError;

      if (features !== undefined) {
        const { error: delError } = await supabase
          .from("service_features")
          .delete()
          .eq("service_id", id);
        if (delError) throw delError;

        if (features.length) {
          const { error: insError } = await supabase
            .from("service_features")
            .insert(
              features.map((f, i) => ({
                service_id: id,
                feature: f,
                sort_order: i,
              }))
            );
          if (insError) throw insError;
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["admin-services"] });
      qc.invalidateQueries({ queryKey: ["service"] });
    },
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["admin-services"] });
    },
  });
}

// Process Steps
export function useProcessSteps() {
  return useQuery({
    queryKey: ["process-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .eq("is_active", true)
        .order("step_number", { ascending: true });
      if (error) throw error;
      return data as ProcessStep[];
    },
    enabled: isSupabaseConfigured(),
    staleTime: 30 * 60 * 1000,
  });
}

export function useUpdateProcessSteps() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      steps: { step_number: number; title: string; description: string }[]
    ) => {
      // Delete all existing steps first
      const { error: delError } = await supabase
        .from("process_steps")
        .delete()
        .gte("step_number", 0);
      if (delError) throw delError;

      if (steps.length) {
        const { error } = await supabase.from("process_steps").insert(steps);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["process-steps"] });
    },
  });
}
