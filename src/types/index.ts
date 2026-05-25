export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Electric' | 'Petrol' | 'Diesel' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Van';
  color: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  features: string[];
  description: string;
  acceleration: string;
  topSpeed: string;
  range?: string;
  horsepower: number;
};

export type FilterState = {
  search: string;
  make: string;
  bodyType: string;
  fuelType: string;
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  transmission: string;
};

export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'rating-desc' | 'mileage-asc';
