import React from 'react';
import "./droneDataPopup.css"
function DroneDataPopup({ shown, onClose, data }) {
  if (!shown) return null;

  const handleDataClick = () => {
    console.log(data)
  };

  return (

      <div className="droneDataPopup">
        <h2 className="DroneDataHeader">DRONE DATA</h2>
       {data ? (
        
            <div className="droneDataInfo">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Manufacturer:</strong> {data.manufacturer}</p>
            <p><strong>Country:</strong> {data.country}</p>
            <p><strong>Year Introduced:</strong> {data.yearIntroduced}</p>
            <p><strong>Max Speed:</strong> {data.maxSpeed}</p>
            <p><strong>Endurance:</strong> {data.endurance}</p>
            <p><strong>Range:</strong> {data.range}</p>
  
        </div>
        ) : (
        <p>No drone data available.</p>
        )}
     
        <button className="popupButton" onClick={onClose}>Close</button>
      </div>
    
  );
}

export default DroneDataPopup;
