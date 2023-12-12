// MapComponent.js

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { decode } from '@googlemaps/polyline-codec';

const MapComponent = ({ routes, selectedRoute, onSelectRoute, setFromCity, setToCity }) => {
  const mapRef = useRef();

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;

    // Example: Set fromCity and toCity alternatively based on the number of clicks
    if (!selectedRoute || !selectedRoute.overview_polyline || !selectedRoute.overview_polyline.points)
      return;

    if (!setFromCity || !setToCity) return;

    if (!setFromCity.value) {
      setFromCity({ value: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    } else {
      setToCity({ value: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    }
  };

  useEffect(() => {
    if (selectedRoute) {
      const decodedPolyline = decode(selectedRoute.overview_polyline.points);
      const coordinates = decodedPolyline.map(point => [point.lat, point.lng]);
      const bounds = L.polyline(coordinates).getBounds();

      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [selectedRoute]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={13}
      style={{ height: '400px', width: '100%', marginBottom: '20px' }}
      whenCreated={mapInstance => {
        mapRef.current = mapInstance;
      }}
      onClick={handleMapClick} // Handle map click events
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {selectedRoute && (
        <Polyline
          positions={decode(selectedRoute.overview_polyline.points).map(point => [point.lat, point.lng])}
          color="blue"
        />
      )}

      {selectedRoute &&
        selectedRoute.tolls &&
        selectedRoute.tolls.map((toll, index) => (
          <Marker
            key={index}
            position={[toll.location.lat, toll.location.lng]}
            eventHandlers={{ click: () => alert(`Toll Cost: $${toll.cost.toFixed(2)}`) }}
          >
            <Popup>{`Toll Cost: $${toll.cost.toFixed(2)}`}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
