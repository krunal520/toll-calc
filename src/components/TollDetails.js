// components/TollDetails.js
import React from 'react';

const TollDetails = ({ selectedRoute }) => {
  if (!selectedRoute) return null;

  return (
    <div>
      <h2>Toll Details</h2>
      <ul>
        {selectedRoute.tolls.map((toll, index) => (
          <li key={index}>
            Toll {index + 1}: Cost - ${toll.cost.toFixed(2)}, Location - ({toll.location.lat}, {toll.location.lng})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TollDetails;