import { Icon } from "@iconify/react";
import { useAtom, useAtomValue } from "jotai";
import { useSwap } from "../../hooks";
import { EActiveInput, EButtonVariant } from "../../types";
import {
  fromTokenAtom,
  toTokenAtom,
  fromAmountAtom,
  toAmountAtom,
  fromErrorAtom,
  toErrorAtom,
  activeInputAtom,
  isConfirmModalOpenAtom,
  isResultModalOpenAtom,
  swapResultAtom,
  isSwappingAtom,
  exchangeRateAtom,
} from "../../store/atoms";
import { SwapCard } from "../molecules/SwapCard";
import { Button } from "../atoms/Button";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { ConfirmModal } from "./ConfirmModal";
import { ResultModal } from "./ResultModal";
import { tokenPricesAtom } from "../../store";

export const SwapForm = () => {
  const fromToken = useAtomValue(fromTokenAtom);
  const toToken = useAtomValue(toTokenAtom);
  const fromAmount = useAtomValue(fromAmountAtom);
  const toAmount = useAtomValue(toAmountAtom);
  const [fromError, setFromError] = useAtom(fromErrorAtom);
  const [toError, setToError] = useAtom(toErrorAtom);
  const activeInput = useAtomValue(activeInputAtom);
  const isConfirmOpen = useAtomValue(isConfirmModalOpenAtom);
  const isResultOpen = useAtomValue(isResultModalOpenAtom);
  const swapResult = useAtomValue(swapResultAtom);
  const isSwapping = useAtomValue(isSwappingAtom);
  const { isLoading: isPricesLoading } = useAtomValue(tokenPricesAtom);
  const exchangeRate = useAtomValue(exchangeRateAtom);

  const isValidSwap =
    fromToken &&
    toToken &&
    fromAmount &&
    Number(fromAmount) > 0 &&
    !fromError &&
    !toError;

  const {
    handleAmountChange,
    handleTokenSelect,
    handleFlip,
    handleSwapClick,
    handleConfirmSwap,
    handleConfirmClose,
    handleResultClose,
  } = useSwap();

  if (isPricesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-lg mx-auto space-y-2 animate-slide-up">
        <div className="relative">
          <SwapCard
            label="You send"
            token={fromToken}
            onTokenSelect={handleTokenSelect(EActiveInput.FROM)}
            excludeToken={toToken}
            amount={fromAmount}
            onAmountChange={handleAmountChange(EActiveInput.FROM)}
            error={fromError}
            onErrorChange={setFromError}
            showMax
            isActive={activeInput === EActiveInput.FROM}
          />

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 z-10">
            <button
              onClick={handleFlip}
              className="bg-white p-2 rounded-xl border-4 border-light-200 hover:bg-light-100 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Icon
                icon="solar:transfer-vertical-outline"
                className="text-brand-500 text-xl"
              />
            </button>
          </div>
        </div>

        <SwapCard
          label="You receive"
          token={toToken}
          onTokenSelect={handleTokenSelect(EActiveInput.TO)}
          excludeToken={fromToken}
          amount={toAmount}
          onAmountChange={handleAmountChange(EActiveInput.TO)}
          error={toError}
          onErrorChange={setToError}
          showMax={false}
          isActive={activeInput === EActiveInput.TO}
        />

        {fromToken && toToken && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm text-brand-500/70 bg-light-200 rounded-2xl p-3 animate-fade-in">
            <Icon
              icon="solar:refresh-outline"
              className="text-base sm:text-lg"
            />
            <span>{exchangeRate}</span>
          </div>
        )}

        <Button
          variant={EButtonVariant.PRIMARY}
          fullWidth
          onClick={handleSwapClick}
          disabled={!isValidSwap}
        >
          <b className="text-sm sm:text-base lg:text-xl text-white">Swap</b>
        </Button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleConfirmClose}
        onConfirm={handleConfirmSwap}
        fromToken={fromToken}
        toToken={toToken}
        amount={fromAmount}
        isLoading={isSwapping}
      />

      <ResultModal
        isOpen={isResultOpen}
        onClose={handleResultClose}
        result={swapResult}
      />
    </>
  );
};
