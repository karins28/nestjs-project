import { BooksContainer } from './components/BooksContainer'
import './App.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './apis/queryClient'
import { SnackbarProvider } from 'notistack'

function App() {

  return (
        <QueryClientProvider client={queryClient}>
              <SnackbarProvider maxSnack={3}>
      <div className="App"></div>
        <BooksContainer />
        </SnackbarProvider>
        </QueryClientProvider>
  )
}

export default App
