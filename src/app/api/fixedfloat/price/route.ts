/**
 * FixedFloat Price/Quote API Route
 * POST /api/fixedfloat/price
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPrice } from "@/lib/fixedfloat";

export const runtime = "nodejs";

// Request validation schema
const priceRequestSchema = z.object({
  fromCcy: z.string().min(1, "From currency is required"),
  toCcy: z.string().min(1, "To currency is required"),
  amount: z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number"),
  rateType: z.enum(["fixed", "float"], {
    errorMap: () => ({ message: "Rate type must be 'fixed' or 'float'" }),
  }),
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 60;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: { message: "Rate limit exceeded", code: "RATE_LIMIT" } },
        { status: 429 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validated = priceRequestSchema.parse(body);

    // Get price quote
    const priceData = await getPrice(validated);

    return NextResponse.json({
      success: true,
      data: priceData,
    });
  } catch (error) {
    console.error("[FixedFloat Price API Error]:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.errors[0]?.message || "Invalid request",
            code: "VALIDATION_ERROR",
          },
        },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "Failed to get price quote";
    
    return NextResponse.json(
      {
        success: false,
        error: {
          message,
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
