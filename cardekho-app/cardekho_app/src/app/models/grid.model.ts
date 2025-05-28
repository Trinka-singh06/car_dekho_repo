export interface PaginationResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ModelData {
  modelId: number;
  name: string;
  price: string;
  engine: string;
  power: string;
  transmission: string;
  torgue: string;
  body_type: string;
  seating_capacity: number;
  launch_status: string;
  year: number;
  mileage: string;
  fueltype: string;
  images: string;
  make: {
    makeId: number;
    name: string;
  };
  variants: any[];
}