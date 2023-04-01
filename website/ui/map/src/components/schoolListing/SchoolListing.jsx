import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
class SchoolListing extends React.Component{
    constructor(props){
        super(props);
        this.socket = props.socket;
        this.state = {
            selected: props.selected,
            info:props.info
        }
    }
    
    render(){
        return(
            <div>
            
            </div>
        )
    }
}

export default SchoolListing
