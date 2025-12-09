import { atomWithQuery } from "jotai-tanstack-query";
import type { PriceData } from "../types";

export const tokenPricesAtom = atomWithQuery(() => ({
  queryKey: ["tokenPrices"],
  queryFn: async (): Promise<PriceData[]> => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (!response.ok) {
      throw new Error("Failed to fetch token prices");
    }
    const data: PriceData[] = await response.json();

    const priceMap = new Map<string, PriceData>();
    data.forEach((item) => {
      if (item.price && item.price > 0) {
        const existing = priceMap.get(item.currency);
        if (!existing || new Date(item.date) > new Date(existing.date)) {
          priceMap.set(item.currency, item);
        }
      }
    });

    return Array.from(priceMap.values()).sort((a, b) =>
      a.currency.localeCompare(b.currency)
    );
  },
  staleTime: 60 * 1000,
  refetchOnWindowFocus: true,
  retry: 3,
}));
