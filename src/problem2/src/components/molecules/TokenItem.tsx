import { useCallback } from "react";
import { Icon } from "@iconify/react";
import { TokenIcon } from "../atoms/TokenIcon";
import { ETokenSize } from "../../types";

interface TokenItemProps {
  currency: string;
  price: number;
  isSelected: boolean;
  onSelect: (currency: string, price: number) => void;
}

export const TokenItem = ({
  currency,
  price,
  isSelected,
  onSelect,
}: TokenItemProps) => {
  const handleClick = useCallback(() => {
    onSelect(currency, price);
  }, [currency, price, onSelect]);

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 p-3 transition-colors ${
        isSelected
          ? "bg-brand-500/10 border-l-2 border-brand-500"
          : "hover:bg-light-200"
      }`}
    >
      <TokenIcon symbol={currency} size={ETokenSize.SM} />
      <div className="text-left flex-1">
        <div
          className={`font-medium text-sm ${
            isSelected ? "text-brand-500 font-semibold" : "text-brand-500"
          }`}
        >
          {currency}
        </div>
        <div className="text-brand-500/50 text-xs">${price.toFixed(4)}</div>
      </div>
      {isSelected && (
        <Icon icon="solar:check-circle-bold" className="text-brand-500" />
      )}
    </button>
  );
};
