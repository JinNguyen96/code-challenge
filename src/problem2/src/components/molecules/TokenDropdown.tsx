import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAtomValue } from "jotai";
import { TokenIcon } from "../atoms/TokenIcon";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { TokenItem } from "./TokenItem";
import { tokenPricesAtom } from "../../store/queries";
import { ETokenSize, type Token } from "../../types";

interface TokenDropdownProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  excludeToken: Token | null;
}

export const TokenDropdown = ({
  selectedToken,
  onSelect,
  excludeToken,
}: TokenDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: tokens, isLoading, isError } = useAtomValue(tokenPricesAtom);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTokens = useMemo(() => {
    const filtered = tokens?.filter((t) => {
      if (excludeToken && t.currency === excludeToken.currency) return false;
      if (!search) return true;
      return t.currency.toLowerCase().includes(search.toLowerCase());
    });

    if (!filtered || !selectedToken) return filtered;

    return [...filtered].sort((a, b) => {
      if (a.currency === selectedToken.currency) return -1;
      if (b.currency === selectedToken.currency) return 1;
      return 0;
    });
  }, [tokens, excludeToken, search, selectedToken]);

  const handleTokenSelect = useCallback(
    (currency: string, price: number) => {
      onSelect({ currency, price });
      setIsOpen(false);
      setSearch("");
    },
    [onSelect]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full transition-all bg-white text-brand-500 border border-brand-200"
      >
        {selectedToken ? (
          <>
            <TokenIcon symbol={selectedToken.currency} size={ETokenSize.SM} />
            <span className="font-medium text-sm sm:text-base">
              {selectedToken.currency}
            </span>
          </>
        ) : (
          <span className="font-medium text-sm sm:text-base">Select</span>
        )}
        <Icon
          icon="solar:alt-arrow-down-outline"
          className={`transition-transform text-sm sm:text-base ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-light-300">
              <div className="relative">
                <Icon
                  icon="solar:magnifer-outline"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500/50"
                />
                <input
                  type="text"
                  placeholder="Search token..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-light-200 rounded-xl text-brand-500 outline-none placeholder:text-brand-500/30 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : isError ? (
                <div className="text-center py-8 text-accent-error text-sm">
                  Failed to load tokens
                </div>
              ) : filteredTokens?.length === 0 ? (
                <div className="text-center py-8 text-brand-500/50 text-sm">
                  No tokens found
                </div>
              ) : (
                filteredTokens?.map((t) => (
                  <TokenItem
                    key={t.currency}
                    currency={t.currency}
                    price={t.price}
                    isSelected={selectedToken?.currency === t.currency}
                    onSelect={handleTokenSelect}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
