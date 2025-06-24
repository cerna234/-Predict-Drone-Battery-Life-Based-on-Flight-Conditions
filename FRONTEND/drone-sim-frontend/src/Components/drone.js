
import './drone.css'

function Drone(props) {

  const clampedWind = Math.max(0.1, Math.min(props.windSpeed, 20));




 const duration = props.windSpeed > 0 ? Math.max(0.15, 3 / props.windSpeed) : 3;
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
            <button className='exportsButton'>Battery Prognosis</button>
            <button className='exportsButton'>Drone Data</button> {/*popup screen of drone data*/}
            <button className='exportsButton'>Location Data</button> {/*popup screen of location data including name, coordinates, current weather, etc*/}
          </div>

          <div className='toggleDrones'>

          </div>
        </div>
        
        
         
    </div>
  );
}

export default Drone;
