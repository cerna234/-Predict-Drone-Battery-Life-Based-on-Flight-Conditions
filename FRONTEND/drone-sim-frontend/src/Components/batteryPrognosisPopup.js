import { useState } from 'react';
import '../Components/batteryPrognosisPopup.css';

function BatteryPrognosisPopup({ shown, onClose,data }) {

  const[fileName,setFileName] = useState("defaultFile")
  if (!shown) return null;

function exportCSV(data) {
  if (!data || data.length === 0) {
    alert("No data to export.");
    return;
  }

  // Define CSV headers
  const headers = [
    "Time",
    "Drone",
    "Battery Life Prediction (min)",
    "Altitude (ft)",
    "Payload (kg)",
    "Temperature (F)",
    "Humidity (%)",
    "Wind Speed (mph)",
    "Rain",
    "Enemy Contact"
  ];

  // Build CSV rows
  const rows = data.map(item => {
    
    const hour = item.Hour_information.time;
    const missionData = item.missionData;
    const batteryLifePrognosis = item.model_battery_life_length_prediction;
    const drone = missionData.drone_type || "";
    const time = hour;
    const altitude = missionData.altitude || "";
    const payload = missionData.payload || "";
    const temperature = missionData.temperature || "";
    const humidity = missionData.humidity || "";
    const windSpeed = missionData.wind_speed || missionData.windSpeed || "";
    const rain = missionData.rain ? "Yes" : "No";
    const enemyContact = missionData.enemy_contact || missionData.enemyContact ? "Yes" : "No";

    return [
      time,
      drone,
      batteryLifePrognosis.toFixed(2),
      altitude,
      payload,
      temperature,
      humidity,
      windSpeed,
      rain,
      enemyContact
    ].join(",");
  });

  // Combine headers and rows
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName + ".csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  return (
    <div className="batteryPrognosisContainer">
     
        <div className="batteryPrognosisPopup">
          <h2 className='batteryPrognosisPopupHeader'>Battery Prognosis Exporter</h2>

          <div className='inputsSection'>
              <input
                placeholder="fileName"
                
                onChange={(e) => setFileName(e.target.value)}
              />  
              <div className='popupButtons'>
                  <button className='popupButton' onClick={() => {
                    exportCSV(data)
                  }}>Download</button>
                    <button className='popupButton' onClick={onClose}>Close</button>
              </div>

          </div>
       
       
     
        </div>
     
    </div>
  );
}

export default BatteryPrognosisPopup;