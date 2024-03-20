import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
