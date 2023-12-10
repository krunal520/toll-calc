import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center, Select } from '@chakra-ui/react';
import axios from 'axios';
import MapComponent from './Map';
import TollDetails from './TollDetails';
import DatePicker from 'react-datepicker'; // Import DatePicker from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles

const TollCalc = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [vehicleType, setVehicleType] = useState('Car, SUV or Pickup Truck'); // Default vehicle type
    const [departureTime, setDepartureTime] = useState(new Date());


    // SVG logo component for switching cities
const SwitchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 3 21 7 17 11" />
      <polyline points="7 21 3 17 7 13" />
      <line x1="21" y1="7" x2="3" y2="17" />
    </svg>
  );
    // Function to swap "From City" and "To City" values
    const handleCitySwap = () => {
        const tempToCity = toCity;
        setToCity(fromCity);
        setFromCity(tempToCity);
    };

    const handleCalculateRoutes = async () => {
        try {
            const apiKey = 'j2mdnpgDPNpp7b93LGpnpG9H7B2rtpHn';
            const apiUrl = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints';

            const response = await axios.post(apiUrl, {
                from: fromCity,
                to: toCity,
                vehicleType: vehicleType, // Use selected vehicle type
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
        <Center p={20} marginRight={500}>
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

                {/* Button to switch "From City" and "To City" */}
                <Button colorScheme="blue" onClick={handleCitySwap} leftIcon={<SwitchIcon />}>
          
        </Button>

                <FormControl mb={4}>
                    <FormLabel>To City</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter To City"
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                    />
                </FormControl>




                <FormControl mb={4}>
                    <FormLabel>Select Your Vehicle</FormLabel>
                    <Select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                    >
                        <option value="Car, SUV or Pickup Truck">Car, SUV or Pickup Truck</option>

                        <option value="Rideshare">Rideshare</option>
                        <option value="Taxi">Taxi</option>
                        <option value="W">W</option>
                        <option value="Carpool">Carpool</option>
                        <option value="2+">2+</option>
                        <option value="C">C</option>
                        <option value="Truck">Truck</option>
                        <option value="Bus">Bus</option>

                    </Select>
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Departure Time</FormLabel>
                    <DatePicker
                        selected={departureTime}
                        onChange={(date) => setDepartureTime(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd h:mm aa"
                    />
                </FormControl>

                <Button colorScheme="blue" onClick={handleCalculateRoutes}>
                    Submit
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