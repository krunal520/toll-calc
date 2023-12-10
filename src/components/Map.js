// components/MapComponent.js
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ routes, selectedRoute, onSelectRoute }) => {
  useEffect(() => {
    if (selectedRoute) {
      const decodedPolyline = L.Polyline.fromEncoded(selectedRoute.overview_polyline.points);
      const bounds = decodedPolyline.getBounds();
      mapRef.current.fitBounds(bounds);
    }
  }, [selectedRoute]);

  const mapRef = React.createRef();

  return (
    <MapContainer
      center={[0, 0]}
      zoom={13}
      style={{ height: '400px', width: '100%', marginBottom: '20px' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {selectedRoute && (
        <Polyline
          positions={L.Polyline.fromEncoded(selectedRoute.overview_polyline.points).getLatLngs()}
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