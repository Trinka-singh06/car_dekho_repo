// export interface Variant {
//     id: number;
//     name: string;
//     engine: string;
//     power: string;
//     transmission: string;
//     torgue: string;
//     price: string;
//     images: string;
//     mileage: string;
//     fueltype: string;
//   }
  
//   export interface Model {
//     images: string;
//     modelId: number;
//     name: string;
//     variants: Variant[];
//   }
  
//   export interface Make {
//     makeId: number;
//     name: string;
//     models: Model[];
//   }
  
//   export interface Category {
//     categoryId: number;
//     name: string;
//     makes?: Make[];
//   }
  
//   export interface MenuHeading {
//     menuId: number;
//     name: string;
//     category: Category[];
//   }
export interface CarVariant {
  id: number;
  name: string;
  engine: string;
  power: string;
  transmission: string;
  torgue: string;
  price: string;
  images?: string;
  imageUrl?: string;
  mileage: string;
  fueltype: string;
}

export interface CarModel {
  modelId: number;
  name: string;
  makeName?: string;
  variants: CarVariant[];
}

export interface Make {
  makeId: number;
  name: string;
  models: CarModel[];
}

export interface Category {
  categoryId: number;
  name: string;
  makes?: Make[];
}

export interface Menu {
  menuId: number;
  name: string;
  category: Category[];
}


export class Car {
  id: number;
  name: string;
  price: string;
  images: string;
  engine: string;
  power: string;
  transmission: string;
  torgue: string;
  mileage: string;
  body_type: string;
  seating_capacity: number;
  launch_status: string;
  year: number;
  fueltype: string;
  model: {
    modelId: number;
    name: string;
    price: string;
    // other model properties...
    make: {
      makeId: number;
      name: string;
      logo: string;
    }
  }
}