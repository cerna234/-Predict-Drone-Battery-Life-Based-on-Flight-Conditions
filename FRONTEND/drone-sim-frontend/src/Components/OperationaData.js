import React, { useState, useEffect } from 'react';
import Drone from "./drone";
import './OperationData.css';
import { GrPrevious, GrNext } from "react-icons/gr";

const droneConfigs = [
  {
    name: "ScanEagle",
    image: "/Images/ScanEagle.png",
    baseLife: 900
  },
  {
    name: "Wasp AE",
    image: "/Images/WaspAE.png",
    baseLife: 60
  },
  {
    name: "RQ-4 Global Hawk",
    image: "/Images/rq-4globalHawk.png",
    baseLife: 3600
  },
  {
    name: "MQ-9 Reaper",
    image: "/Images/MQ-9 Reaper.png",
    baseLife: 2400
  }
];

function OperationData() {
  const [imageIndex, setImageIndex] = useState(0);
  const selectedDrone = droneConfigs[imageIndex];

  const [baseLife, setBaseLife] = useState(selectedDrone.baseLife);
  const [droneType, setDroneType] = useState(selectedDrone.name);
  const [date, setDate] = useState();
  const [location, setLocation] = useState("afghanistan");
  const [mission, setMission] = useState("Surveillance");
  const [payload, setPayload] = useState(0.071);
  const [altitude, setAltitude] = useState(23);
  const [enemyContact, setEnemyContact] = useState(0);
  const [response, setResponse] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setBaseLife(selectedDrone.baseLife);
    setDroneType(selectedDrone.name);
  }, [imageIndex]);

  useEffect(() => {
    const stop = startLiveTimeUpdater();
    return () => stop();
  }, []);

  const startLiveTimeUpdater = () => {
    let currentTime = new Date().toLocaleTimeString();
    setCurrentTime(currentTime);

    const interval = setInterval(() => {
      currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  };



  const handleSubmit = () => {
    const formData = {
      date,
      Location: location,
      drone_type: selectedDrone.name,
      mission,
      payload,
      altitude,
      base_life: selectedDrone.baseLife,
      enemy_contact: enemyContact
    };

    fetch('http://127.0.0.1:5000/live_data_prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setResponse(data)
        console.log(data)
      }
      );
      
  };

  const updatingIndex = (isPrev) => {
    
    if (isPrev) {
      setIndex(prev => Math.max(prev - 1, 0));
    } else {
      setIndex(prev => Math.min(prev + 1, response.length ));
    }
  };

  const today = new Date();
  const dates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  ].map(d => d.toISOString().slice(0, 10));




  return (
    <div className="OperationDataContainer">
      <h2 className="liveTime">{currentTime}</h2>

      <div className="InputsSection">
        <div className="inputsContainer">
          <h1 className="inputsSectionHeader">MISSION DATA</h1>
          <select onChange={(e) => setDate(e.target.value)}>
            {dates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
          <input onChange={(e) => setLocation(e.target.value)} placeholder="LOCATION" />
          <input onChange={(e) => setMission(e.target.value)} placeholder="MISSION" />
          <input onChange={(e) => setPayload(parseFloat(e.target.value))} placeholder="PAYLOAD" />
          <input onChange={(e) => setAltitude(parseFloat(e.target.value))} placeholder="ALTITUDE" />
          <input onChange={(e) => setEnemyContact(parseInt(e.target.value))} placeholder="ENEMY CONTACT" />
          <button onClick={handleSubmit} className="toggleButton">Submit</button>
        </div>
      </div>

      {response.length > 0 ? response.slice(index, index + 1).map((drone, i) => (
        <div className="droneStatsContainer" key={i}>
          <div className="droneSection">
            <div className="dronSectionSelection">
              <div className="DroneSelectorSection">
                <img
                  className="droneSelectorButtonImage"
                  src={droneConfigs[imageIndex - 1]?.image}
                  style={{ opacity: imageIndex <= 0 ? 0 : 0.6 }}
                  alt="Prev Drone"
                />
              </div>

              <div className="toggleDroneButtons">
                <button
                  className="toggleDroneButton"
                  onClick={() => {
                    setImageIndex(prev => Math.max(prev - 1, 0))
                    handleSubmit();
                  }}
                  disabled={imageIndex === 0}
                >
                  <GrPrevious />
                </button>
                <button
                  className="toggleDroneButton"
                  onClick={() => {
                    setImageIndex(prev => Math.min(prev + 1, droneConfigs.length - 1))
                    handleSubmit();

                  }}
                  disabled={imageIndex === droneConfigs.length - 1}
                >
                  <GrNext />
                </button>
              </div>

              <div className="DroneSelectorSection">
                <img
                  className="droneSelectorButtonImage"
                  src={droneConfigs[imageIndex + 1]?.image}
                  style={{ opacity: imageIndex >= droneConfigs.length - 1 ? 0 : 0.6 }}
                  alt="Next Drone"
                />
              </div>
            </div>

            <Drone
              droneName={selectedDrone.name}
              droneImage={selectedDrone.image}
              baseLife={baseLife}
              date={drone.Hour_information.time}
              mission={drone.missionData.mission}
            />
          </div>

          <div className="StatsSection">
            <div className="StatsSectionInner">
              <div className="missionStatsBox">
                <h1 className="missionStatsHeader">Predicted Weather Statistics</h1>
                <h2 className="missionStat"><span className="label">WIND VECTOR:</span> <span className="value">{drone.missionData.wind_speed} mph</span></h2>
                <h2 className="missionStat"><span className="label">SURFACE TEMP:</span> <span className="value">{drone.missionData.temperature} °F</span></h2>
                <h2 className="missionStat"><span className="label">CURRENT ALTITUDE:</span> <span className="value">{drone.missionData.altitude} ft</span></h2>
                <h2 className="missionStat"><span className="label">HUMIDITY INDEX:</span> <span className="value">{drone.missionData.humidity} %</span></h2>
                <h2 className="missionStat"><span className="label">PAYLOAD MASS:</span> <span className="value">{drone.missionData.payload} kg</span></h2>
                <h2 className="missionStat"><span className="label">PRECIPITATION RATE:</span> <span className="value">{drone.missionData.rain} mm</span></h2>
                <h2 className="missionStat"><span className="label">TEMP × HUMIDITY SIG:</span> <span className="value">{drone.missionData.temp_humidity}</span></h2>
                <h2 className="missionStat"><span className="label">WIND × RAIN SIG:</span> <span className="value">{drone.missionData.wind_rain}</span></h2>
              </div>

              <div className="BateryLifeExpectancyBox">
                <h1 className="BatteryLifeExpectancyBoxHeader">Battery Life Prediction</h1>
                <p className="BatteryLifeExpectancyMinutesValue">
                  {(drone.model_battery_life_length_prediction / 100) * baseLife} MINS
                </p>
                <div className="BatteryLifeExpetancyBox">
                  <div
                    className="BatteryLifeExpetancyAmountDisplay"
                    style={{
                      width: `${(drone.model_battery_life_length_prediction)}%`,
                      backgroundColor: "green"
                    }}
                  />
                </div>
              </div>

              <div className='ToggleButtonsSection'>
                <button
                  onClick={() => {
                    updatingIndex(true)
                     console.log("index:", index, "response.length:", response.length);
                  }}
                  disabled={index === 0}
                  className="toggleButton"
                >
                  PREVIOUS HOUR
                </button>
                <button
                  onClick={() => {
                    updatingIndex(false)
                    console.log("index:", index, "response.length:", response.length);
                  }}
                  disabled={index + 1 >= response.length }
                  className="toggleButton"
                >
                  NEXT HOUR
                </button>
                <button className="toggleButton">IDEAL TIME</button>
              </div>
            </div>
          </div>
        </div>
      )) : <div>"HELLO"</div>}
    </div>
  );
}

export default OperationData;
