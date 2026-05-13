'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, Input } from 'ui-components';
import { formatPrice } from 'utils';
import { fetchProducts } from './api';
import { filterProducts, sortProducts } from './helpers';
import { Product, ProductFilters, SortKey } from './types';

const defaultFilters: ProductFilters = {
  query: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
  inStockOnly: false,
};

export const ProductsFeature = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [sortKey, setSortKey] = useState<SortKey>('featured');

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchProducts().then((data) => {
      if (!active) {
        return;
      }

      setProducts(data);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const values = new Set(products.map((product) => product.category));
    return ['all', ...Array.from(values)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortKey);
  }, [products, filters, sortKey]);

  const handleReset = () => {
    setFilters(defaultFilters);
    setSortKey('featured');
  };

  return (
    <Card>
      <h2>Products</h2>
      <p>Browse the catalog and refine by category, price, and stock.</p>

      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        <Input
          value={filters.query}
          onChange={(event) => setFilters({ ...filters, query: event.target.value })}
          placeholder="Search products"
        />

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            Category
            <select
              value={filters.category}
              onChange={(event) => setFilters({ ...filters, category: event.target.value })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 120 }}>
            Min price
            <input
              type="number"
              value={filters.minPrice}
              onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })}
              placeholder="0"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 120 }}>
            Max price
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
              placeholder="200"
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(event) =>
                setFilters({ ...filters, inStockOnly: event.target.checked })
              }
            />
            In stock only
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 160 }}>
            Sort by
            <select value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleReset}
            style={{ alignSelf: 'flex-end' }}
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div>
          <div style={{ marginBottom: 12 }}>
            Showing {visibleProducts.length} of {products.length} products
          </div>

          {visibleProducts.length === 0 ? (
            <div>No products match your filters.</div>
          ) : (
            visibleProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #eee',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <strong>{product.name}</strong>
                    <div style={{ fontSize: 12, color: '#666' }}>{product.category}</div>
                  </div>
                  <div>{formatPrice(product.price)}</div>
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
                  Rating {product.rating} / 5
                </div>
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
};
