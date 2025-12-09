import { useMemo, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { TokenDropdown } from "./TokenDropdown";
import { formatCurrency } from "../../utils/format";
import {
  validateAmount,
  sanitizeAmountInput,
  formatDisplayValue,
} from "../../utils/validation";
import { calculateFiatValue } from "../../utils/calculateSwap";
import { EButtonVariant, type Token } from "../../types";

interface SwapCardProps {
  label: string;
  token: Token | null;
  onTokenSelect: (token: Token) => void;
  excludeToken: Token | null;
  amount: string;
  onAmountChange: (value: string) => void;
  error: string | null;
  onErrorChange: (error: string | null) => void;
  balance?: string;
  disabled?: boolean;
  showMax?: boolean;
  isActive?: boolean;
}

export const SwapCard = ({
  label,
  token,
  onTokenSelect,
  excludeToken,
  amount,
  onAmountChange,
  error,
  onErrorChange,
  balance = "1000",
  disabled = false,
  showMax = true,
  isActive = false,
}: SwapCardProps) => {
  const validationError = useMemo(() => {
    if (!token) return null;
    return showMax ? validateAmount(amount, balance) : validateAmount(amount);
  }, [amount, balance, showMax, token]);

  useEffect(() => {
    onErrorChange(validationError);
  }, [validationError, onErrorChange]);

  const fiatValue = useMemo(
    () => calculateFiatValue(amount, token),
    [amount, token]
  );

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeAmountInput(e.target.value);
      onAmountChange(sanitized);
    },
    [onAmountChange]
  );

  const handleClear = useCallback(() => {
    onAmountChange("");
  }, [onAmountChange]);

  const handleMax = useCallback(() => {
    onAmountChange(balance);
  }, [onAmountChange, balance]);

  const ringClasses = error
    ? "ring-accent-error"
    : isActive
    ? "ring-brand-200"
    : "ring-transparent hover:ring-brand-200";

  const showClearButton = amount && Number(amount) > 0;

  return (
    <div
      className={`bg-light-200 rounded-2xl p-3 ring-2 transition-all ${ringClasses}`}
    >
      <div className="flex items-center justify-between mb-3 h-6">
        <span className="text-brand-500 text-xs sm:text-sm font-medium">
          {label}
        </span>
        <div
          className={`flex items-center gap-1.5 text-xs sm:text-sm ${
            showMax && token ? "visible" : "hidden"
          }`}
        >
          <span className="text-brand-500/50 truncate">
            Balance: {balance} {token?.currency || ""}
          </span>
          <Button
            variant={EButtonVariant.TONER}
            isSkew={false}
            className="bg-brand-500 text-white text-xs rounded-full !px-2 !py-0.5"
            onClick={handleMax}
            disabled={disabled}
          >
            Max
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 min-w-0 overflow-hidden">
          <Input
            type="text"
            inputMode="decimal"
            value={formatDisplayValue(amount)}
            onChange={handleAmountChange}
            placeholder="0.0"
            disabled={disabled}
            className={`text-xl sm:text-2xl font-bold ${
              error ? "!text-accent-error" : ""
            }`}
          />
          <p
            className={`text-xs sm:text-sm mt-1 truncate ${
              amount && Number(amount) > 0
                ? "text-brand-500/70"
                : "text-brand-500/30"
            }`}
          >
            {fiatValue ? formatCurrency(fiatValue) : "$0.00"}
          </p>
        </div>

        <Icon
          icon="solar:close-circle-bold"
          className={`text-lg sm:text-xl cursor-pointer transition-colors shrink-0 ${
            showClearButton
              ? "text-brand-500/30 hover:text-brand-500/50"
              : "text-transparent pointer-events-none"
          }`}
          onClick={handleClear}
        />

        <TokenDropdown
          selectedToken={token}
          onSelect={onTokenSelect}
          excludeToken={excludeToken}
        />
      </div>

      <p
        className={`text-xs mt-2 h-4 ${
          error ? "text-accent-error" : "text-transparent"
        }`}
      >
        {error || ""}
      </p>
    </div>
  );
};
