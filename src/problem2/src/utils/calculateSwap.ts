import type { Token } from "../types";

export const calculateExchangeRate = (
  fromToken: Token | null,
  toToken: Token | null
): number | null => {
  if (!fromToken || !toToken || fromToken.price === 0 || toToken.price === 0)
    return null;
  return fromToken.price / toToken.price;
};

export const calculateSwapAmount = (
  amount: string,
  fromToken: Token | null,
  toToken: Token | null,
  isReceive: boolean
): number | null => {
  const num = Number(amount);
  if (isNaN(num) || num <= 0) return null;

  const rate = calculateExchangeRate(fromToken, toToken);
  if (rate === null) return null;

  return isReceive ? num * rate : num / rate;
};

export const calculateFiatValue = (
  amount: string,
  token: Token | null
): number | null => {
  if (!token) return null;
  const num = Number(amount);
  if (isNaN(num) || num <= 0) return null;
  return num * token.price;
};
