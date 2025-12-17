"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { SwapForm } from "@/components/swap/SwapForm";
import { QuoteCard } from "@/components/swap/QuoteCard";
import { OrderCreatedCard } from "@/components/swap/OrderCreatedCard";
import { OrderStatusTimeline } from "@/components/swap/OrderStatusTimeline";
import { toast } from "sonner";
import { createOrder, getOrderStatus, type PriceData, type OrderData } from "@/lib/api";

type SwapState = "form" | "quote" | "order" | "tracking";

export default function SwapPage() {
  const [state, setState] = useState<SwapState>("form");
  const [quote, setQuote] = useState<PriceData | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [addressTo, setAddressTo] = useState("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const backoffDelayRef = useRef(5000); // Start with 5 seconds

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleQuoteReceived = (quoteData: PriceData, destinationAddress: string) => {
    setQuote(quoteData);
    setAddressTo(destinationAddress);
    setState("quote");
  };

  const handleCreateOrder = async () => {
    if (!quote) return;

    setIsCreatingOrder(true);
    try {
      const orderData = await createOrder({
        fromCcy: quote.fromCcy,
        toCcy: quote.toCcy,
        amount: quote.amountFrom,
        rateType: quote.rateType,
        addressTo: addressTo,
      });

      setOrder(orderData);
      setState("order");
      
      // Start polling after a short delay
      setTimeout(() => {
        startPolling(orderData.id, orderData.localId);
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create order"
      );
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const startPolling = (orderId: string, localId?: string) => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    setIsPolling(true);
    setState("tracking");

    const poll = async () => {
      try {
        const orderData = await getOrderStatus({
          id: orderId,
          localId,
        });

        setOrder(orderData);

        // If terminal status, stop polling
        if (orderData.isTerminal) {
          stopPolling();
          if (orderData.status.toLowerCase() === "finished") {
            toast.success("Exchange completed successfully!");
          } else {
            toast.error(`Order ${orderData.status}`);
          }
        } else {
          // Reset backoff on successful poll
          backoffDelayRef.current = 5000;
        }
      } catch (error) {
        console.error("Polling error:", error);
        
        // Back off on errors
        backoffDelayRef.current = Math.min(backoffDelayRef.current * 2, 30000); // Max 30 seconds
        
        // If it's a rate limit error, wait longer
        if (error instanceof Error && error.message.includes("rate limit")) {
          backoffDelayRef.current = 10000; // 10 seconds for rate limits
        }
      }
    };

    // Initial poll
    poll();

    // Set up interval with current backoff delay
    pollingIntervalRef.current = setInterval(poll, backoffDelayRef.current);
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPolling(false);
  };

  const handleReset = () => {
    stopPolling();
    setState("form");
    setQuote(null);
    setOrder(null);
    setAddressTo("");
    backoffDelayRef.current = 5000;
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-emerald-950/20" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Instant Crypto Exchange</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Swap cryptocurrencies instantly with competitive rates
            </p>
          </div>

          {/* Swap Interface */}
          <div className="space-y-6">
            {state === "form" && (
              <SwapForm
                onQuoteReceived={(quoteData) => {
                  // Extract address from form state - we'll need to pass it through
                  // For now, we'll get it from the quote card
                  handleQuoteReceived(quoteData);
                }}
                isLoading={isCreatingOrder}
              />
            )}

            {state === "quote" && quote && (
              <div className="space-y-6">
                <QuoteCard
                  quote={quote}
                  addressTo={addressTo}
                  onCreateOrder={handleCreateOrder}
                  isCreating={isCreatingOrder}
                />
                <div className="flex justify-center">
                  <button
                    onClick={() => setState("form")}
                    className="text-emerald-400 hover:text-emerald-300 text-sm underline"
                  >
                    Modify Exchange
                  </button>
                </div>
              </div>
            )}

            {state === "order" && order && (
              <div className="space-y-6">
                <OrderCreatedCard order={order} />
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="text-emerald-400 hover:text-emerald-300 text-sm underline"
                  >
                    Create New Exchange
                  </button>
                </div>
              </div>
            )}

            {state === "tracking" && order && (
              <div className="space-y-6">
                <OrderStatusTimeline order={order} />
                {isPolling && (
                  <div className="text-center text-gray-400 text-sm">
                    Auto-updating order status...
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="text-emerald-400 hover:text-emerald-300 text-sm underline"
                  >
                    Create New Exchange
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Compliance Notice */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-xs">
              Exchange orders are executed via a third-party provider.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
