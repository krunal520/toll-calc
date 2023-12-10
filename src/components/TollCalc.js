// components/TollCalc.js
import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center } from '@chakra-ui/react';
import axios from 'axios';
import MapComponent from './Map';
import TollDetails from './TollDetails';

const TollCalc = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleCalculateRoutes = async () => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const apiUrl = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints';

      const response = await axios.post(apiUrl, {
        from: fromCity,
        to: toCity,
        vehicleType: '2AxlesAuto',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      const calculatedRoutes = response.data && response.data.routes;
      setRoutes(calculatedRoutes);
      setSelectedRoute(calculatedRoutes && calculatedRoutes[0]); // Select the first route by default
    } catch (error) {
      console.error('Error calculating routes:', error.message);
    }
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
  };

  return (
    <Center>
      <Box width="xl" p={4} borderWidth="1px" borderRadius="md">
        <FormControl mb={4}>
          <FormLabel>From City</FormLabel>
          <Input
            type="text"
            placeholder="Enter From City"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>To City</FormLabel>
          <Input
            type="text"
            placeholder="Enter To City"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleCalculateRoutes}>
          Calculate Routes
        </Button>

        {routes.length > 0 && (
          <>
            <MapComponent routes={routes} selectedRoute={selectedRoute} onSelectRoute={handleSelectRoute} />
            <TollDetails selectedRoute={selectedRoute} />
          </>
        )}
      </Box>
    </Center>
  );
};

export default TollCalc;