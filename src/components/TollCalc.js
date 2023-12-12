import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center, Select } from '@chakra-ui/react';
import axios from 'axios';
import MapComponent from './Map';

const TollCalc = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [vehicleType, setVehicleType] = useState('Car, SUV or Pickup Truck');

  const handleCalculateRoutes = async () => {
    try {
      const apiUrl = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints';

      const payload = {
        from: {
          address: fromAddress,
        },
        to: {
          address: toAddress,
        },
        waypoints: [] // No waypoints for now
      };

      const response = await axios.post(
        apiUrl,
        payload,
        {
          headers: {
            'Allow Access Origin': '*',
            'Content-Type': 'application/json',
            'x-api-key': 'j2mdnpgDPNpp7b93LGpnpG9H7B2rtpHn',
          },
        }
      );

      const calculatedRoutes = response.data && response.data.routes;
      setRoutes(calculatedRoutes);
      setSelectedRoute(calculatedRoutes && calculatedRoutes[0]);
    } catch (error) {
      console.error('Error calculating routes:', error.message);
    }
  };

  const handleFromAddressChange = (e) => {
    setFromAddress(e.target.value);
  };

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    // Define functionality if needed
  };

  const handleMapClick = (lat, lng) => {
    // Handle map click logic, if needed
  };

  return (
    <Center p={20}>
      <Box width="xl" p={4} borderWidth="1px" borderRadius="md">
        <FormControl mb={4}>
          <FormLabel>From Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter From Address"
            value={fromAddress}
            onChange={handleFromAddressChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>To Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter To Address"
            value={toAddress}
            onChange={handleToAddressChange}
          />
        </FormControl>
  
        
        <Button colorScheme="blue" onClick={handleCalculateRoutes}>
          Submit
        </Button>

        {routes.length > 0 && (
          <MapComponent
            routes={routes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            onMapClick={handleMapClick}
          />
        )}
      </Box>
    </Center>
  );
};

export default TollCalc;
