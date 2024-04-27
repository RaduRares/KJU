import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from "./reducer";

// Găsește elementul root din DOM
const rootElement = document.getElementById("root");
// Creează un root
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

// Dacă vrei să începi să măsori performanța în aplicația ta, trece o funcție
// pentru a loga rezultatele (de exemplu: reportWebVitals(console.log))
// sau trimite către un endpoint de analytics. Află mai multe: https://bit.ly/CRA-vitals
