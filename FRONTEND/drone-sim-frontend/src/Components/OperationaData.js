

import Drone from "./drone";
import './OperationData.css'
import React, { useState, useEffect, use } from 'react';
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

const [baseLife, setBaseLife] = useState(0)



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
      base_life: 3400,
      enemy_contact: enemyContact
    };

    console.log(formData)
    
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
    if(response.length > 0 ){
      let prediction = Math.min(response[idealTime].model_battery_life_length_prediction * 1.7, 100);
      setBatteryBarValue(prediction)
      batteryBarColorFunc(prediction)
    }
    setBaseLife(response[idealTime].missionData.base_life)
    
   
    
  
  }

  const updatingIndex = (isPrev) => {

      if(isPrev){
        setIndex(prev => Math.max(prev - 1, 0))
        calculateBatteryBar(-1)
        setBaseLife(response[index].missionData.base_life)
      }
      else{
        
        setIndex(prev => Math.min(prev + 1, response.length - 1))
        calculateBatteryBar(1)
        setBaseLife(response[index].missionData.base_life)
      }
      
      

      
  }


  const[batteryBarValue,setBatteryBarValue] = useState(0)
  const[batteryBarColor,setBatteryBarColor] = useState("green")
  const calculateBatteryBar = (offset) => {

    let itemIdex = offset + index
    let prediction = Math.min(response[itemIdex].model_battery_life_length_prediction * 1.7, 100);
    
    setBatteryBarValue(prediction)
    batteryBarColorFunc(prediction)
    


    
   
    
  }

  const batteryBarColorFunc = (prediction) => {
    if(prediction > 80){
        setBatteryBarColor("green")
    }
    else if(prediction > 60){
        setBatteryBarColor("yellow")
    }
    else if(prediction > 40){
      setBatteryBarColor("orange")
    }
    else{
      setBatteryBarColor("red")
    }
  }

    

   const today = new Date();

  const dates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  ].map(d => d.toISOString().slice(0, 10)); // Format YYYY-MM-DD

  const[currentTime,setCurrentTime] = useState(0)
  const startLiveTimeUpdater =  () => {
  let currentTime = new Date().toLocaleTimeString();

  // Immediately log or use the time
  console.log("Current Time:", currentTime);

  // Start updating every second
  const interval = setInterval(() => {
    currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
 
    setCurrentTime(currentTime)
    // You can do anything with currentTime here (like update UI)
  }, 1000);

  // Return a way to stop it if needed
  return () => clearInterval(interval);

  }

  useEffect(() => {
    const stop = startLiveTimeUpdater(); // start on mount
    return () => stop(); // cleanup on unmount
  }, []);

  return (
    <div className="OperationDataContainer">


        <h2 className="liveTime">{currentTime}</h2>

        <div className="InputsSection">


                 
                <div className="inputsContainer">
                  <h1 className="inputsSectionHeader">MISSION DATA</h1>    
                 
                  <select onChange={(e) => setDate(e.target.value)} className="simpleFuturisticDropdown">
                      {dates.map(date => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                    ))}
                  </select>
                  <input onChange={(e) => setLocation(e.target.value)} placeholder="LOCATION" />
                  <input  onChange={(e) => setDroneType(e.target.value)} placeholder="DRONE NAME" />
                  <input  onChange={(e) => setMission(e.target.value)} placeholder="MISSION" />
                  <input  onChange={(e) => setPayload(parseFloat(e.target.value))} placeholder="PAYLOAD" />
                  <input  onChange={(e) => setAltitude(parseFloat(e.target.value))} placeholder="ALTITUDE" />
                  <input onChange={(e) => setEnemyContact(parseInt(e.target.value))} placeholder="ENEMY CONTACT" />
                   <button onClick={handleSubmit} className="toggleButton">Submit</button>
                </div>

          
        </div>

        {response.length > 0 ?
            response.slice(index, index + 1).map((drone, i) => (


              <div className="droneStatsContainer">
                   
                <div className="droneSection">
                  <Drone date = {drone.Hour_information.time} mission = {drone.missionData.mission} droneName= {drone.missionData.drone_type} windSpeed = {1} />
                </div>

                <div className="StatsSection">
                    <div className="StatsSectionInner">
                      <div className="missionStatsBox">
                        <h1 className="missionStatsHeader">Predicted Weather Statistics</h1>
                       <h2 className="missionStat">
                          <span className="label">WIND VECTOR:</span> 
                          <span className="value">{drone.missionData.wind_speed} mph</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">SURFACE TEMP:</span> 
                          <span className="value">{drone.missionData.temperature} °F</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">CURRENT ALTITUDE:</span> 
                          <span className="value">{drone.missionData.altitude} ft</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">HUMIDITY INDEX:</span> 
                          <span className="value">{drone.missionData.humidity} %</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">PAYLOAD MASS:</span> 
                          <span className="value">{drone.missionData.payload} kg</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">PRECIPITATION RATE:</span> 
                          <span className="value">{drone.missionData.rain} mm</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">TEMP × HUMIDITY SIG:</span> 
                          <span className="value">{drone.missionData.temp_humidity}</span>
                        </h2>

                        <h2 className="missionStat">
                          <span className="label">WIND × RAIN SIG:</span> 
                          <span className="value">{drone.missionData.wind_rain}</span>
                        </h2>
                        
                      </div>

                      <div className="BateryLifeExpectancyBox">
                        <h1 className="BatteryLifeExpectancyBoxHeader">Predicted Weather Statistics</h1>
                          <p className="BatteryLifeExpectancyMinutesValue">{(drone.model_battery_life_length_prediction / 100 ) * baseLife } MINS</p>
                        <div className="BatteryLifeExpetancyBox">
                          <div className="BatteryLifeExpetancyAmountDisplay" style={{width:`${batteryBarValue}%`, backgroundColor: batteryBarColor}}></div>
                        </div>
                      </div>

                      <div className='ToggleButtonsSection'>
                          <button
                            onClick={() => updatingIndex(true)}
                            disabled={index === 0}
                            className="toggleButton"
                          >
                            PREVIOUS
                          </button>
                          <button 
                            onClick={() => updatingIndex(false)}
                            disabled={index === response.length - 2}
                            className="toggleButton"
                          >
                            NEXT
                          </button>
                          <button
                            onClick={() => idealHourFunc()}
                            className="toggleButton"
                          >
                            IDEAL TIME
                          </button>
                      </div> 
                    </div>


                </div>




              </div>
      
            ))
            :

            <div>
                "HELLO"
            </div>
 

            }

            
          
                    
          
          
          
          
        
        
    </div>
  );
}

export default OperationData;
