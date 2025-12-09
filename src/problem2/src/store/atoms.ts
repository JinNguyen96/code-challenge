import { atom } from "jotai";
import type { Token } from "../types";
import { EActiveInput, ESwapResult } from "../types";
import { calculateExchangeRate } from "../utils";

export const fromTokenAtom = atom<Token | null>(null);
export const toTokenAtom = atom<Token | null>(null);
export const fromAmountAtom = atom<string>("");
export const toAmountAtom = atom<string>("");
export const fromErrorAtom = atom<string | null>(null);
export const toErrorAtom = atom<string | null>(null);
export const activeInputAtom = atom<EActiveInput>(EActiveInput.FROM);
export const isConfirmModalOpenAtom = atom<boolean>(false);
export const isResultModalOpenAtom = atom<boolean>(false);
export const swapResultAtom = atom<ESwapResult | null>(null);
export const isSwappingAtom = atom<boolean>(false);

export const exchangeRateAtom = atom<string | null>((get) => {
  const fromToken = get(fromTokenAtom);
  const toToken = get(toTokenAtom);
  if (!fromToken || !toToken) return null;

  const rate = calculateExchangeRate(fromToken, toToken);
  if (rate === null) return null;

  const displayRate = rate.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  return `1 ${fromToken.currency} = ${displayRate} ${toToken.currency}`;
});
