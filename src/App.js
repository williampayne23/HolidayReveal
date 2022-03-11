import './App.css';
import RevealList from './Components/RevealList';
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RevealList />
    {/* <ReactQueryDevtools initialIsOpen/> */}
    </QueryClientProvider>
  );
}

export default App