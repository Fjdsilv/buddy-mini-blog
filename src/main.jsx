import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import { store } from './store.jsx';
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider 
      clientId="220408406287-o6fd04kp9bjmrgs4412j4nk2dvqatqdi.apps.googleusercontent.com"
      >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  // </React.StrictMode>,
)


//220408406287-o6fd04kp9bjmrgs4412j4nk2dvqatqdi.apps.googleusercontent.com
