/**
 * FixedFloat Create Order API Route
 * POST /api/fixedfloat/create
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOrder } from "@/lib/fixedfloat";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Request validation schema
const createOrderRequestSchema = z.object({
  fromCcy: z.string().min(1, "From currency is required"),
  toCcy: z.string().min(1, "To currency is required"),
  amount: z.string().regex(/^\d+(\.\d+)?$/, "Amount must be a valid number"),
  rateType: z.enum(["fixed", "float"]),
  addressTo: z.string().min(1, "Destination address is required"),
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 30; // Lower limit for order creation

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
    const validated = createOrderRequestSchema.parse(body);

    // Create order with FixedFloat
    const orderData = await createOrder(validated);

    // Store in database
    const exchangeOrder = await db.exchangeOrder.create({
      data: {
        ffOrderId: orderData.id,
        fromCcy: validated.fromCcy,
        toCcy: validated.toCcy,
        amountFrom: validated.amount,
        rateType: validated.rateType,
        addressTo: validated.addressTo,
        depositAddress: orderData.depositAddress || null,
        status: orderData.status || "pending",
        rawResponse: orderData as unknown as Record<string, unknown>,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...orderData,
        localId: exchangeOrder.id,
      },
    });
  } catch (error) {
    console.error("[FixedFloat Create Order API Error]:", error);

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

    const message = error instanceof Error ? error.message : "Failed to create order";
    
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
