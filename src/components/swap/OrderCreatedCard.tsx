"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { OrderData } from "@/lib/api";

interface OrderCreatedCardProps {
  order: OrderData;
}

export function OrderCreatedCard({ order }: OrderCreatedCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy address");
    }
  };

  return (
    <Card className="glass-effect border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-black/40">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-emerald-400" />
          Order Created
        </CardTitle>
        <CardDescription className="text-gray-400">
          Send your funds to the deposit address below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order ID */}
        <div className="p-3 bg-black/40 rounded-lg border border-emerald-500/20">
          <div className="text-gray-400 text-xs mb-1">Order ID</div>
          <div className="text-white font-mono text-sm break-all">{order.id}</div>
        </div>

        {/* Deposit Address */}
        {order.depositAddress && (
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Deposit Address</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-black/40 rounded-lg border border-emerald-500/20">
                <div className="text-white font-mono text-xs break-all">
                  {order.depositAddress}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(order.depositAddress!)}
                className="border-emerald-500/30 hover:bg-emerald-500/20"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-emerald-400" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Exchange Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">Send</span>
            <span className="text-white font-semibold">
              {order.amountFrom} {order.fromCcy}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">Receive</span>
            <span className="text-white font-semibold">
              {order.amountTo} {order.toCcy}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Status</span>
            <Badge
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 capitalize"
            >
              {order.status}
            </Badge>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-black/40 rounded-lg border border-emerald-500/20">
          <div className="text-gray-300 text-sm space-y-2">
            <p className="font-semibold text-white mb-2">Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-400">
              <li>Send exactly {order.amountFrom} {order.fromCcy} to the deposit address above</li>
              <li>Do not send from an exchange directly</li>
              <li>Your {order.toCcy} will be sent to: {order.addressTo}</li>
              <li>Transaction will be processed automatically</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
