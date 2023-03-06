import React from "react";
import "./style.css";
import {ReactComponent as Nwt} from '../icons2/northwest_terretories.svg'
import {ReactComponent as Yk} from '../icons2/yukon.svg'
import {ReactComponent as Nu} from '../icons2/nunavut.svg'
import {ReactComponent as Bc} from '../icons2/british_columbia.svg'
//import sk from '../icons/saskatchewan.svg'
import {ReactComponent as Sk} from '../icons2/saskatchewan.svg'

import {ReactComponent as Mn} from '../icons2/manitoba.svg'
import {ReactComponent as On} from '../icons2/ontario.svg'
import {ReactComponent as Qu} from '../icons2/quebec.svg'
import {ReactComponent as Nb} from '../icons2/new_brunswick.svg'
import {ReactComponent as Ns} from '../icons2/nova_scotia.svg'
import {ReactComponent as Nl} from '../icons2/newfoundland_labrador.svg'
import {ReactComponent as Pei} from '../icons2/prince_edward_island.svg'
import {ReactComponent as Ab} from '../icons2/alberta.svg'
//import {ReactComponent as Alberta} from '../icons/north_west_terretories.svg';

class Map extends React.Component{
   
    constructor(props){
        super(props);
        this.socket = props.socket
        
    }
     
    render(){
        return (
          <div className = "canada-map-container">
               <Ab id = "ab" className = "province"/>
               <Sk id = "sk" className = "province"/>
               <Mn id = "mn" className = "province"/>
               <On id = "on" className = "province"/>
               <Qu id = "qu" className = "province"/>
               <Nb id = "nb" className = "province"/>
               <Ns id = "ns" className = "province"/>
               <Nl id = "nl" className = "province"/>
               <Pei id = "pei" className = "province"/>
               <Bc id = "bc" className = "province"/>
               <Nu id = "nu" className = "province"/>
               <Yk id = "yk" className = "province"/>
               <Nwt id = "nwt" className = "province"/>
            </div>
            
        )
    }
}

export default Map
