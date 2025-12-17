/**
 * FixedFloat Order Status API Route
 * POST /api/fixedfloat/order
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOrder } from "@/lib/fixedfloat";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Request validation schema
const orderStatusRequestSchema = z.object({
  id: z.string().min(1, "Order ID is required"),
  localId: z.string().optional(), // Optional local database ID
});

// Terminal statuses that indicate polling should stop
const TERMINAL_STATUSES = ["finished", "failed", "expired", "refunded", "cancelled"];

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
    const validated = orderStatusRequestSchema.parse(body);

    // Get order status from FixedFloat
    const orderData = await getOrder({ id: validated.id });

    // Update database if localId is provided
    if (validated.localId) {
      await db.exchangeOrder.update({
        where: { id: validated.localId },
        data: {
          status: orderData.status,
          depositAddress: orderData.depositAddress || undefined,
          rawResponse: orderData as unknown as Record<string, unknown>,
          updatedAt: new Date(),
        },
      });
    } else {
      // Try to find by ffOrderId and update
      await db.exchangeOrder.updateMany({
        where: { ffOrderId: validated.id },
        data: {
          status: orderData.status,
          depositAddress: orderData.depositAddress || undefined,
          rawResponse: orderData as unknown as Record<string, unknown>,
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...orderData,
        isTerminal: TERMINAL_STATUSES.includes(orderData.status.toLowerCase()),
      },
    });
  } catch (error) {
    console.error("[FixedFloat Order Status API Error]:", error);

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

    const message = error instanceof Error ? error.message : "Failed to get order status";
    
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
