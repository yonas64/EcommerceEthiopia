import { searchProducts } from 'utils';
import { Product, ProductFilters, SortKey } from './types';

const parsePrice = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const filterProducts = (products: Product[], filters: ProductFilters) => {
  let result = products;

  if (filters.query.trim()) {
    result = searchProducts(result, filters.query);
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((product) => product.category === filters.category);
  }

  const minPrice = parsePrice(filters.minPrice);
  const maxPrice = parsePrice(filters.maxPrice);

  if (minPrice !== undefined) {
    result = result.filter((product) => product.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    result = result.filter((product) => product.price <= maxPrice);
  }

  if (filters.inStockOnly) {
    result = result.filter((product) => product.inventory > 0);
  }

  return result;
};

export const sortProducts = (products: Product[], sortKey: SortKey) => {
  const sorted = [...products];

  switch (sortKey) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
