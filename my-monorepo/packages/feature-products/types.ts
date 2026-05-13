export type Product = {
  id: number;
  name: string;
  price: number;
  category: 'Footwear' | 'Accessories' | 'Apparel' | 'Gear';
  rating: number;
  inventory: number;
};

export type ProductFilters = {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
};

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';
