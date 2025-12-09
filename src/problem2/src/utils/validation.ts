export const validateAmount = (
  value: string,
  balance?: string
): string | null => {
  if (!value || value.trim() === "") {
    return null;
  }

  const normalizedValue = value.includes("e")
    ? Number(value).toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: 18,
      })
    : value;

  const cleanValue = normalizedValue.replace(/[^0-9.]/g, "");
  if (cleanValue !== normalizedValue) {
    return "Only numbers are allowed";
  }

  const num = Number(value);

  if (num <= 0) {
    return "Amount must be greater than 0";
  }

  if (balance) {
    const balanceNum = Number(balance);
    if (!isNaN(balanceNum) && num > balanceNum) {
      return "Insufficient balance";
    }
  }

  return null;
};

export const sanitizeAmountInput = (
  value: string,
  maxDecimals: number = 18
): string => {
  const sanitized = value.replace(/[^0-9.]/g, "");
  const parts = sanitized.split(".");
  const integer = parts[0];
  const decimal = parts[1]?.slice(0, maxDecimals);

  if (parts.length > 1) {
    return `${integer}.${decimal ?? ""}`;
  }
  return integer;
};

export const formatDisplayValue = (value: string): string => {
  if (!value || value === "") return "";
  if (!value.includes("e")) return value;

  const num = Number(value);
  if (isNaN(num)) return value;

  return num.toLocaleString("en-US", {
    useGrouping: false,
    maximumFractionDigits: 18,
  });
};
