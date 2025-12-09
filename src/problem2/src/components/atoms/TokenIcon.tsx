import { useState } from "react";
import { ETokenSize } from "../../types";

interface TokenIconProps {
  symbol: string;
  size?: ETokenSize;
  className?: string;
}

const sizeMap: Record<ETokenSize, string> = {
  [ETokenSize.SM]: "w-6 h-6",
  [ETokenSize.MD]: "w-8 h-8",
  [ETokenSize.LG]: "w-10 h-10",
};

export const TokenIcon = ({
  symbol,
  size = ETokenSize.MD,
  className = "",
}: TokenIconProps) => {
  const [hasError, setHasError] = useState(false);
  const iconUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;

  if (hasError) {
    return (
      <div
        className={`${sizeMap[size]} rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xs ${className}`}
      >
        {symbol.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={iconUrl}
      alt={symbol}
      className={`${sizeMap[size]} rounded-full object-contain ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

