import "./App.css";
import { RootRouter } from "./components/RootRoute";
import { useLoginCheck } from "./hooks/useLoginCheck";
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import '@fontsource/cardo/400.css'
import '@fontsource/cardo/700.css'

const App = () => {
  useLoginCheck();

  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <RootRouter />
      </ChakraProvider>
    </div >
  )
}

export default App
