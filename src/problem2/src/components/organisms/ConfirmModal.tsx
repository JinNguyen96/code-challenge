import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "./Modal";
import { Button, InfoRow } from "../atoms";
import { TokenAmountDisplay } from "../molecules";
import { calculateSwapAmount } from "../../utils/calculateSwap";
import { EButtonVariant, type Token } from "../../types";
import { useAtomValue } from "jotai";
import { exchangeRateAtom } from "../../store/atoms";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromToken: Token | null;
  toToken: Token | null;
  amount: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  fromToken,
  toToken,
  amount,
  isLoading = false,
}: ConfirmModalProps) => {
  const exchangeRate = useAtomValue(exchangeRateAtom);
  const receiveAmount = useMemo(
    () => calculateSwapAmount(amount, fromToken, toToken, true),
    [amount, fromToken, toToken]
  );

  const sendFiat = useMemo(() => {
    if (!fromToken) return 0;
    return Number(amount) * fromToken.price;
  }, [amount, fromToken]);

  const receiveFiat = useMemo(() => {
    if (!receiveAmount || !toToken) return 0;
    return receiveAmount * toToken.price;
  }, [receiveAmount, toToken]);

  if (!fromToken || !toToken) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Swap"
      closable={!isLoading}
    >
      <div className="space-y-4">
        <TokenAmountDisplay
          label="You send"
          token={fromToken}
          amount={amount}
          fiatValue={sendFiat}
        />

        <div className="flex justify-center -mt-7 -mb-4 relative z-10">
          <div className="bg-accent-orange p-2 rounded-full">
            <Icon
              icon="solar:arrow-down-outline"
              className="text-white text-xl"
            />
          </div>
        </div>

        <TokenAmountDisplay
          label="You receive"
          token={toToken}
          amount={receiveAmount ?? 0}
          fiatValue={receiveFiat}
        />

        <div className="border-t border-light-300 pt-4 space-y-2">
          <InfoRow label="Exchange Rate" value={exchangeRate ?? ""} />
          <InfoRow label="Network Fee" value="~$0.50" />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant={EButtonVariant.SECONDARY}
            onClick={onClose}
            fullWidth
            disabled={isLoading}
          >
            <span className="text-brand-500 font-bold">Cancel</span>
          </Button>
          <Button
            variant={EButtonVariant.PRIMARY}
            onClick={onConfirm}
            fullWidth
            isLoading={isLoading}
          >
            <span className="text-white font-bold whitespace-nowrap">
              Confirm
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
