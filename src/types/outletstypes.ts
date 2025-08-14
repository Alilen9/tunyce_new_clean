// src/types/outletTypes.ts (or relevant path)

// This type represents a simple string name with length constraints if needed by backend validation
type NameString = string; // MaxLength: 100, MinLength: 1 for name, could be 255 for outlet name

export interface Outlet {
  imageUrl: string;
  id: number; // Unique identifier for the outlet
  name: NameString; // Outlet's name (string, maxLength: 255, minLength: 1)
  outlet_type_id: number; // ID of the associated Outlet Type
  industry_id: number; // ID of the associated Industry
  good_ids?: number[]; // Array of good IDs (optional, unique items)
  service_ids?: number[]; // Array of service IDs (optional, unique items)
  number_of_seats?: number | null; // Nullable, 0 to 2147483647
  estimated_workers?: number | null; // Nullable, 0 to 2147483647
  estimated_daily_visitors?: number | null; // Nullable, 0 to 2147483647
  latitude?: string | null; // Nullable, max length 20
  longitude?: string | null; // Nullable, max length 20
  created_at?: string; // Example, could be a date string
  updated_at?: string; // Example, could be a date string
}
export interface OutletType {
  id: number;
  name: NameString;
}

export interface IndustryType {
  id?: number;
  name: NameString;
}
export interface GoodsType {
  id?: number;
  name: NameString;
}

export interface ServiceType {
  name: NameString;
  category: Category;
  categoryId: number;
}

export interface Category {
  id?: number;
  name: NameString;
}

export interface ServiceResponse {
  id?: number;
  name: string;
  category?: Category;
  categoryId?: number;
}

export interface CreateOutletPayload {
  name: NameString; // Outlet's name (string, maxLength: 255, minLength: 1)
  outlet_type_id: number; // ID of the associated Outlet Type
  industry_id: number; // ID of the associated Industry
  good_ids?: number[]; // Array of good IDs (optional, unique items)
  service_ids?: number[]; // Array of service IDs (optional, unique items)
  number_of_seats?: number | null; // Nullable, 0 to 2147483647
  estimated_workers?: number | null; // Nullable, 0 to 2147483647
  estimated_daily_visitors?: number | null; // Nullable, 0 to 2147483647
  latitude?: string | null; // Nullable, max length 20
  longitude?: string | null; // Nullable, max length 20
}

export interface CreatedOutletResponse extends CreateOutletPayload {
  id: number; // The ID of the newly created outlet
  created_at?: string; // Example
  updated_at?: string; // Example
}

