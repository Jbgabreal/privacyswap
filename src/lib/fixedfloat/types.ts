/**
 * FixedFloat API Types
 * Server-only types for FixedFloat API integration
 */

export type RateType = "fixed" | "float";

// Currency list response
export interface Currency {
  code: string;
  name: string;
  network?: string;
}

export interface CurrenciesResponse {
  success: boolean;
  data?: Currency[];
  error?: {
    message: string;
    code?: string;
  };
}

// Price/Quote request
export interface PriceRequest {
  fromCcy: string;
  toCcy: string;
  amount: string;
  rateType: RateType;
}

// Price/Quote response
export interface PriceResponse {
  success: boolean;
  data?: {
    fromCcy: string;
    toCcy: string;
    amountFrom: string;
    amountTo: string;
    rate: string;
    rateType: RateType;
    validUntil?: number;
  };
  error?: {
    message: string;
    code?: string;
  };
}

// Create order request
export interface CreateOrderRequest {
  fromCcy: string;
  toCcy: string;
  amount: string;
  rateType: RateType;
  addressTo: string;
}

// Create order response
export interface CreateOrderResponse {
  success: boolean;
  data?: {
    id: string;
    fromCcy: string;
    toCcy: string;
    amountFrom: string;
    amountTo: string;
    rate: string;
    rateType: RateType;
    addressTo: string;
    depositAddress?: string;
    status: string;
  };
  error?: {
    message: string;
    code?: string;
  };
}

// Order status request
export interface OrderStatusRequest {
  id: string;
}

// Order status response
export interface OrderStatusResponse {
  success: boolean;
  data?: {
    id: string;
    fromCcy: string;
    toCcy: string;
    amountFrom: string;
    amountTo: string;
    rate: string;
    rateType: RateType;
    addressTo: string;
    depositAddress?: string;
    status: string;
    txHash?: string;
    createdAt?: number;
    updatedAt?: number;
  };
  error?: {
    message: string;
    code?: string;
  };
}

// FixedFloat API error
export class FixedFloatError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public payload?: unknown
  ) {
    super(message);
    this.name = "FixedFloatError";
  }
}
