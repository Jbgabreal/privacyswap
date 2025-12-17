"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Currency, PriceData } from "@/lib/api";
import { getCurrencies, getPrice } from "@/lib/api";

interface SwapFormProps {
  onQuoteReceived: (quote: PriceData, addressTo: string) => void;
  isLoading?: boolean;
}

// Common cryptocurrencies for initial dropdown (will be replaced with API data)
const COMMON_CURRENCIES: Currency[] = [
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "USDT", name: "Tether" },
  { code: "USDC", name: "USD Coin" },
  { code: "SOL", name: "Solana" },
  { code: "BNB", name: "BNB" },
  { code: "XRP", name: "Ripple" },
  { code: "ADA", name: "Cardano" },
];

export function SwapForm({ onQuoteReceived, isLoading: externalLoading }: SwapFormProps) {
  const [fromCcy, setFromCcy] = useState("BTC");
  const [toCcy, setToCcy] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [rateType, setRateType] = useState<"fixed" | "float">("fixed");
  const [addressTo, setAddressTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>(COMMON_CURRENCIES);
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);

  // Load currencies on mount
  useEffect(() => {
    const loadCurrencies = async () => {
      setLoadingCurrencies(true);
      try {
        const data = await getCurrencies();
        if (data && data.length > 0) {
          setCurrencies(data);
        }
      } catch (error) {
        console.error("Failed to load currencies:", error);
        // Keep default currencies on error
      } finally {
        setLoadingCurrencies(false);
      }
    };

    loadCurrencies();
  }, []);

  const handleSwapCurrencies = () => {
    const temp = fromCcy;
    setFromCcy(toCcy);
    setToCcy(temp);
    setAmount("");
  };

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!addressTo.trim()) {
      toast.error("Please enter a destination address");
      return;
    }

    setIsLoading(true);
    try {
      const quote = await getPrice({
        fromCcy,
        toCcy,
        amount,
        rateType,
      });
      onQuoteReceived(quote, addressTo);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to get price quote"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-effect border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Create Exchange Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Currency */}
        <div className="space-y-2">
          <Label htmlFor="from-ccy" className="text-gray-300">
            From
          </Label>
          <Select value={fromCcy} onValueChange={setFromCcy} disabled={loadingCurrencies}>
            <SelectTrigger id="from-ccy" className="w-full bg-black/40 border-emerald-500/30 text-white">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-emerald-500/30">
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.code}
                  value={currency.code}
                  className="text-white hover:bg-emerald-500/20"
                >
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSwapCurrencies}
            className="rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30"
          >
            <ArrowDownUp className="w-5 h-5 text-emerald-400" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <Label htmlFor="to-ccy" className="text-gray-300">
            To
          </Label>
          <Select value={toCcy} onValueChange={setToCcy} disabled={loadingCurrencies}>
            <SelectTrigger id="to-ccy" className="w-full bg-black/40 border-emerald-500/30 text-white">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-emerald-500/30">
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.code}
                  value={currency.code}
                  className="text-white hover:bg-emerald-500/20"
                >
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-gray-300">
            Amount ({fromCcy})
          </Label>
          <Input
            id="amount"
            type="number"
            step="any"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-black/40 border-emerald-500/30 text-white placeholder:text-gray-500"
          />
        </div>

        {/* Rate Type */}
        <div className="space-y-2">
          <Label className="text-gray-300">Rate Type</Label>
          <RadioGroup
            value={rateType}
            onValueChange={(value) => setRateType(value as "fixed" | "float")}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed" className="text-gray-300 cursor-pointer">
                Fixed Rate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="float" id="float" />
              <Label htmlFor="float" className="text-gray-300 cursor-pointer">
                Float Rate
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Destination Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-300">
            Destination Address
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter address where you want to receive funds"
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
            className="bg-black/40 border-emerald-500/30 text-white placeholder:text-gray-500 font-mono text-sm"
          />
        </div>

        {/* Get Quote Button */}
        <Button
          onClick={handleGetQuote}
          disabled={isLoading || externalLoading || !amount || !addressTo}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Getting Quote...
            </>
          ) : (
            "Get Quote"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
