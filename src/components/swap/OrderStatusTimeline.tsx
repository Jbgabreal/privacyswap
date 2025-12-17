"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";
import type { OrderData } from "@/lib/api";

interface OrderStatusTimelineProps {
  order: OrderData;
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: "Pending",
    icon: <Clock className="w-5 h-5" />,
    color: "text-yellow-400",
  },
  waiting: {
    label: "Waiting for Payment",
    icon: <Clock className="w-5 h-5" />,
    color: "text-yellow-400",
  },
  confirming: {
    label: "Confirming",
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    color: "text-blue-400",
  },
  exchanging: {
    label: "Exchanging",
    icon: <Loader2 className="w-5 h-5 animate-spin" />,
    color: "text-blue-400",
  },
  finished: {
    label: "Completed",
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: "text-emerald-400",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-400",
  },
  expired: {
    label: "Expired",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-400",
  },
  refunded: {
    label: "Refunded",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-orange-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-400",
  },
};

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const status = order.status.toLowerCase();
  const config = STATUS_CONFIG[status] || {
    label: status,
    icon: <Clock className="w-5 h-5" />,
    color: "text-gray-400",
  };

  return (
    <Card className="glass-effect border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className={config.color}>{config.icon}</div>
            <div>
              <div className="text-white font-semibold">{config.label}</div>
              <div className="text-gray-400 text-sm">Order ID: {order.id}</div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`border-emerald-500/50 ${config.color.replace("text-", "text-")}`}
          >
            {order.status}
          </Badge>
        </div>

        {/* Order Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">From</span>
            <span className="text-white font-semibold">
              {order.amountFrom} {order.fromCcy}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-emerald-500/20">
            <span className="text-gray-400">To</span>
            <span className="text-white font-semibold">
              {order.amountTo} {order.toCcy}
            </span>
          </div>
        </div>

        {/* Transaction Hash */}
        {order.txHash && (
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <div className="text-gray-400 text-xs mb-1">Transaction Hash</div>
            <div className="text-emerald-400 font-mono text-xs break-all">{order.txHash}</div>
          </div>
        )}

        {/* Status Message */}
        {order.isTerminal && (
          <div className={`p-3 rounded-lg border ${
            status === "finished"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {status === "finished"
              ? "✓ Exchange completed successfully!"
              : `Order status: ${config.label}`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
