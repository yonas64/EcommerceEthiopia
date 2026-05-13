import { productCatalog } from './data';
import { Product } from './types';

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productCatalog), 150);
  });
};
