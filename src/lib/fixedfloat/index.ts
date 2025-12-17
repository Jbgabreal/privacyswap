/**
 * FixedFloat API Client
 * Main entry point for FixedFloat API operations
 */

import { fixedFloatPost } from "./client";
import type {
  Currency,
  PriceRequest,
  PriceResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderStatusRequest,
  OrderStatusResponse,
} from "./types";

// Get API credentials from environment
function getConfig() {
  const apiKey = process.env.FIXEDFLOAT_API_KEY;
  const apiSecret = process.env.FIXEDFLOAT_API_SECRET;

  return { apiKey, apiSecret };
}

/**
 * Get list of supported currencies
 */
export async function getCurrencies(): Promise<Currency[]> {
  const config = getConfig();
  const response = await fixedFloatPost<{ data: Currency[] }>(
    "/ccies",
    {},
    config
  );
  return response.data || [];
}

/**
 * Get price quote for a swap
 */
export async function getPrice(
  params: PriceRequest
): Promise<PriceResponse["data"]> {
  const config = getConfig();
  const response = await fixedFloatPost<PriceResponse>(
    "/price",
    {
      fromCcy: params.fromCcy,
      toCcy: params.toCcy,
      amount: params.amount,
      type: params.rateType, // FixedFloat uses "type" not "rateType"
    },
    config
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || "Failed to get price");
  }

  return response.data;
}

/**
 * Create a new exchange order
 */
export async function createOrder(
  params: CreateOrderRequest
): Promise<CreateOrderResponse["data"]> {
  const config = getConfig();
  const response = await fixedFloatPost<CreateOrderResponse>(
    "/create",
    {
      fromCcy: params.fromCcy,
      toCcy: params.toCcy,
      amount: params.amount,
      type: params.rateType, // FixedFloat uses "type" not "rateType"
      addressTo: params.addressTo,
    },
    config
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || "Failed to create order");
  }

  return response.data;
}

/**
 * Get order status by order ID
 */
export async function getOrder(
  params: OrderStatusRequest
): Promise<OrderStatusResponse["data"]> {
  const config = getConfig();
  const response = await fixedFloatPost<OrderStatusResponse>(
    "/order",
    {
      id: params.id,
    },
    config
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || "Failed to get order status");
  }

  return response.data;
}
