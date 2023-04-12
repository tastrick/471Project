import React from "react";
import "./style.css";
import { MapContainer, TileLayer } from 'react-leaflet'
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
class Amenities extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex : props.selected,
            selectedCity: props.selectedCs,
            provincialInfo:props.proInfo,
            
        }
     
    }
   
    render(){
        return(
           
            <div className= "amenities-container">
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                  <MapContainer className = "map" center={[ 51.049999, -114.066666]} zoom={9}
                 style={{ width: '100%', height: '900px'}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            
        )
        
    }

}
export default Amenities
