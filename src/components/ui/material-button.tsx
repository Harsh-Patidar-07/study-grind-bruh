
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Import Material Web components
// Note: We need to ensure these get properly registered
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/elevated-button.js';
// Tonal button is imported from material/index.ts

const materialButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap gap-2 transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
        text: "",
        elevated: "",
        tonal: "",
      },
      size: {
        default: "",
        sm: "h-9 text-sm",
        lg: "h-11 text-base",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

export interface MaterialButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'type'>,
    VariantProps<typeof materialButtonVariants> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  trailingIcon?: React.ReactNode;
  hasIcon?: boolean;
}

const MaterialButton = React.forwardRef<HTMLElement, MaterialButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    disabled = false, 
    type = "button", 
    trailingIcon,
    hasIcon,
    children,
    ...props 
  }, ref) => {
    // Use string literals directly for the element type to avoid TypeScript errors
    const getButtonTag = () => {
      switch (variant) {
        case 'outlined':
          return 'md-outlined-button';
        case 'text':
          return 'md-text-button';
        case 'elevated':
          return 'md-elevated-button';
        case 'tonal':
          // Fallback to filled-button since tonal might not be available
          return 'md-filled-button';
        default:
          return 'md-filled-button';
      }
    };

    const Tag = getButtonTag();

    return React.createElement(Tag, {
      ref: ref as any,
      class: cn(materialButtonVariants({ variant, size, className })),
      disabled: disabled,
      type: type,
      ...(trailingIcon ? { 'trailing-icon': true } : {}),
      ...(hasIcon ? { 'has-icon': true } : {}),
      ...props,
      children
    });
  }
);

MaterialButton.displayName = "MaterialButton";

export { MaterialButton, materialButtonVariants };
