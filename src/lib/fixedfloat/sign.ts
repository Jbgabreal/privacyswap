/**
 * FixedFloat API Signing
 * HMAC-SHA256 signature generation for FixedFloat API requests
 */

import { createHmac } from "crypto";

/**
 * Signs a JSON body string using HMAC-SHA256 with the provided secret
 * @param secret - FixedFloat API secret
 * @param jsonBody - Raw JSON string of the request body
 * @returns Hexadecimal signature string
 */
export function signBody(secret: string, jsonBody: string): string {
  const hmac = createHmac("sha256", secret);
  hmac.update(jsonBody);
  return hmac.digest("hex");
}
