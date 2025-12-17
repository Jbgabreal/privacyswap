/**
 * FixedFloat Currencies API Route
 * GET /api/fixedfloat/ccies
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrencies } from "@/lib/fixedfloat";

export const runtime = "nodejs";

// Simple in-memory rate limiter (for development)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // 60 requests per minute

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

    // No body validation needed for currencies endpoint
    const currencies = await getCurrencies();

    return NextResponse.json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    console.error("[FixedFloat Ccies API Error]:", error);

    const message = error instanceof Error ? error.message : "Failed to fetch currencies";
    
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
