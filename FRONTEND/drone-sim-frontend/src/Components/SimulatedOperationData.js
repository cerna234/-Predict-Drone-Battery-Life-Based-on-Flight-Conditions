

import Drone from "./drone";
import './OperationData.css'
import React, { useState, useEffect } from 'react';




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
function SimulatedOperationData() {

      


  return (
    <div className="OperationDataContainer">
      
    
        

         
              <div  className="statsCirtcleContainer">

                <div className="statsCircle">
                

                  <div className="statsLeft">
                    <div className="missionSpecificStatContainer" style={{ left: "40px" }}>
                   
                      <input></input>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "80px" }}>
                      <h2 className="dataIcon">B</h2>
                       <input></input>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "80px" }}>
                      <h2 className="dataIcon">A</h2>
                       <input></input>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "60px" }}>
                      <h2 className="dataIcon">P</h2>
                       <input></input>
                    </div>
                  </div>

                  <Drone />

                  <div className="statsRight">
                    <div className="missionSpecificStatContainer" style={{ right: "40px" }}>
                      <input></input>
                      <h2 className="dataIcon">D</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "80px" }}>
                       <input></input>
                      <h2 className="dataIcon">I</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ left: "80px" }}>
                       <input></input>
                      <h2 className="dataIcon">L</h2>
                    </div>

                    <div className="missionSpecificStatContainer" style={{ right: "40px" }}>
                       <input></input>
                      <h2 className="dataIcon">N</h2>
                    </div>
                  </div>
                </div>

                

              </div>
            
                    
          
          
          
          
        
        
    </div>
  );
}

export default SimulatedOperationData;
