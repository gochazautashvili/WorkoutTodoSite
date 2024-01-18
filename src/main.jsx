import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WorkoutContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
