/**
 * Client-side API helper
 * Functions to call our own API routes
 */

const API_BASE = "/api/fixedfloat";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Currency type
export interface Currency {
  code: string;
  name: string;
  network?: string;
}

// Price quote data
export interface PriceData {
  fromCcy: string;
  toCcy: string;
  amountFrom: string;
  amountTo: string;
  rate: string;
  rateType: "fixed" | "float";
  validUntil?: number;
}

// Order data
export interface OrderData {
  id: string;
  fromCcy: string;
  toCcy: string;
  amountFrom: string;
  amountTo: string;
  rate: string;
  rateType: "fixed" | "float";
  addressTo: string;
  depositAddress?: string;
  status: string;
  localId?: string;
  isTerminal?: boolean;
  txHash?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Get list of supported currencies
 */
export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch(`${API_BASE}/ccies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const result: ApiResponse<Currency[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || "Failed to fetch currencies");
  }

  return result.data;
}

/**
 * Get price quote
 */
export async function getPrice(params: {
  fromCcy: string;
  toCcy: string;
  amount: string;
  rateType: "fixed" | "float";
}): Promise<PriceData> {
  const response = await fetch(`${API_BASE}/price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const result: ApiResponse<PriceData> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || "Failed to get price quote");
  }

  return result.data;
}

/**
 * Create exchange order
 */
export async function createOrder(params: {
  fromCcy: string;
  toCcy: string;
  amount: string;
  rateType: "fixed" | "float";
  addressTo: string;
}): Promise<OrderData> {
  const response = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const result: ApiResponse<OrderData> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || "Failed to create order");
  }

  return result.data;
}

/**
 * Get order status
 */
export async function getOrderStatus(params: {
  id: string;
  localId?: string;
}): Promise<OrderData> {
  const response = await fetch(`${API_BASE}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const result: ApiResponse<OrderData> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || "Failed to get order status");
  }

  return result.data;
}
