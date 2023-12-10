// utils/polylineDecoder.js
import polyline from '@googlemaps/polyline-codec';

export const decodePolyline = (encodedPolyline) => {
  return polyline.decode(encodedPolyline).map(([lat, lng]) => ({ lat, lng }));
};
