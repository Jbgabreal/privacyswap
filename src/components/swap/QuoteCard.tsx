"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import type { PriceData } from "@/lib/api";

interface QuoteCardProps {
  quote: PriceData;
  addressTo: string;
  onCreateOrder: () => void;
  isCreating?: boolean;
}

export function QuoteCard({ quote, addressTo, onCreateOrder, isCreating }: QuoteCardProps) {
  return (
    <Card className="glass-effect border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-black/40">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          Price Quote
        </CardTitle>
        <CardDescription className="text-gray-400">
          Review the exchange rate before proceeding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exchange Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">You Send</span>
            <span className="text-white font-semibold text-lg">
              {quote.amountFrom} {quote.fromCcy}
            </span>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-emerald-400 rotate-90" />
          </div>

          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">You Receive</span>
            <span className="text-white font-semibold text-lg">
              {quote.amountTo} {quote.toCcy}
            </span>
          </div>
        </div>

        {/* Rate Info */}
        <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Exchange Rate</span>
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
              {quote.rateType.toUpperCase()}
            </Badge>
          </div>
          <div className="text-emerald-400 font-mono text-sm">
            1 {quote.fromCcy} = {quote.rate} {quote.toCcy}
          </div>
        </div>

        {/* Destination Address */}
        <div className="p-3 bg-black/40 rounded-lg border border-emerald-500/20">
          <div className="text-gray-400 text-xs mb-1">Destination Address</div>
          <div className="text-white font-mono text-xs break-all">{addressTo}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={onCreateOrder}
            disabled={isCreating}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Order...
              </>
            ) : (
              <>
                Create Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
