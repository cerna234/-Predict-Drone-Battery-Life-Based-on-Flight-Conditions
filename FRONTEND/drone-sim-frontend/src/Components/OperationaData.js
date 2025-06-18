

import Drone from "./drone";
import './OperationData.css'

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
function OperationData() {
  return (
    <div className="OperationDataContainer">
        <div className="statsCircle">

            <div className="statsLeft">
              <div className="missionSpecificStatContainer" style={{left:"40px"}}>
                <h2 className="dataIcon">Z</h2>
                <h2 className="missionSpecificStat"  >338</h2> {/* TEmp_humdity */}   
              </div>

               <div className="missionSpecificStatContainer" style={{right:"80px"}} >
                  <h2 className="dataIcon">B</h2>
                 <h2 className="missionSpecificStat" > 38.3</h2>
              </div>

               <div className="missionSpecificStatContainer" style={{right:"80px"}} >
                  <h2 className="dataIcon">A</h2>
                 <h2 className="missionSpecificStat" >3884</h2>
              </div>

               <div className="missionSpecificStatContainer" style={{left:"60px"}} >
                  <h2 className="dataIcon">P</h2>
                  <h2 className="missionSpecificStat"  >0.3</h2>
              </div>

              
            </div>

            <Drone></Drone>

            <div className="statsRight">
              <div className="missionSpecificStatContainer" style={{right:"40px"}}>
              
                <h2 className="missionSpecificStat"  >338</h2> {/* TEmp_humdity */} 
                <h2 className="dataIcon">D</h2>  
              </div>

               <div className="missionSpecificStatContainer" style={{left:"80px"}} >
              
                 <h2 className="missionSpecificStat" > 38.3</h2>
                 <h2 className="dataIcon">I</h2>
              </div>

               <div className="missionSpecificStatContainer" style={{left:"80px"}} >
   
                 <h2 className="missionSpecificStat" >3884</h2>
                 <h2 className="dataIcon">L</h2>
              </div>

               <div className="missionSpecificStatContainer" style={{right:"40px"}} >
               
                    <h2 className="missionSpecificStat"  >0.3</h2>
                    <h2 className="dataIcon">N</h2>
              </div>

              
            </div>
        </div>
        
    </div>
  );
}

export default OperationData;
