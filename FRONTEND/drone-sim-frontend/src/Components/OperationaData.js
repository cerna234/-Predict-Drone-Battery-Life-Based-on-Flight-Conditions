

import Drone from "./drone";
import './OperationData.css'
import React, { useState, useEffect } from 'react';
import { FiWind } from "react-icons/fi";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { IoRainyOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWeightHanging } from "react-icons/fa";
import { CiLineHeight } from "react-icons/ci";
import { WiThermometer, WiRaindrop } from 'react-icons/wi';
/*

#DATA NEEDED FOR OUTER CIRCLE: 
# {
# drone_type, NO
# temperature, YES
# wind_speed, YES
# rain, YES
# humidity, YES
# time_of_day, NO
# mission, NO
# payload, YES
# altitude, YES
# enemy_contact, NO
# temp_humidity, YES 
# wind_rain YES
#}
*/
function OperationData(props) {

const [index,setIndex] = useState(0)

const [date, setDate] = useState("2025-06-19");
const [location, setLocation] = useState("afghanistan");
const [droneType, setDroneType] = useState("RQ-11 Raven");
const [mission, setMission] = useState("Surveillance");
const [payload, setPayload] = useState(0.32);
const [altitude, setAltitude] = useState(23);
const [enemyContact, setEnemyContact] = useState(0);








   const [response, setResponse] = useState([]);

 

  const handleSubmit = () => {
    
    const formData = {
      date,
      Location: location,
      drone_type: droneType,
      mission,
      payload,
      altitude,
      enemy_contact: enemyContact
    };
    fetch('http://127.0.0.1:5000/live_data_prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
    setResponse(data);

        if (data.length > 0) {
          idealHourFunc();
        } else {
          console.log("NOT READY");
        }
      });

    
  };


  useEffect(() => {
  if (response.length > 0) {
    idealHourFunc();
  }
  }, [response]);

  const idealHourFunc = () => {

    let idealTime = 0
    let baseBatteryLife = 0

    


    for (let i = 0; i < response.length -1; i++) {
        let currBatteryLife = response[i].model_battery_life_length_prediction

        if(currBatteryLife > baseBatteryLife){
          baseBatteryLife = currBatteryLife
          idealTime = i
        }
       
    }
    
    
    setIndex(idealTime)
    
    console.log("HERE")

    
  }

  return (
    <div className="OperationDataContainer">
      
    
        <div className="inputsSectionContainer">
            <div className="inputsContainer">
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="date" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" />
              <input value={droneType} onChange={(e) => setDroneType(e.target.value)} placeholder="drone name" />
              <input value={mission} onChange={(e) => setMission(e.target.value)} placeholder="mission" />
              <input value={payload} onChange={(e) => setPayload(parseFloat(e.target.value))} placeholder="payload" />
              <input value={altitude} onChange={(e) => setAltitude(parseFloat(e.target.value))} placeholder="altitude" />
              <input value={enemyContact} onChange={(e) => setEnemyContact(parseInt(e.target.value))} placeholder="enemy contact" />
                          
               
           
            </div>
            <button onClick={handleSubmit}>START SIM</button>
          
        </div>

          {
            response.length > 0 ?
            response.slice(index, index + 1).map((drone, i) => (
              <div key={i} className="statsCirtcleContainer">
             
                <div className="statsCircle">
                

                  <div className="statsLeft">
                    <div className="missionSpecificStatContainer" style={{ left: "40px" }}>
                      <h2 className="dataIcon"> <TbTemperatureFahrenheit/> </h2>
                      <h2 className="missionSpecificStat">{drone.missionData.temperature}</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "80px" }}>
                      <h2 className="dataIcon"><FiWind/></h2>
                      <h2 className="missionSpecificStat">{drone.missionData.wind_speed}</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "80px" }}>
                      <h2 className="dataIcon"><IoRainyOutline/></h2>
                      <h2 className="missionSpecificStat">{drone.missionData.rain}</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "60px" }}>
                      <h2 className="dataIcon"> <WiHumidity/> </h2>
                      <h2 className="missionSpecificStat">{drone.missionData.humidity}</h2>
                    </div>
                  </div>

                  <Drone hour={index} mission={drone.missionData.mission} batteryExpectancy={drone.model_battery_life_length_prediction}/>

                  <div className="statsRight">
                    <div className="missionSpecificStatContainer" style={{ right: "40px" }}>
                      <h2 className="missionSpecificStat">{drone.missionData.payload}</h2>
                      <h2 className="dataIcon"> <FaWeightHanging/> </h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "80px" }}>
                      <h2 className="missionSpecificStat">{drone.missionData.altitude}</h2>
                      <h2 className="dataIcon"> <CiLineHeight/> </h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "80px" }}>
                      <h2 className="missionSpecificStat">{drone.missionData.temp_humidity}</h2>
                      <h2 className="dataIcon"><TbTemperatureFahrenheit/>  X <IoRainyOutline/></h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "40px" }}>
                      <h2 className="missionSpecificStat">{drone.missionData.wind_rain}</h2>
                      <h2 className="dataIcon"><FiWind/> X <IoRainyOutline/> </h2>
                    </div>
                  </div>
                </div>

                <div className="nextPreviousButtonsContainer">
                    <button
                      onClick={() => setIndex(prev => Math.max(prev - 1, 0))}
                      disabled={index === 0}
                    >
                      PREVIOUS
                    </button>
                    <button 
                      onClick={() => setIndex(prev => Math.min(prev + 1, response.length - 1))}
                      disabled={index === response.length - 2}
                    >
                      NEXT
                    </button>
                    <button
                      onClick={() => idealHourFunc()}
                    >
                      IDEAL TIME
                    </button>
                </div>

              </div>
            )) 
            : <div>
                <h2 style={{color: "red"}}>Please enter things</h2>
              </div>
          }
                    
          
          
          
          
        
        
    </div>
  );
}

export default OperationData;
