export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          icon: string | null;
          color: string | null;
          description: string | null;
          display_group: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      brands: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["brands"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["brands"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          legacy_id: number | null;
          name: string;
          slug: string;
          sku: string | null;
          price: string;
          original_price: string;
          category_id: string | null;
          brand_id: string | null;
          badge: string | null;
          badge_color: string | null;
          description: string | null;
          warranty: string;
          in_stock: boolean;
          rating: number;
          reviews: number;
          is_featured: boolean;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["product_images"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
      };
      product_features: {
        Row: {
          id: string;
          product_id: string;
          feature: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["product_features"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_features"]["Insert"]>;
      };
      product_specs: {
        Row: {
          id: string;
          product_id: string;
          spec_key: string;
          spec_value: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["product_specs"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_specs"]["Insert"]>;
      };
      services: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          display_context: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      service_features: {
        Row: {
          id: string;
          service_id: string;
          feature: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["service_features"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_features"]["Insert"]>;
      };
      process_steps: {
        Row: {
          id: string;
          step_number: number;
          title: string;
          description: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["process_steps"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["process_steps"]["Insert"]>;
      };
      pc_component_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          icon: string;
          is_required: boolean;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pc_component_categories"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pc_component_categories"]["Insert"]>;
      };
      pc_components: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          price: number;
          specs: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pc_components"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pc_components"]["Insert"]>;
      };
      prebuilt_configs: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          price: number;
          color: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["prebuilt_configs"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["prebuilt_configs"]["Insert"]>;
      };
      prebuilt_config_specs: {
        Row: {
          id: string;
          config_id: string;
          label: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["prebuilt_config_specs"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["prebuilt_config_specs"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Record<string, unknown>;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["site_settings"]["Row"], "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
      about_expertise: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["about_expertise"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["about_expertise"]["Insert"]>;
      };
      about_expertise_features: {
        Row: {
          id: string;
          expertise_id: string;
          feature: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["about_expertise_features"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["about_expertise_features"]["Insert"]>;
      };
      about_values: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["about_values"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["about_values"]["Insert"]>;
      };
      about_clients: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["about_clients"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["about_clients"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience type aliases
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Brand = Database["public"]["Tables"]["brands"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductFeature = Database["public"]["Tables"]["product_features"]["Row"];
export type ProductSpec = Database["public"]["Tables"]["product_specs"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceFeature = Database["public"]["Tables"]["service_features"]["Row"];
export type ProcessStep = Database["public"]["Tables"]["process_steps"]["Row"];
export type PCComponentCategory = Database["public"]["Tables"]["pc_component_categories"]["Row"];
export type PCComponent = Database["public"]["Tables"]["pc_components"]["Row"];
export type PrebuiltConfig = Database["public"]["Tables"]["prebuilt_configs"]["Row"];
export type PrebuiltConfigSpec = Database["public"]["Tables"]["prebuilt_config_specs"]["Row"];
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];
export type AboutExpertise = Database["public"]["Tables"]["about_expertise"]["Row"];
export type AboutExpertiseFeature = Database["public"]["Tables"]["about_expertise_features"]["Row"];
export type AboutValue = Database["public"]["Tables"]["about_values"]["Row"];
export type AboutClient = Database["public"]["Tables"]["about_clients"]["Row"];

// Extended types with relations
export type ProductWithRelations = Product & {
  category: Category | null;
  brand: Brand | null;
  images: ProductImage[];
  features: ProductFeature[];
  specs: ProductSpec[];
};
