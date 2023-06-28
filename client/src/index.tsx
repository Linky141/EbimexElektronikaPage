import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/style.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Router';
import { Provider } from 'react-redux';
import { service } from './app/service/configureService';
import { ServiceProvider } from './app/context/ServiceContext';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  // <React.StrictMode>
    <ServiceProvider>
      <Provider store={service}>
        <RouterProvider router={router} />
      </Provider>
    </ServiceProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
