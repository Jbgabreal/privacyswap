/**
 * FixedFloat API Client
 * Server-only client for making authenticated requests to FixedFloat API
 */

import { signBody } from "./sign";
import { FixedFloatError } from "./types";

const FIXEDFLOAT_API_BASE = "https://ff.io/api/v2";

interface FixedFloatClientConfig {
  apiKey: string;
  apiSecret: string;
}

/**
 * Creates a signed POST request to FixedFloat API
 * @param path - API endpoint path (e.g., "/ccies", "/price")
 * @param body - Request body object (will be JSON stringified)
 * @param config - API credentials
 * @returns Promise resolving to the response data
 */
export async function fixedFloatPost<T>(
  path: string,
  body: unknown,
  config: FixedFloatClientConfig
): Promise<T> {
  const { apiKey, apiSecret } = config;

  if (!apiKey || !apiSecret) {
    throw new FixedFloatError(
      "FixedFloat API credentials are not configured",
      500,
      "MISSING_CREDENTIALS"
    );
  }

  // Convert body to raw JSON string (must be exact for signature)
  const rawJsonBody = JSON.stringify(body);

  // Generate signature
  const signature = signBody(apiSecret, rawJsonBody);

  // Make request
  const url = `${FIXEDFLOAT_API_BASE}${path}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
        "X-API-SIGN": signature,
      },
      body: rawJsonBody,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new FixedFloatError(
        responseData.message || `API request failed with status ${response.status}`,
        response.status,
        responseData.code || "API_ERROR",
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof FixedFloatError) {
      throw error;
    }

    // Network or parsing errors
    throw new FixedFloatError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "NETWORK_ERROR",
      error
    );
  }
}
