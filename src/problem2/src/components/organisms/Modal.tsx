import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closable?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closable = true,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closable ? onClose : undefined}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[20px] w-full max-w-md p-6 shadow-2xl"
          >
            {closable && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-light-200 transition-colors"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="text-2xl text-brand-500/50 hover:text-brand-500"
                />
              </button>
            )}

            {title && (
              <h2 className="text-xl font-bold text-brand-500 mb-4 pr-8">
                {title}
              </h2>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
