
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MaterialSwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  icons?: boolean;
  selected?: boolean;
}

const MaterialSwitch = React.forwardRef<HTMLElement, MaterialSwitchProps>(
  ({ 
    className, 
    checked, 
    defaultChecked,
    onChange,
    disabled = false,
    icons = false,
    selected,
    ...props 
  }, ref) => {
    const handleChange = (e: Event) => {
      const target = e.target as HTMLElement & { selected: boolean };
      if (onChange) {
        onChange(target.selected);
      }
    };

    React.useEffect(() => {
      const switchElement = ref && 'current' in ref ? ref.current : null;
      
      if (switchElement) {
        // Add change event listener
        switchElement.addEventListener('change', handleChange);
        
        // Cleanup
        return () => {
          switchElement.removeEventListener('change', handleChange);
        };
      }
    }, [ref, onChange]);

    // Update the selected state when checked changes
    React.useEffect(() => {
      const switchElement = ref && 'current' in ref ? ref.current : null;
      
      if (switchElement && checked !== undefined) {
        (switchElement as any).selected = checked;
      }
    }, [checked, ref]);

    return (
      <md-switch
        ref={ref as any}
        class={cn(className)}
        disabled={disabled}
        icons={icons}
        selected={selected ?? defaultChecked}
        {...props}
      />
    );
  }
);

MaterialSwitch.displayName = "MaterialSwitch";

export { MaterialSwitch };
