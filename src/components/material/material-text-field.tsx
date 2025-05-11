
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const materialTextFieldVariants = cva(
  "w-full transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled: "",
        outlined: "",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "default",
    },
  }
);

export interface MaterialTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof materialTextFieldVariants> {
  label?: string;
  supportingText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: boolean;
  required?: boolean;
}

const MaterialTextField = React.forwardRef<HTMLElement, MaterialTextFieldProps>(
  ({ 
    className, 
    variant, 
    size, 
    label,
    supportingText,
    leadingIcon,
    trailingIcon,
    disabled = false,
    error = false,
    required = false,
    value,
    defaultValue,
    onChange,
    type = "text",
    ...props 
  }, ref) => {
    const Tag = React.useMemo(() => {
      switch (variant) {
        case 'filled':
          return 'md-filled-text-field';
        default:
          return 'md-outlined-text-field';
      }
    }, [variant]);

    const handleValueChange = (e: Event) => {
      const target = e.target as HTMLElement & { 
        value: string;
      };
      
      if (onChange) {
        const syntheticEvent = {
          target: {
            value: target.value,
            name: props.name
          },
          currentTarget: {
            value: target.value,
            name: props.name
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(syntheticEvent);
      }
    };

    React.useEffect(() => {
      const textField = ref && 'current' in ref ? ref.current : null;
      
      if (textField) {
        textField.addEventListener('input', handleValueChange);
        
        return () => {
          textField.removeEventListener('input', handleValueChange);
        };
      }
    }, [ref, onChange]);

    // Update the value when it changes externally
    React.useEffect(() => {
      const textField = ref && 'current' in ref ? ref.current : null;
      
      if (textField && value !== undefined) {
        (textField as any).value = value as string;
      }
    }, [value, ref]);

    return React.createElement(Tag, {
      ref: ref,
      class: cn(materialTextFieldVariants({ variant, size, className })),
      label: label,
      type: type,
      disabled: disabled,
      error: error,
      required: required,
      value: value as string,
      defaultValue: defaultValue as string,
      ...(supportingText ? { 'supporting-text': supportingText } : {}),
      ...(leadingIcon ? { 'leading-icon': true } : {}),
      ...(trailingIcon ? { 'trailing-icon': true } : {}),
      ...props,
      children: [leadingIcon, trailingIcon].filter(Boolean)
    });
  }
);

MaterialTextField.displayName = "MaterialTextField";

export { MaterialTextField, materialTextFieldVariants };
