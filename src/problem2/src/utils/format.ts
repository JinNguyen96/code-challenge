const toFixedWithoutScientific = (num: number): string => {
  const str = num.toString();
  if (!str.includes("e")) return str;

  const [base, exp] = num.toString().split("e");
  const expNum = parseInt(exp);
  const baseNum = Number(base);

  if (expNum >= 0) {
    const shifted = baseNum * Math.pow(10, expNum);
    return shifted.toFixed(expNum);
  }
  return str;
};

export const formatNumber = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (!num || isNaN(num)) return "0";
  if (num < 0.000001) return "< 0.000001";

  return toFixedWithoutScientific(num).replace(/\.?0+$/, "");
};

export const formatCurrency = (
  value: number | string,
  decimals: number = 2
): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (!num || isNaN(num)) return "$0.00";
  if (num < 0.01) return "< $0.01";
  return `$${num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
};
