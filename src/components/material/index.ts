// Import Material Web Components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/elevated-button.js';
import '@material/web/button/tonal-button.js';
import '@material/web/icon-button/filled-icon-button.js';
import '@material/web/icon-button/outlined-icon-button.js';
import '@material/web/icon-button/standard-icon-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/switch/switch.js';
import '@material/web/radio/radio.js';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/filled-select.js';
import '@material/web/select/outlined-select.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';
import '@material/web/ripple/ripple.js';
import '@material/web/elevation/elevation.js';
import '@material/web/divider/divider.js';
import '@material/web/fab/fab.js';
import '@material/web/progress/circular-progress.js';
import '@material/web/progress/linear-progress.js';
import '@material/web/dialog/dialog.js';
import '@material/web/chip/assist-chip.js';
import '@material/web/chip/filter-chip.js';
import '@material/web/chip/input-chip.js';
import '@material/web/chip/suggestion-chip.js';

// Now let's add the React JSX intrinsics declaration to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': any;
      'md-outlined-button': any;
      'md-text-button': any;
      'md-elevated-button': any;
      'md-tonal-button': any;
      'md-filled-icon-button': any;
      'md-outlined-icon-button': any;
      'md-standard-icon-button': any;
      'md-filled-select': any;
      'md-outlined-select': any;
      'md-menu': any;
      'md-menu-item': any;
      'md-switch': any;
      'md-checkbox': any;
      'md-radio': any;
      'md-tabs': any;
      'md-primary-tab': any;
      'md-filled-text-field': any;
      'md-outlined-text-field': any;
      'md-list': any;
      'md-list-item': any;
      'md-icon': any;
      'md-ripple': any;
      'md-elevation': any;
      'md-divider': any;
      'md-fab': any;
      'md-circular-progress': any;
      'md-linear-progress': any;
      'md-dialog': any;
      'md-assist-chip': any;
      'md-filter-chip': any;
      'md-input-chip': any;
      'md-suggestion-chip': any;
    }
  }
}

// Export Material React Components
export * from './material-button';
export * from './material-icon-button';
export * from './material-switch';
export * from './material-text-field';
