import { TokenIcon } from "../atoms/TokenIcon";
import { formatNumber, formatCurrency } from "../../utils/format";
import { ETokenSize, type Token } from "../../types";

interface TokenAmountDisplayProps {
  label: string;
  token: Token;
  amount: number | string;
  fiatValue: number;
}

export const TokenAmountDisplay = ({
  label,
  token,
  amount,
  fiatValue,
}: TokenAmountDisplayProps) => {
  const displayAmount =
    typeof amount === "number" ? formatNumber(amount) : formatNumber(amount);

  return (
    <div className="bg-light-200 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-brand-500/50 text-xs sm:text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <TokenIcon symbol={token.currency} size={ETokenSize.LG} className="shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-brand-500 text-lg sm:text-xl font-bold truncate flex-1 min-w-0">
              {displayAmount}
            </span>
            <span className="text-brand-500 text-lg sm:text-xl font-bold truncate max-w-[200px]">
              {token.currency}
            </span>
          </div>
          <div className="text-brand-500/50 text-xs sm:text-sm truncate">
            ≈ {formatCurrency(fiatValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

