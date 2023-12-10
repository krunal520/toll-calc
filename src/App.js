import './App.css';
import TollCalc from './components/TollCalc';
import { ChakraProvider } from '@chakra-ui/react';
    

function App() {
  return (
    <>
    <ChakraProvider>
    <div>
      <TollCalc />
    </div>
    </ChakraProvider>
    </>
  );
}

export default App;
