import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Don't import here since we're importing in the index.ts
// import '@material/web/button/filled-button.js';
// import '@material/web/button/outlined-button.js';
// import '@material/web/button/text-button.js';
// import '@material/web/button/elevated-button.js';

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
        sm: "text-sm",
        lg: "text-base",
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
    const Tag = React.useMemo(() => {
      switch (variant) {
        case 'outlined':
          return 'md-outlined-button';
        case 'text':
          return 'md-text-button';
        case 'elevated':
          return 'md-elevated-button';
        case 'tonal':
          return 'md-tonal-button';
        default:
          return 'md-filled-button';
      }
    }, [variant]);

    return (
      <Tag
        ref={ref as any}
        class={cn(materialButtonVariants({ variant, size, className }))}
        disabled={disabled}
        type={type}
        {...(trailingIcon ? { 'trailing-icon': true } : {})}
        {...(hasIcon ? { 'has-icon': true } : {})}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

MaterialButton.displayName = "MaterialButton";

export { MaterialButton, materialButtonVariants };
