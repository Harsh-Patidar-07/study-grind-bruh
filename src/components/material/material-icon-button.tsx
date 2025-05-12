
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const materialIconButtonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        standard: "",
        filled: "",
        outlined: "",
        tonal: "",
      },
      size: {
        default: "w-10 h-10",
        sm: "w-8 h-8",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "standard",
      size: "default",
    },
  }
);

export interface MaterialIconButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof materialIconButtonVariants> {
  disabled?: boolean;
  ariaLabel?: string;
  icon?: React.ReactNode;
}

const MaterialIconButton = React.forwardRef<HTMLElement, MaterialIconButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    disabled = false, 
    ariaLabel,
    icon,
    children,
    ...props 
  }, ref) => {
    // Map variants to the correct component names based on our available imports
    const Tag = React.useMemo(() => {
      switch (variant) {
        case 'filled':
          return 'md-filled-button'; // Using standard button types since icon-button variants might not exist
        case 'outlined':
          return 'md-outlined-button';
        case 'tonal':
          // Fallback to filled-button since tonal might not be available
          return 'md-filled-button';
        default:
          return 'md-icon-button';
      }
    }, [variant]);

    return React.createElement(Tag, {
      ref: ref,
      class: cn(materialIconButtonVariants({ variant, size, className })),
      disabled: disabled,
      'aria-label': ariaLabel,
      ...props,
      children: [icon, children].filter(Boolean)
    });
  }
);

MaterialIconButton.displayName = "MaterialIconButton";

export { MaterialIconButton, materialIconButtonVariants };
