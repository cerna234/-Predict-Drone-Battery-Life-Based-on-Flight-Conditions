
//import { useEffect, useState } from 'react';
import BatteryPrognosisPopup from './batteryPrognosisPopup'
import DroneDataPopup from './droneDataPopup';
import './drone.css'
import dronedata from "./droneData.json"


function Drone(props) {

  const [popupShown, setPopupShown] = useState(false);
  const [batteryPopupShowing, setBatteryPopupShowing] = useState(false)
  const batteryPrognosis = () => {
    console.log(batteryPopupShowing)
      if(batteryPopupShowing === true){
        setBatteryPopupShowing(false)
      }
      else{
        setBatteryPopupShowing(true)
      }
  }


  const [droneDataIndividual, setDroneDataIndividual] = useState([0,2,3])
  const IndividualdroneData = () => {
  const droneName = props.droneName;


  if (droneName === "Wasp AE") {
    setDroneDataIndividual(dronedata.find(d => d.name === "Wasp AE"));
  } else if (droneName === "MQ-9 Reaper") {
    setDroneDataIndividual(dronedata.find(d => d.name === "MQ-9 Reaper"));
  } else if (droneName === "RQ-4 Global Hawk") {
    setDroneDataIndividual(dronedata.find(d => d.name === "RQ-4 Global Hawk"));
  } else if (droneName === "ScanEagle") {
    setDroneDataIndividual(dronedata.find(d => d.name === "ScanEagle"));
  } else {
    setDroneDataIndividual(null);
  }
};

useEffect( () => {
  IndividualdroneData()

},[props.droneName])
  return (
    <div className="droneContainer">

        <div className='droneInfoSection'>
          <h2 className='droneInfoSectionData'>DATE: {props.date}</h2>
          <h2 className='droneInfoSectionData'>MISSION: {props.mission}</h2>
          <h2 className='droneInfoSectionData'>BASE LIFE: {props.baseLife}</h2>
          <h2 className='droneInfoSectionData'>DRONE NAME: {props.droneName}</h2>
          

        </div>

          <div className="droneImageContainer">
          <div className="wind-lines">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="wind-line"
                style={{
                  top: `${5 + i * 8}%`,
                  animationDelay: `-${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          <img
            className="drone_image"
            src={props.droneImage}
            alt="Drone"
        
          />
          <div className='reportsExportButtonsSection'>
            <button onClick={() => 
              batteryPrognosis()
              } 
              className='exportsButtonBatteryProg'
              >Battery Prognosis
            </button>

            <button onClick={() => setPopupShown(true)}

            className='exportsButton' >Drone Data</button> {/*popup screen of drone data*/}
           
          </div>

          <div className='toggleDrones'>

          </div>
        </div>
        
        
       <BatteryPrognosisPopup 
          shown={batteryPopupShowing} 
          data={props.BatteryLifeData}
          onClose={() => setBatteryPopupShowing(false)} 
          
        />

        <DroneDataPopup data ={droneDataIndividual}  shown={popupShown} onClose={() => setPopupShown(false)} />
    </div>
  );
}

export default Drone;
