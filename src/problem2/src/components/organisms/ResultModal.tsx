import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Modal } from "./Modal";
import { Button } from "../atoms/Button";
import { EButtonVariant, ESwapResult } from "../../types";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ESwapResult | null;
}

export const ResultModal = ({ isOpen, onClose, result }: ResultModalProps) => {
  const isSuccess = result === ESwapResult.SUCCESS;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            isSuccess ? "bg-accent-success/10" : "bg-accent-error/10"
          }`}
        >
          <Icon
            icon={
              isSuccess ? "solar:check-circle-bold" : "solar:close-circle-bold"
            }
            className={`text-5xl ${
              isSuccess ? "text-accent-success" : "text-accent-error"
            }`}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-2xl font-bold mb-2 ${
            isSuccess ? "text-accent-success" : "text-accent-error"
          }`}
        >
          {isSuccess ? "Swap Successful!" : "Swap Failed"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-brand-500/70 mb-6"
        >
          {isSuccess
            ? "Your tokens have been swapped successfully."
            : "Something went wrong. Please try again."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <Button variant={EButtonVariant.PRIMARY} onClick={onClose} fullWidth>
            <span className="text-white font-bold">
              {isSuccess ? "Done" : "Try Again"}
            </span>
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
};
