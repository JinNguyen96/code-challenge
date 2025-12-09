import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  fromTokenAtom,
  toTokenAtom,
  fromAmountAtom,
  toAmountAtom,
  activeInputAtom,
  isConfirmModalOpenAtom,
  isResultModalOpenAtom,
  swapResultAtom,
  isSwappingAtom,
} from "../store/atoms";
import { EActiveInput, ESwapResult, type Token } from "../types";
import { calculateSwapAmount } from "../utils/calculateSwap";
import { formatDisplayValue } from "../utils/validation";

const formatCalculatedAmount = (
  amount: string,
  from: Token | null,
  to: Token | null,
  isReceive: boolean
): string => {
  if (!from || !to || !amount) return "";
  const calculated = calculateSwapAmount(amount, from, to, isReceive);
  return calculated !== null ? formatDisplayValue(calculated.toString()) : "";
};

export const useSwap = () => {
  const [fromToken, setFromToken] = useAtom(fromTokenAtom);
  const [toToken, setToToken] = useAtom(toTokenAtom);
  const [fromAmount, setFromAmount] = useAtom(fromAmountAtom);
  const [toAmount, setToAmount] = useAtom(toAmountAtom);
  const [activeInput, setActiveInput] = useAtom(activeInputAtom);
  const [swapResult, setSwapResult] = useAtom(swapResultAtom);

  const setIsConfirmOpen = useSetAtom(isConfirmModalOpenAtom);
  const setIsResultOpen = useSetAtom(isResultModalOpenAtom);
  const setIsSwapping = useSetAtom(isSwappingAtom);

  const recalculateAmounts = useCallback(
    (
      sourceAmount: string,
      from: Token | null,
      to: Token | null,
      isFromInput: boolean
    ) => {
      const targetAmount = formatCalculatedAmount(
        sourceAmount,
        from,
        to,
        isFromInput
      );
      if (isFromInput) {
        setToAmount(targetAmount);
      } else {
        setFromAmount(targetAmount);
      }
    },
    [setFromAmount, setToAmount]
  );

  const handleAmountChange = useCallback(
    (inputType: EActiveInput) => (value: string) => {
      const isFromInput = inputType === EActiveInput.FROM;
      if (isFromInput) {
        setFromAmount(value);
      } else {
        setToAmount(value);
      }
      setActiveInput(inputType);
      recalculateAmounts(value, fromToken, toToken, isFromInput);
    },
    [
      fromToken,
      toToken,
      setFromAmount,
      setToAmount,
      setActiveInput,
      recalculateAmounts,
    ]
  );

  const handleTokenSelect = useCallback(
    (inputType: EActiveInput) => (token: Token) => {
      const isFromToken = inputType === EActiveInput.FROM;
      const newFromToken = isFromToken ? token : fromToken;
      const newToToken = isFromToken ? toToken : token;

      if (isFromToken) {
        setFromToken(token);
      } else {
        setToToken(token);
      }

      const isFromActive = activeInput === EActiveInput.FROM;
      const sourceAmount = isFromActive ? fromAmount : toAmount;

      if (sourceAmount && newFromToken && newToToken) {
        recalculateAmounts(
          sourceAmount,
          newFromToken,
          newToToken,
          isFromActive
        );
      }
    },
    [
      activeInput,
      fromAmount,
      toAmount,
      fromToken,
      toToken,
      setFromToken,
      setToToken,
      recalculateAmounts,
    ]
  );

  const handleFlip = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setActiveInput(
      activeInput === EActiveInput.FROM ? EActiveInput.TO : EActiveInput.FROM
    );
  }, [
    fromToken,
    fromAmount,
    toToken,
    toAmount,
    activeInput,
    setFromToken,
    setToToken,
    setFromAmount,
    setToAmount,
    setActiveInput,
  ]);

  const handleSwapClick = useCallback(() => {
    setIsConfirmOpen(true);
  }, [setIsConfirmOpen]);

  const handleConfirmSwap = useCallback(async () => {
    setIsSwapping(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const isSuccess = Math.random() > 0.5;
    setSwapResult(isSuccess ? ESwapResult.SUCCESS : ESwapResult.FAILED);
    setIsSwapping(false);
    setIsConfirmOpen(false);
    setIsResultOpen(true);
  }, [setIsSwapping, setSwapResult, setIsConfirmOpen, setIsResultOpen]);

  const handleConfirmClose = useCallback(() => {
    setIsConfirmOpen(false);
  }, [setIsConfirmOpen]);

  const handleResultClose = useCallback(() => {
    setIsResultOpen(false);
    if (swapResult === ESwapResult.SUCCESS) {
      setFromAmount("");
      setToAmount("");
    }
    setSwapResult(null);
  }, [swapResult, setIsResultOpen, setFromAmount, setToAmount, setSwapResult]);

  return {
    handleAmountChange,
    handleTokenSelect,
    handleFlip,
    handleSwapClick,
    handleConfirmSwap,
    handleConfirmClose,
    handleResultClose,
  };
};
