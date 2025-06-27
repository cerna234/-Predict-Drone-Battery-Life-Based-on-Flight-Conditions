
import { useState } from 'react';
import BatteryPrognosisPopup from './batteryPrognosisPopup'
import './drone.css'


function Drone(props) {

  const [batteryPopupShowing, setBatteryPopupShowing] = useState(false)
  const batteryPrognosis = () => {
    console.log(batteryPopupShowing)
      if(batteryPopupShowing == true){
        setBatteryPopupShowing(false)
      }
      else{
        setBatteryPopupShowing(true)
      }
  }
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
                  animationDelay: `${i * 0.4}s`,
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

            <button className='exportsButton'>Drone Data</button> {/*popup screen of drone data*/}
            <button className='exportsButton'>Location Data</button> {/*popup screen of location data including name, coordinates, current weather, etc*/}
          </div>

          <div className='toggleDrones'>

          </div>
        </div>
        
        
       <BatteryPrognosisPopup 
          shown={batteryPopupShowing} 
          data={props.BatteryLifeData}
          onClose={() => setBatteryPopupShowing(false)} 
          
        />
    </div>
  );
}

export default Drone;
