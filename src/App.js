import './App.css';
import MapComponent from './components/Map';
import TollCalc from './components/TollCalc';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="TollCalc">
          <TollCalc />
        </div>
        <div className="MapComponent">
          <MapComponent />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
