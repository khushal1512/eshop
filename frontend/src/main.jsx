import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import Store from "./redux/store.js"; 

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>
    
  // <StrictMode/>
)



// createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//     <App />
//   // <StrictMode/>
// )