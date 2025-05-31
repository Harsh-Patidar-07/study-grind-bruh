import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Material Web components
import './components/material';

createRoot(document.getElementById("root")!).render(<App />);
