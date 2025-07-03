import React, { useState, useEffect } from 'react';
import Drone from "./drone";
import './OperationData.css';
import { GrPrevious, GrNext } from "react-icons/gr";
import { ClipLoader } from "react-spinners";

const droneConfigs = [
  { name: "Wasp AE", image: "/Images/WaspAE.png", baseLife: 60 },
  { name: "ScanEagle", image: "/Images/ScanEagle.png", baseLife: 900 },
  { name: "MQ-9 Reaper", image: "/Images/MQ-9 Reaper.png", baseLife: 2400 },
  { name: "RQ-4 Global Hawk", image: "/Images/rq-4globalHawk.png", baseLife: 3600 }
];

function OperationData() {
  const [imageIndex, setImageIndex] = useState(0);
  const selectedDrone = droneConfigs[imageIndex];

  const defaultdateToday = new Date();
  const currentdate = new Date(
    defaultdateToday.getFullYear(),
    defaultdateToday.getMonth(),
    defaultdateToday.getDate() + 1
  );
  const [date, setDate] = useState(currentdate.toISOString().split('T')[0]);
  const [location, setLocation] = useState("afghanistan");
  const [mission, setMission] = useState("Surveillance");
  const [payload, setPayload] = useState(0.071);
  const [altitude, setAltitude] = useState(23);
  const [enemyContact, setEnemyContact] = useState(0);
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [batteryLife, setBatteryLife] = useState(0);
  const [batteryColor, setBatteryColor] = useState("green");
  const [loadingBar, setLoadingBar] = useState(false);
  const [allResponses, setAllResponses] = useState({});

  const response = allResponses[selectedDrone.name] || [];

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

  const idealHour = () => {
    if (response.length > 0) {
      let idealhour = 0;
      for (let i = 0; i < response.length; i++) {
        if (response[i]?.model_battery_life_length_prediction > response[idealhour]?.model_battery_life_length_prediction) {
          idealhour = i;
        }
      }
      setIndex(idealhour);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      date,
      Location: location,
      drone_type: selectedDrone.name,
      mission,
      payload,
      altitude,
      base_life: selectedDrone.baseLife,
      enemy_contact: enemyContact === "Yes" ? 1 : 0
    };

    console.log(formData);

    setLoadingBar(true);

    try {
      const res = await fetch('https://drone-battery-predictor-10a55fae9a09.herokuapp.com/live_data_prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      setAllResponses(prev => ({
        ...prev,
        [selectedDrone.name]: data
      }));

      setIndex(0); // reset index
      batteryColorFunc();
    } catch (err) {
      console.error("Fetch error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingBar(false);
    }
  };

  useEffect(() => {
    if (date) {
      handleSubmit();
      batteryColorFunc();
    }
  }, [imageIndex]);

  useEffect(() => {
    if (response.length > 0 && response[index]) {
      setBatteryLife((response[index]?.model_battery_life_length_prediction / 100) * selectedDrone.baseLife);
    }
  }, [response, index, selectedDrone.baseLife]);

  const updatingIndex = (isPrev) => {
    if (isPrev) {
      setIndex(prev => Math.max(prev - 1, 0));
    } else {
      setIndex(prev => Math.min(prev + 1, response.length - 1));
    }
  };

  const batteryColorFunc = () => {
    if (response.length > 0 && response[index]) {
      const batteryPercentage = response[index]?.model_battery_life_length_prediction;

      if (batteryPercentage >= 0 && batteryPercentage < 20) {
        setBatteryColor("red");
      } else if (batteryPercentage >= 20 && batteryPercentage < 50) {
        setBatteryColor("orange");
      } else if (batteryPercentage >= 50 && batteryPercentage < 80) {
        setBatteryColor("yellow");
      } else if (batteryPercentage >= 80 && batteryPercentage <= 100) {
        setBatteryColor("green");
      } else {
        setBatteryColor("gray");
      }
    }
  };

  const enemyContactOptions = ["Yes", "No"];
  const missions = ["Reconnaissance", "Surveillance", "Strike"];

  const today = new Date();
  const dates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
  ].map(d => d.toISOString().slice(0, 10));

  

  return (
    <div style={{ backgroundImage: "url('/Images/drone-BackgroundImage.jpg')" }} className="OperationDataContainer">
      <h2 className="liveTime">{currentTime}</h2>

      <div className="InputsSection">
        <div className="inputsContainer">
          <h1 className="inputsSectionHeader">MISSION DATA</h1>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>Mission Date:</label>
            <select className='SelectInputs' onChange={(e) => setDate(e.target.value)}>
              {dates.map(date => (
                <option className='optionStyling' key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>ENEMY CONTACT:</label>
            <select className='SelectInputs' onChange={(e) => setEnemyContact(e.target.value)}>
              {enemyContactOptions.map(contact => (
                <option className='optionStyling' key={contact} value={contact}>{contact}</option>
              ))}
            </select>
          </div>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>Mission:</label>
            <select className='SelectInputs' onChange={(e) => setMission(e.target.value)}>
              {missions.map(mission => (
                <option className='optionStyling' key={mission} value={mission}>{mission}</option>
              ))}
            </select>
          </div>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>Location:</label>
            <input onChange={(e) => setLocation(e.target.value)} placeholder={location} />
          </div>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>Payload (Kgs):</label>
            <input type='number' onChange={(e) => setPayload(parseFloat(e.target.value))}  />
          </div>
          <div className='SelectInputsContainer'>
            <label className='SelectInputLabel'>Altitude (ft):</label>
            <input type='number' onChange={(e) => setAltitude(parseFloat(e.target.value))}  />
          </div>
          <button onClick={handleSubmit} className="toggleButton" disabled={loadingBar}>Submit</button>
        </div>
      </div>

      {response.length > 0 && response[index] ? (
        <div className="droneStatsContainer">
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
                  onClick={() => setImageIndex(prev => Math.max(prev - 1, 0))}
                  disabled={imageIndex === 0}
                >
                  <GrPrevious />
                </button>
                <button
                  className="toggleDroneButton"
                  onClick={() => setImageIndex(prev => Math.min(prev + 1, droneConfigs.length - 1))}
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
              baseLife={selectedDrone.baseLife}
              date={response[index]?.Hour_information?.time}
              mission={response[index]?.missionData?.mission}
              BatteryLifeData={response}
            />
          </div>

          <div className="StatsSection">
            <div className="StatsSectionInner">
              <div className="missionStatsBox">
                <h1 className="missionStatsHeader">Predicted Weather Statistics</h1>
                <h2 className="missionStat"><span className="label">WIND VECTOR:</span> <span className="value">{response[index]?.missionData?.wind_speed} mph</span></h2>
                <h2 className="missionStat"><span className="label">SURFACE TEMP:</span> <span className="value">{response[index]?.missionData?.temperature} °F</span></h2>
                <h2 className="missionStat"><span className="label">CURRENT ALTITUDE:</span> <span className="value">{response[index]?.missionData?.altitude} ft</span></h2>
                <h2 className="missionStat"><span className="label">HUMIDITY INDEX:</span> <span className="value">{response[index]?.missionData?.humidity} %</span></h2>
                <h2 className="missionStat"><span className="label">PAYLOAD MASS:</span> <span className="value">{response[index]?.missionData?.payload} kg</span></h2>
                <h2 className="missionStat"><span className="label">PRECIPITATION RATE:</span> <span className="value">{response[index]?.missionData?.rain} mm</span></h2>
                <h2 className="missionStat"><span className="label">TEMP × HUMIDITY SIG:</span> <span className="value">{response[index]?.missionData?.temp_humidity}</span></h2>
                <h2 className="missionStat"><span className="label">WIND × RAIN SIG:</span> <span className="value">{response[index]?.missionData?.wind_rain}</span></h2>
              </div>

              <div className="BateryLifeExpectancyBox">
                <h1 className="BatteryLifeExpectancyBoxHeader">Battery Life Prediction</h1>
                <p className="BatteryLifeExpectancyMinutesValue">
                  {batteryLife.toFixed(2)} MINS
                </p>
                <div className="BatteryLifeExpetancyBox">
                  <div
                    className="BatteryLifeExpetancyAmountDisplay"
                    style={{
                      width: `${response[index]?.model_battery_life_length_prediction}%`,
                      backgroundColor: batteryColor
                    }}
                  />
                </div>
              </div>

              <div className='ToggleButtonsSection'>
                <button
                  onClick={() => updatingIndex(true)}
                  disabled={index === 0}
                  className="toggleButton"
                >
                  PREVIOUS HOUR
                </button>
                <button
                  onClick={() => updatingIndex(false)}
                  disabled={index + 1 >= response.length}
                  className="toggleButton"
                >
                  NEXT HOUR
                </button>
                <button
                  onClick={() => idealHour()}
                  className="toggleButton">IDEAL TIME</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='LoadingScreen'>
          {loadingBar ? (
            <ClipLoader color="#36d7b7" loading={true} size={100} />
          ) : (
            <div>Enter Data</div>
          )}
        </div>
      )}
    </div>
  );
}

export default OperationData;
