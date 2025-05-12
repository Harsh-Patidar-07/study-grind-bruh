
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Only import available button components
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/elevated-button';

const materialButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap gap-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        filled: "bg-md-primary text-md-on-primary hover:opacity-90",
        outlined: "border border-md-outline text-md-primary hover:bg-md-primary/10",
        text: "text-md-primary hover:bg-md-primary/10",
        elevated: "bg-md-surface text-md-primary shadow-md hover:shadow-lg",
        tonal: "bg-md-secondary-container text-md-on-secondary-container hover:opacity-90",
      },
      size: {
        default: "text-base py-2 px-4 rounded-full",
        sm: "text-sm py-1.5 px-3 rounded-full",
        lg: "text-lg py-2.5 px-5 rounded-full",
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
    // Map variants to the correct component names based on available imports
    const Tag = React.useMemo(() => {
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
    }, [variant]);

    return React.createElement(Tag, {
      ref: ref,
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
