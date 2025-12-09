interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`
        ${sizeMap[size]}
        border-brand-200 border-t-accent-orange
        rounded-full animate-spin
        ${className}
      `}
    />
  );
};

