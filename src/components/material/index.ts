
// Import Material Web Components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/elevated-button.js';
import '@material/web/icon/icon.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/divider/divider.js';
import '@material/web/switch/switch.js';
import '@material/web/radio/radio.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/ripple/ripple.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/progress/circular-progress.js';

// Using proper Material Web icon button component imports
import '@material/web/icon-button/filled-icon-button.js';
import '@material/web/icon-button/outlined-icon-button.js';
import '@material/web/icon-button/icon-button.js';

// For app icons
import '@material/web/icon/icon.js';

// Now let's add the React JSX intrinsics declaration to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': any;
      'md-outlined-button': any;
      'md-text-button': any;
      'md-elevated-button': any;
      'md-tonal-button': any;
      'md-icon-button': any;
      'md-filled-icon-button': any;
      'md-outlined-icon-button': any;
      'md-tonal-icon-button': any;
      'md-switch': any;
      'md-filled-text-field': any;
      'md-outlined-text-field': any;
      'md-list': any;
      'md-list-item': any;
      'md-icon': any;
      'md-ripple': any;
      'md-divider': any;
      'md-checkbox': any;
      'md-radio': any;
      'md-tabs': any;
      'md-primary-tab': any;
      'md-circular-progress': any;
    }
  }
}

// Export Material Button Components
export * from './material-button';
export * from './material-icon-button';
export * from './material-switch';
export * from './material-text-field';
