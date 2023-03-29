import React from "react";
import "./style.css";
import {ReactComponent as Nwt} from '../icons2/province_outlines/northwest_terretories.svg'
import {ReactComponent as Yk} from '../icons2/province_outlines/yukon.svg'
import {ReactComponent as Nu} from '../icons2/province_outlines/nunavut.svg'
import {ReactComponent as Bc} from '../icons2/province_outlines/british_columbia.svg'
//import sk from '../icons/saskatchewan.svg'
import {ReactComponent as Sk} from '../icons2/province_outlines/saskatchewan.svg'

import {ReactComponent as Mn} from '../icons2/province_outlines/manitoba.svg'
import {ReactComponent as On} from '../icons2/province_outlines/ontario.svg'
import {ReactComponent as Qu} from '../icons2/province_outlines/quebec.svg'
import {ReactComponent as Nb} from '../icons2/province_outlines/new_brunswick.svg'
import {ReactComponent as Ns} from '../icons2/province_outlines/nova_scotia.svg'
import {ReactComponent as Nl} from '../icons2/province_outlines/newfoundland_labrador.svg'
import {ReactComponent as Pei} from '../icons2/province_outlines/prince_edward_island.svg'
import {ReactComponent as Ab} from '../icons2/province_outlines/alberta.svg'  

import { MapContainer, TileLayer,Marker, Popup   } from 'react-leaflet'
//import AmenitiesSearcher from "../amenities/Amenities"
//import {ReactComponent as Alberta} from '../icons/north_west_terretories.svg';




import ab_flag from '../icons2/flags/ab.png';
import sk_flag from "../icons2/flags/sk.png";
import mn_flag from "../icons2/flags/mb.png";
import on_flag from "../icons2/flags/on.png";
import qu_flag from "../icons2/flags/qu.png";
import nb_flag from "../icons2/flags/nb.png";
import ns_flag from "../icons2/flags/ns.png";
import nl_flag from "../icons2/flags/newfl.png";
import yu_flag from "../icons2/flags/yk.png";
import nu_flag from "../icons2/flags/nu.png";
import nwt_flag from "../icons2/flags/nwt.png";
import pei_flag from "../icons2/flags/pei.png";
import bc_flag from "../icons2/flags/bc.png";


import popu from "../icons2/misc/popu.png";

import houses from "../icons2/misc/houses.png";
import stores from "../icons2/misc/stores.png";
import jobs from "../icons2/misc/jobs.png";
import schools from "../icons2/misc/schools.png";
import comsups from "../icons2/misc/comsups.png";
import cities from "../icons2/misc/cities.png";
import cityloc from "../icons2/misc/cityloc.png";
import favs from "../icons2/misc/fav.png";

import fs from "../icons2/misc/fullScreen.png";
import ufs from "../icons2/misc/unfullScreen.png";
import down from "../icons2/misc/down.png";
import up from "../icons2/misc/up.png";
import tax from "../icons2/misc/tax.png";
import acct from "../icons2/misc/account.png";

import ham from "../icons2/misc/hamburger.png";
import home from "../icons2/misc/hoe.png";
import add from "../icons2/misc/add.png";

class InteractiveMap extends React.Component{
   
    constructor(props){
        super(props);
        this.socket = props.socket
        this.state = {
            selectedIndex:-1,
            hoverIndex:-1,
            provincialInfo: [{name:"alberta", pop:4371000, flag: ab_flag,cities:[{name: "calgary", long: 51.049999, lat: -114.066666}],tax:5},{name:"saskatchewan", pop: 1174000, flag: sk_flag,cities:[{name: "moose jaw", long: 50.393333, lat:  -105.551941}],tax: 11},{name:"manitoba", pop: 1369000, flag: mn_flag,cities:[{name: "winnipeg", long: 49.895077, lat: -97.138451}],tax: 12},{name:"ontario", pop: 14570000, flag: on_flag,cities:[{name: "ottawa", long:  45.424721, lat: -75.695000}],tax: 13},{name:"quebec", pop: 8485000, flag: qu_flag,cities:[{name: "quebec city", long: 46.829853, lat: -71.254028}],tax: 14.975},{name:"new brunswick", pop: 776827, flag: nb_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 15},{name:"nova scotia", pop: 971395, flag: ns_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 15},{name:"newfoundland & labrador", pop: 521542, flag: nl_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 15},{name:"prince edward island", pop: 156947, flag: pei_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 15},{name:"british columbia", pop: 5071000, flag: bc_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 12},{name:"nunavut", pop: 38780, flag: nu_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 5},{name:"yukon", pop: 40232, flag: yu_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 5},{name:"northwest territories", pop: 44826, flag: nwt_flag,cities:[{name: "calgary", long: 51.0447, lat: 114.0719}],tax: 5}],
            selectedMenuIcon:-1,
            isMapFullScreen:false,
            isMapMenuExpanded:false,
            mapSideIcons: [houses,stores,jobs,schools,comsups,cities,favs,add],
            mapSelectedProvinceIcons:[popu,tax,cities],
            mapSelectedProvincelabels:['population','taxes','cities'],
            mapProvinceSelected: [Ab,Sk,Mn,On,Qu,Nb,Ns,Nl,Pei,Bc,Nu,Yk,Nwt],
            sideIcons: ['houses','stores','jobs','schools','community supports','cities', 'favorites','filter'],
            hasAccount:false,
            currentMenuHover:-1,
            changeMenu:true,
            canadaOrmap:true,
            hoverStyle:{position:'absolute',top:0,left:100,width:100,height:100,backgroundColor:"red"},
            mouseLoc: [0,0],
            displayedCities:[],
            cityLocations: [],
            bounds:[],
            offsets: [],
            hoverCityIndex:-1
        }
        this.socket.on('sendingCities', this.handleCitiesInProvince);
        this.socket.on('sendingBound', this.handleBounds);
    }
    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
      window.addEventListener("resize", null);
    }
    handleResize = (WindowSize, event) => {
        if (this.state.selectedIndex!=-1){
            this.socket.emit('getBounds',this.state.selectedIndex)
            this.socket.emit('getCities',this.state.selectedIndex)
        }
        
    }
    handleBounds = (data) =>{
        var b = [data[0].longmin,data[0].longmax,data[0].latmin,data[0].latmax]
        var off = [data[0].xoffset, data[0].yoffset]
        this.setState({bounds:b});
        this.setState({offsets:off});
        console.log("recieving bounds: ", b)
    }
    handleCitiesInProvince = (data) =>{
        console.log("recieved cities: ", data);
        this.setState({displayedCities:data});
        console.log("province info: ", this.state.selectedIndex)
        if (this.state.selectedIndex != -1){
            var div = document.getElementById(this.state.provincialInfo[this.state.selectedIndex].name);
            var bounding = div.childNodes[0].getBoundingClientRect();
            console.log("bounding box for prov: ",bounding);
            var xmin = bounding.x;
            var ymin = bounding.y;
            var xmax = bounding.x+bounding.width;
            var ymax = bounding.y+bounding.height;
            
            var xrange = bounding.width;
            var yrange = bounding.height;
            
            var longrange = Math.abs(this.state.bounds[1]-this.state.bounds[0]);
            var latrange = Math.abs(this.state.bounds[3]-this.state.bounds[2]);
            
            var pixperlong = xrange/longrange;
            var pixperlat = yrange/latrange;
            var tempcitylocations = [];
            console.log("testing bounds: ", this.state.bounds)
            for (var cnt = 0; cnt< data.length; cnt++){
                //console.log("testing:", data[cnt])
                var deltalong = Math.abs(data[cnt].Longitude - this.state.bounds[0]);
                var deltalat = Math.abs(data[cnt].Latitude - this.state.bounds[3]);
                console.log("delt long and lat: ", deltalong, deltalat)
                var cityx = xmin + deltalong*pixperlong;
                var cityy = ymin + deltalat*pixperlat;
                console.log(cityx,cityy);
                tempcitylocations.push([cityx-this.state.offsets[0],cityy-this.state.offsets[1]]);
                
            }
            this.setState({cityLocations:tempcitylocations});
            
            
        }
       // var testdiv = document.getElementById();
        //console.log(testdiv.childNodes[0].getBoundingClientRect())
    }
    changeMenu = (e,next) =>{
        //console.log(next);
        if (next== this.state.selectedMenuIcon){
             this.setState({changeMenu:true});
             this.setState({selectedMenuIcon:-1});
        }else{
             this.setState({selectedMenuIcon:next});
        }
       
        
        
    }
    getString = (Obj) =>{
        return Object.keys(Obj)[0]
    }
     
    get_province_name=(n)=>{
        if (this.state.selectedIndex == n){
                return ("province-selected")
        }else if(this.state.hoverIndex == n){
            return "province-hover"
        }else{
            return "province"
        } 
    }
    
    get_style = () =>{
        //console.log(this.state.mouseLoc);
        var s = {position:'fixed',top:this.state.mouseLoc[1],left:this.state.mouseLoc[0],width:110,height:"auto",backgroundColor:"black", pointerEvents:"none", opacity: "50%", borderRadius:"10px", overflow:"hidden"}
       return s;
    }
    updateMouse = (e) =>{
        
         this.setState({mouseLoc: [ e.clientX+5,e.clientY+5 ]});
    }
    handleMouseClickOnProvince = (e,i) => {
        this.setState({selectedIndex:i});
        this.socket.emit('getBounds',i)
        this.socket.emit('getCities',i)
        this.setState({hoverCityIndex:-1});
    }
    render(){
        return (
            <div className = "mcontainer">
               
            {this.state.canadaOrmap?
                
                <div className = "map-container">
                    
                {this.state.selectedIndex!=-1 ? 
                    <div className = "place-holder">
                        <div className = "menu-container">
                            <img src = {ham}></img>
                        </div>
                        <div className = "home-container">
                        
                        </div>
                        <div className = "top-menu-options">
                        {this.state. mapSelectedProvinceIcons.map((icon,i) => {
                            return(
                            <div className = "button-background">
                                <div className = "icon-container-menu">
                                <img src = {icon}></img>
                                </div>
                                <div className = "text-container-menu">
                                {this.state. mapSelectedProvincelabels[i]}
                                </div>
                                
                            </div>)
                            
                        })}
                        </div>
                        <div className = "provinceName">
                            
                            <div className = "sProvinceCont">
                                
                              
                                <div className="sProvName">
                                {this.state.provincialInfo[this.state.selectedIndex].name}
                                </div>
                                 <div className = "sPopHolder">
                                 {this.state.provincialInfo[this.state.selectedIndex].pop}
                                 </div>
                                 
                                 <div className = "sCityInfo">
                                {this.state.hoverCityIndex!=-1 ? this.state.displayedCities[this.state.hoverCityIndex].Name : ""}
                                 </div>
                            </div>
                        </div>
                    
                        </div>:<div></div>
                        
                        
                    }
                    
                    
                    
               
                
               
                
                
                 <Ab id = "alberta" className = {this.get_province_name(0)} onClick={(e) => this.handleMouseClickOnProvince(e,0)}
                       onMouseEnter = {() => {this.setState({hoverIndex:0})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}}
                      onMouseMove = { (e) => this.updateMouse(e)}>
                      
                     
                </Ab>
                
                <Sk id = "saskatchewan" className =  {this.get_province_name(1)} onClick={(e) => this.handleMouseClickOnProvince(e,1)}
                       onMouseEnter = {() => {this.setState({hoverIndex:1})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}> </Sk>
                    <Mn id = "manitoba" className = {this.get_province_name(2)} onClick={(e) => this.handleMouseClickOnProvince(e,2)}
                        onMouseEnter = {() => {this.setState({hoverIndex:2})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <On id = "ontario" className = {this.get_province_name(3)} onClick={(e) => this.handleMouseClickOnProvince(e,3)}
                         onMouseEnter = {() => {this.setState({hoverIndex:3})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Qu id = "quebec" className = {this.get_province_name(4)} onClick={(e) => this.handleMouseClickOnProvince(e,4)}
                         onMouseEnter = {() => {this.setState({hoverIndex:4})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Nb id = "new brunswick" className = {this.get_province_name(5)} onClick={(e) => this.handleMouseClickOnProvince(e,5)}
                        onMouseEnter = {() => {this.setState({hoverIndex:5})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Ns id = "nova scotia" className = {this.get_province_name(6)} onClick={(e) => this.handleMouseClickOnProvince(e,6)}
                       onMouseEnter = {() => {this.setState({hoverIndex:6})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Nl id = "newfoundland & labrador" className = {this.get_province_name(7)} onClick={(e) => this.handleMouseClickOnProvince(e,7)}
                       onMouseEnter = {() => {this.setState({hoverIndex:7})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Pei id = "prince edward island" className = {this.get_province_name(8)} onClick={(e) => this.handleMouseClickOnProvince(e,8)}
                      onMouseEnter = {() => {this.setState({hoverIndex:8})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Bc id = "british columbia" className = {this.get_province_name(9)} onClick={(e) => this.handleMouseClickOnProvince(e,9)}
                        onMouseEnter = {() => {this.setState({hoverIndex:9})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Nu id = "nunavut" className = {this.get_province_name(10)} onClick={(e) => this.handleMouseClickOnProvince(e,10)}
                       onMouseEnter = {() => {this.setState({hoverIndex:10})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Yk id = "yukon" className = {this.get_province_name(11)} onClick={(e) => this.handleMouseClickOnProvince(e,11)}
                        onMouseEnter = {() => {this.setState({hoverIndex:11})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                    <Nwt id = "northwest territories" className = {this.get_province_name(12)} onClick={(e) => this.handleMouseClickOnProvince(e,12)}
                        onMouseEnter = {() => {this.setState({hoverIndex:12})}} onMouseLeave = {() => {this.setState({hoverIndex:-1})}} onMouseMove = { (e) => this.updateMouse(e)}/>
                
                
                
                      {this.state.hoverIndex!=-1 && this.state.hoverIndex!=this.state.selectedIndex? <div id = "province-info-hover" style = {this.get_style()}>
                       
                        <div className = "hover-info-bulk">
                            {this.state.provincialInfo[this.state.hoverIndex].name}
                            <div className = "hover-info-pop">
                                {this.state.provincialInfo[this.state.hoverIndex].pop}
                            </div>
                        </div>
                       <div className = "hover-info-header">
                            <img src = {this.state.provincialInfo[this.state.hoverIndex].flag}></img>
                        </div>
                      </div>: <div></div>}   
                      
                      
                       {this.state.cityLocations.map((loc,i) => {
                           if (i == this.state.hoverCityIndex){
                                return(
                           <div className = 'citiesContainer' style ={{position:'fixed', top: loc[1], left: loc[0],height:'15px', width: '15px', zIndex:100000, background:"crimson", borderRadius:"50%", border: "1px solid white"}} onClick={(e) => this.setState({hoverCityIndex:i})} title = {this.state.displayedCities[i].Name}>
                            <img src = {cities} style ={{position:'fixed', top: loc[1]+2, left: loc[0]+2.5,height:'11px', width: '12px', zIndex:100000, filter: 'invert(1)'}} ></img>
                           </div>
                          
                           
                            )
                            }else{
                                return(
                           <div className = 'citiesContainer' style ={{position:'fixed', top: loc[1], left: loc[0],height:'15px', width: '15px', zIndex:100000, background:"gray", borderRadius:"50%", border: "1px solid white"}} onClick={(e) => this.setState({hoverCityIndex:i})}  title = {this.state.displayedCities[i].Name}>
                            <img src = {cities} style ={{position:'fixed', top: loc[1]+2, left: loc[0]+2.5,height:'11px', width: '12px', zIndex:100000, filter: 'invert(1)'}} ></img>
                           </div>)
                            }
                            
                          })}
                      
                </div>: 
                
                <div className = "map-container">
                    <div className = "menu-container">
                    <img src = {ham}></img>
                    </div>
                     <div className = "home-container">
                    <img src = {home}></img>
                    </div>
                    <div className = "top-menu-options">
                    {this.state.mapSideIcons.map((icon,i) => {return(
                        <div className = "button-background">
                            <div className = "icon-container-menu">
                            <img src = {icon}></img>
                            </div>
                            <div className = "text-container-menu">
                             {this.state.sideIcons[i]}
                            </div>
                            
                        </div>)
                        
                    })}
                    </div>
                         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                    <MapContainer className = "map" center={[ 51.509865,  -0.118092]} zoom={13}
                        attributionControl = {false} zoomControl = {false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
                
                    
                }
               
                
            </div>
        )
    }
}

export default InteractiveMap
