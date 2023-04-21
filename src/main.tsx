import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import './index.css'

import LoadingSpinner from "./components/LoadingSpinner";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<LoadingSpinner />}
    />
  </React.StrictMode>,
);
