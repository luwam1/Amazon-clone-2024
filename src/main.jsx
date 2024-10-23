import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DataProvider from './Componenets/DataProvider/DataProvider.jsx'
// import './index.css'
import {initialState ,reducer} from "./Utility/reducer.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
