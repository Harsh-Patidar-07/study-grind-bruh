
// Import Material Web Components
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/elevated-button';
// Note: If tonal-button isn't available, we'll use the standard buttons instead
import '@material/web/icon/icon';
import '@material/web/ripple/ripple';
import '@material/web/checkbox/checkbox';
import '@material/web/switch/switch';
import '@material/web/radio/radio';
import '@material/web/tabs/tabs';
import '@material/web/tabs/primary-tab';
import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';
import '@material/web/divider/divider';

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
