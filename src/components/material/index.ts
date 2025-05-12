
// Import Material Web Components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/elevated-button.js';
// Note: We don't import tonal-button because it's not available in the current version
import '@material/web/icon/icon.js';
import '@material/web/ripple/ripple.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/switch/switch.js';
import '@material/web/radio/radio.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/divider/divider.js';

// Now let's add the React JSX intrinsics declaration to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': any;
      'md-outlined-button': any;
      'md-text-button': any;
      'md-elevated-button': any;
      'md-icon': any;
      'md-ripple': any;
      'md-checkbox': any;
      'md-switch': any;
      'md-radio': any;
      'md-tabs': any;
      'md-primary-tab': any;
      'md-filled-text-field': any;
      'md-outlined-text-field': any;
      'md-divider': any;
    }
  }
}

// Export Material React Components
export * from './material-button';
export * from './material-icon-button';
export * from './material-switch';
export * from './material-text-field';
