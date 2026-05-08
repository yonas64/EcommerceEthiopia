import React from 'react';

type Props = {
  stock: number;
  threshold?: number;
  className?: string;
};

const LowStockBadge: React.FC<Props> = ({ stock, threshold = 5, className }) => {
  if (stock > threshold) return null;
  return (
    <span
      className={className}
      style={{ background: '#ffe9e9', color: '#c00', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}
      aria-live="polite"
    >
      Low stock ({stock} left)
    </span>
  );
};

export default LowStockBadge;
