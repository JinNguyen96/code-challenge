import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { EButtonVariant } from "../../types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EButtonVariant;
  children: ReactNode;
  isSkew?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const beforeClasses = `
  absolute inset-0 -skew-x-[24deg] rounded
  transition-all duration-200
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = EButtonVariant.PRIMARY,
      children,
      isSkew = true,
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const stateStyle =
      "active:scale-90 cursor-pointer transition-all duration-200";
    const disableStyle =
      "hover:skew-0 active:scale-100 cursor-not-allowed !grayscale opacity-50";
    const widthClass = fullWidth ? "w-full" : "w-fit";
    const loadingClass = isLoading ? disableStyle : "";
    const disabledClass = disabled ? disableStyle : "";

    const combinedClassName =
      `${widthClass} ${stateStyle} ${loadingClass} ${disabledClass} ${className}`.trim();

    const getPrimaryBg = () => {
      if (disabled) return "bg-gray-400";
      return "bg-gradient-to-l from-accent-orange to-accent-gold";
    };

    return (
      <div className={`${widthClass} animate-slide-in`}>
        <button
          className={`
            relative
            max-h-12 lg:max-h-full
            lg:h-fit
            inline-flex items-center justify-center
            py-3 px-6 sm:py-4 sm:px-14
            ${
              variant === EButtonVariant.PRIMARY
                ? "text-white"
                : "text-brand-500"
            }
            ${
              isSkew && variant !== EButtonVariant.TONER
                ? "hover:-skew-x-6"
                : ""
            }
            ${variant === EButtonVariant.TONER && disabled ? "bg-gray-200" : ""}
            ${combinedClassName}
            outline-none
            group
          `}
          disabled={disabled || isLoading}
          type={type}
          ref={ref}
          {...rest}
        >
          {variant === EButtonVariant.PRIMARY && (
            <div
              className={`${beforeClasses} ${getPrimaryBg()}`}
              style={{
                boxShadow:
                  "0 -2px 1px 0px #F14307 inset, 0 2px 1px 0px #FFFFFF inset, 0 4px 4px 0px rgba(0,0,0,.25)",
              }}
            />
          )}
          {variant === EButtonVariant.SECONDARY && (
            <div
              className={`${beforeClasses} ${
                disabled ? "bg-gray-200" : "bg-white"
              }`}
            />
          )}

          {isLoading && (
            <div className="w-0.5 relative flex items-center">
              <span className="absolute end-0 w-4 h-4 border-2 border-t-transparent border-white rounded-full me-2 animate-spin" />
            </div>
          )}
          {!isLoading && leftIcon && (
            <span className="mr-2 flex items-center relative z-10">
              {leftIcon}
            </span>
          )}
          <div
            className={variant !== EButtonVariant.TONER ? "relative z-10" : ""}
          >
            {children}
          </div>
          {!isLoading && rightIcon && (
            <span className="ml-2 flex items-center relative z-10">
              {rightIcon}
            </span>
          )}
        </button>
      </div>
    );
  }
);

Button.displayName = "Button";
