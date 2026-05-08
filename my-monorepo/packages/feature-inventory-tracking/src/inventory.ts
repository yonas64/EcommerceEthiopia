export type Availability = {
  productId: string;
  available: boolean;
  stock: number;
};

// Placeholder: replace with real API calls or websocket integration.
export async function checkAvailability(productId: string): Promise<Availability> {
  // demo: read from localStorage if present
  try {
    const raw = localStorage.getItem(`inventory:${productId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { productId, available: parsed.stock > 0, stock: parsed.stock };
    }
  } catch {}
  // default: available
  return { productId, available: true, stock: 10 };
}

export async function reserveStock(productId: string, qty: number): Promise<boolean> {
  // Very small demo implementation: decrement localStorage stock if available.
  try {
    const raw = localStorage.getItem(`inventory:${productId}`);
    let stock = raw ? JSON.parse(raw).stock : 10;
    if (stock >= qty) {
      stock -= qty;
      localStorage.setItem(`inventory:${productId}`, JSON.stringify({ stock }));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
