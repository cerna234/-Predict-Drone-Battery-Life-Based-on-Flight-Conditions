
import './drone.css'

function Drone(props) {
  return (
    <div className="drone_container">

        <img className="drone_image" src="https://static.vecteezy.com/system/resources/previews/011/178/724/non_2x/unmanned-drone-isolated-on-white-background-with-clipping-path-elements-of-this-image-furnished-by-nasa-free-png.png"></img>
        <h2 style={{color:"red"}}>HOUR: {props.hour}</h2>
        <h2 style={{color:"red"}}>Mission: {props.mission}</h2>
        <h2  style={{color:"red"}}>Battery Life Expentancy: {props.batteryExpectancy}</h2>
    </div>
  );
}

export default Drone;
