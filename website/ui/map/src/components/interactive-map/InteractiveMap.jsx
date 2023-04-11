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


import { DivIcon } from 'leaflet';
import { MapContainer, TileLayer,Marker, Popup} from 'react-leaflet'
//import AmenitiesSearcher from "../amenities/Amenities"
//import {ReactComponent as Alberta} from '../icons/north_west_terretories.svg';

//import Leaflet from 'leaflet'

//import listings for map view when we need it
import HouseListing from "../houseListing/HouseListing";
import JobListing from "../jobListing/JobListing";
import SchoolListing from "../schoolListing/SchoolListing";
import StoreListing from "../storeListing/StoreListing";
import CsListing from "../csListing/CsListing";

import AddHome from "../addHome/AddHome";

import AddCity from "../addCity/AddCity";
import AddJob from "../addJob/AddJob";
import AddSchool from "../addSchool/AddSchool";
import AddStore from "../addStore/AddStore";
import AddComSup from "../addComSup/AddComSup";

import L from 'leaflet';

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
import info from "../icons2/misc/info.png";
import houses from "../icons2/misc/houses.png";
import stores from "../icons2/misc/stores.png";
import jobs from "../icons2/misc/jobs.png";
import schools from "../icons2/misc/schools.png";
import comsups from "../icons2/misc/comsups.png";
import cities from "../icons2/misc/cities.png";
import cityloc from "../icons2/misc/cityloc.png";
import favs from "../icons2/misc/fav.png";
import edit from "../icons2/misc/edit.png";
import deleteListing from "../icons2/misc/delete.png";

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
            mapSideIcons: [houses,jobs,schools,stores, comsups,favs,add],
            mapSelectedProvinceIcons:[popu,tax,cities,info],
            mapSelectedProvincelabels:['population','taxes','cities', 'provincial supports'],
            mapProvinceSelected: [Ab,Sk,Mn,On,Qu,Nb,Ns,Nl,Pei,Bc,Nu,Yk,Nwt],
            sideIcons: ['homes','jobs','schools','stores','community supports', 'favorites','filter'],
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
            hoverCityIndex:-1,
            selectedTopIndex:-1,
            menuColapsed:true,
            cityNums:[],
            cityPops:[],
            mapInfo:[],
            allCityAmmenities:[],//houses,jobs,schools,stores,comsups
           hs:[],
           js:[],
           schs:[],
           strs:[],
           comsu:[],
           userType:'admin',// this can be guest, user, or admin, guests wont be allowed to favorite or add, users wont be allowed to add and admin have all capabilities
          selectedAmmenity:[0,0],
          markerStyle:{filter:"invert(0.5)"},
          editingListings:false,
          adding:false,
          displayedCity:-1,
          editCity:false,
          addingCity:false
           
             
           
        }
        this.test = [];
        this.socket.on('sendingCities', this.handleCitiesInProvince);
        this.socket.on('sendingBound', this.handleBounds);
        this.socket.on('sendingCityNums', this.handleNums);
        this.socket.on('sendingPops', this.handlePops);
        this.socket.on('sendingAllAmmenities', this.handleAmmenities);
        this.listingRef = React.createRef();
    }
    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
      window.addEventListener("resize", null);
    }
    handleAmmenities = (data) =>{
        console.log('recieving stuff :', data)
        this.setState({hs:data[0]});
        this.setState({js:data[1]});
        this.setState({schs:data[2]});
        this.setState({strs:data[3]});
        this.setState({comsu:data[4]});
       // console.log(data[0][0])
        this.setState({allCityAmmenities:data});
       // console.log("all of it :",this.state.allCityAmmenities)
        this.test = data;
    }
    handleResize = (WindowSize, event) => {
        if (this.state.selectedIndex!=-1){
            this.socket.emit('getBounds',this.state.selectedIndex)
            this.socket.emit('getCities',this.state.selectedIndex)
        }
        
    }
    handlePops = (data) =>{
        var tr = this.state.cityPops
        tr.push(data[0].population);
       // console.log("recieved pops: ",data[0].population)
        this.setState({cityPops:tr});
    }
    handleNums = (data) =>{
        //console.log("recieved nums: ", data)
        //var keys = Object.keys(data);
       let t = []
        for (let k in data) {
            for (let k2 in data[k]){
                //console.log("data out:",data[k][k2])
                t.push(data[k][k2]);
            }
            
        }
        
       // console.log("recieved nums: ",data);
        var temp = this.state.cityNums;
        temp.push(t);
      //  console.log("length: ",temp.length);
        this.setState({cityNums:temp});
    }
    handleBounds = (data) =>{
        var b = [data[0].longmin,data[0].longmax,data[0].latmin,data[0].latmax]
        var off = [data[0].xoffset, data[0].yoffset]
        this.setState({bounds:b});
        this.setState({offsets:off});
       // console.log("recieving bounds: ", b)
    }
    handleCitiesInProvince = (data) =>{
        
        //console.log("recieved cities: ", data);
        this.setState({displayedCities:data});
        //console.log("province info: ", this.state.selectedIndex)
        if (this.state.selectedIndex != -1 && this.state.canadaOrmap){
            var div = document.getElementById(this.state.provincialInfo[this.state.selectedIndex].name);
            var bounding = div.childNodes[0].getBoundingClientRect();
            //console.log("bounding box for prov: ",bounding);
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
            //console.log("testing bounds: ", this.state.bounds)
            for (var cnt = 0; cnt< data.length; cnt++){
                //console.log("testing:", data[cnt])
                var deltalong = Math.abs(data[cnt].Longitude - this.state.bounds[0]);
                var deltalat = Math.abs(data[cnt].Latitude - this.state.bounds[3]);
                //console.log("delt long and lat: ", deltalong, deltalat)
                var cityx = xmin + deltalong*pixperlong;
                var cityy = ymin + deltalat*pixperlat;
                //console.log(cityx,cityy);
                tempcitylocations.push([cityx-this.state.offsets[0],cityy-this.state.offsets[1]]);
                console.log('sending for city info')
                this.socket.emit('getCityNumsfromCity',data[cnt].Name);
                this.socket.emit('getpops',data[cnt].Name);
                
            }
            this.setState({cityLocations:tempcitylocations});
            //this.forceUpdate()
            
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
    handleAddingAmmenity = (ammenityInfo) =>{
       // console.log('sending ammenity request', ammenityInfo)
        if (this.state.selectedTopIndex==0){//house
            var info = {
                ammenityType:0,
                type:ammenityInfo.type,
                rent:ammenityInfo.rent,
                bedn:ammenityInfo.bedn,
                bathn:ammenityInfo.bathn,
                lat:ammenityInfo.lat,
                long:ammenityInfo.long,
                squareFootage: ammenityInfo.size,
                link:ammenityInfo.link,
                description: ammenityInfo.des,
                city: this.state.displayedCities[this.state.displayedCity].Name,
                cityLong: this.state.mapInfo[0],
                cityLat: this.state.mapInfo[1]
            }
      
            
        }else if(this.state.selectedTopIndex ==1){//job
            var info = {
                ammenityType:1,
                type:ammenityInfo.type,
                salary:ammenityInfo.salary,
                time:ammenityInfo.time,
                employer:ammenityInfo.employer,
                lat:ammenityInfo.lat,
                long:ammenityInfo.long,
                remote: ammenityInfo.remote,
                link:ammenityInfo.link,
                description: ammenityInfo.des,
                start:ammenityInfo.start,
                due:ammenityInfo.due,
                city: this.state.displayedCities[this.state.displayedCity].Name,
                cityLong: this.state.mapInfo[0],
                cityLat: this.state.mapInfo[1]
            }
        }else if(this.state.selectedTopIndex ==2){//school
            var info = {
                ammenityType:2,
                type:ammenityInfo.type,
                lat:ammenityInfo.lat,
                long:ammenityInfo.long,
                minGrade: ammenityInfo.minGrade,
                link:ammenityInfo.link,
                maxGrade: ammenityInfo.maxGrade,
                city: this.state.displayedCities[this.state.displayedCity].Name,
                cityLong: this.state.mapInfo[0],
                cityLat: this.state.mapInfo[1]
            }
            
        }else if(this.state.selectedTopIndex ==3){//store
            var info = {
                ammenityType:3,
                type:ammenityInfo.type,
                lat:ammenityInfo.lat,
                long:ammenityInfo.long,
                merch: ammenityInfo.merch,
                link:ammenityInfo.link,
                city: this.state.displayedCities[this.state.displayedCity].Name,
                cityLong: this.state.mapInfo[0],
                cityLat: this.state.mapInfo[1]
            }
            
        }else if(this.state.selectedTopIndex==4){//community support
            var info = {
                ammenityType:4,
                type:ammenityInfo.type,
                lat:ammenityInfo.lat,
                long:ammenityInfo.long,
                offering: ammenityInfo.offering,
                link:ammenityInfo.link,
                city: this.state.displayedCities[this.state.displayedCity].Name,
                cityLong: this.state.mapInfo[0],
                cityLat: this.state.mapInfo[1]
            }
        }
        //console.log('sending server:',info)
        this.socket.emit('addAmmenity',info);
        this.socket.emit('getAllAmmenities',this.state.displayedCities[this.state.displayedCity].Name);
    }
    getString = (Obj) =>{
        return Object.keys(Obj)[0]
    }
     removeCity = (e,index) =>{
         console.log('wanting to delete:', this.state.displayedCities[index].Name)
         this.socket.emit('deleteCity',this.state.displayedCities[index].Name);
         this.socket.emit('getCities',this.state.selectedIndex)
         //this.socket.emit('getCities',this.state.selectedIndex);
         //this.socket.emit('getBounds',this.state.selectedIndex)
         this.setState({hoverCityIndex:-1});
        this.setState({selectedTopIndex:2});
        this.setState({menuColapsed:false});
        this.setState({cityNums:[]});
        this.setState({cityPops:[]});
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
    handleListingClick = (e,i,type) =>{
        console.log("inside click house",i)
        this.setState({selectedAmmenity:[type,i]})
    }
    handleAddCity = (e) =>{// when add button clicked as admin
        this.setState({addingCity:true});
    }
    handleEditCityClick = (e) =>{
        if (this.state.editCity){
            this.setState({editCity:false});
        }else{
            this.setState({editCity:true});
        }
    }
    handleAddingCity = (info) =>{
       
        var tosend = {
            name:info.name,
            lat:info.lat,
            long:info.long,
            pop:info.pop,
            plat:this.state.displayedCities[0].PTLatitude,
            plong:this.state.displayedCities[0].PTLongitude,
            pname:this.state.displayedCities[0].PTName
        }
         var c = this.socket.emit('addCity',tosend);
         this.socket.emit('getCities',this.state.selectedIndex);
         //this.socket.emit('getBounds',this.state.selectedIndex)
         this.setState({hoverCityIndex:-1});
        this.setState({selectedTopIndex:2});
        this.setState({menuColapsed:false});
        this.setState({cityNums:[]});
        this.setState({cityPops:[]});
    }
    handleEditListingClick = (e) =>{
        
        if (this.state.editingListings){
            this.setState({editingListings:false});
            console.log('editing false')
            //this.listingRef.current.updateEditingState(false);
        }else{
            this.setState({editingListings:true});
            console.log('editing true')
            //this.listingRef.current.updateEditingState(true);
        }
        var t = this.state.selectedAmmenity
        this.setState({selectedAmmenity:-1});
        this.setState({selectedAmmenity:t});
     
    }
    
    get_style = () =>{
        //console.log(this.state.mouseLoc);
        var s = {position:'fixed',top:this.state.mouseLoc[1],left:this.state.mouseLoc[0],width:110,height:"auto",backgroundColor:"black", pointerEvents:"none", opacity: "50%", borderRadius:"10px", overflow:"hidden"}
       return s;
    }
    updateMouse = (e) =>{
        
         this.setState({mouseLoc: [ e.clientX+5,e.clientY+5 ]});
    }
    handleClickAmmenity = (e) =>{
        this.setState({adding:true});
        //console.log("here")
    }
    deleteListing = (e,first,second) =>{
        console.log("deleteing listing: ",first,second);
        e.stopPropagation();
        if (second == 0){//house
            //console.log('attempting to delete house: ', this.state.hs[first])
            var info = {ammenityType:0,id:this.state.hs[first].IDNumber}
            
            this.socket.emit('deleteAmmenity', info);
            this.setState({hs: this.state.hs.filter(function(hou,i) { 
            return i !== first 
            })})
           
        }else if (second == 1){//job
             var info = {ammenityType:1,id:this.state.js[first].IDNumber}
            this.socket.emit('deleteAmmenity', info);
            this.setState({js: this.state.js.filter(function(hou,i) { 
            return i !== first 
            })})
        }else if (second == 2){//schools
            var info = {ammenityType:2,id:this.state.schs[first].IDNumber}
            this.socket.emit('deleteAmmenity', info);
            this.setState({schs: this.state.schs.filter(function(hou,i) { 
            return i !== first 
            })})
            
        }else if (second == 3){//stores
            var info = {ammenityType:3,id:this.state.strs[first].IDNumber}
            this.socket.emit('deleteAmmenity', info);
            this.setState({strs: this.state.strs.filter(function(hou,i) { 
            return i !== first 
            })})
        }else if (second == 4){//com sups
            var info = {ammenityType:4,id:this.state.comsu[first].IDNumber}
            this.socket.emit('deleteAmmenity', info);
             this.setState({comsu: this.state.comsu.filter(function(hou,i) { 
            return i !== first 
            })})
        }
    }
    handleAddExit = () =>{
        this.setState({adding:false});
        this.setState({addingCity:false});
        console.log("exiting adding")
    }
    handleMouseClickOnProvince = (e,i) => {
        this.setState({selectedIndex:i});
        this.socket.emit('getBounds',i)
        this.socket.emit('getCities',i)
        this.setState({hoverCityIndex:-1});
        this.setState({selectedTopIndex:2});
        this.setState({menuColapsed:false});
        this.setState({cityNums:[]});
        this.setState({cityPops:[]});
        //this.setState({selectedTopIndex:-1});
    }
    handleExploreClick = (e,i) =>{
        this.setState({displayedCity:i});
        this.socket.emit('getAllAmmenities',this.state.displayedCities[i].Name);
        var mapStuff = [];
        mapStuff.push(this.state.displayedCities[i].Longitude);
        mapStuff.push(this.state.displayedCities[i].Latitude);
        this.setState({mapInfo:mapStuff});
        this.setState({canadaOrmap:false});
       // this.setState({selectedIndex:-1});
        this.setState({selectedTopIndex:-1});
        this.setState({menuColapsed:true})
        
    }
    handleHomeClick = (e) =>{
        this.setState({mapInfo:[]});
        this.setState({canadaOrmap:true});
       // this.setState({selectedIndex:-1});
        this.setState({selectedTopIndex:2});
    }
    render(){
       
       const hou = new L.Icon({
           className:'marker-unselected',
            iconUrl: houses,
            iconRetinaUrl: houses,
            popupAnchor:  [-0, -0],
            iconSize: [15,15]
        });
       const hos = new L.Icon({
           className:'marker-selected',
            iconUrl: houses,
            iconRetinaUrl: houses,
            popupAnchor:  [-0, -0],
            iconSize: [15,15]
        });
       const hog = new L.Icon({
           className:'marker-groupselected',
            iconUrl: houses,
            iconRetinaUrl: houses,
            popupAnchor:  [-0, -0],
            iconSize: [15,15]
        });
       const jou = new L.Icon({
           className:'marker-unselected',
            iconUrl: jobs,
            iconRetinaUrl: jobs,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const jos = new L.Icon({
           className:'marker-selected',
            iconUrl: jobs,
            iconRetinaUrl: jobs,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const jog = new L.Icon({
           className:'marker-groupselected',
            iconUrl: jobs,
            iconRetinaUrl: jobs,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const stou = new L.Icon({
           className:'marker-unselected',
            iconUrl: stores,
            iconRetinaUrl: stores,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const stos = new L.Icon({
           className:'marker-selected',
            iconUrl: stores,
            iconRetinaUrl: stores,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const stog = new L.Icon({
           className:'marker-groupselected',
            iconUrl: stores,
            iconRetinaUrl: stores,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const schou = new L.Icon({
           className:'marker-unselected',
            iconUrl: schools,
            iconRetinaUrl: schools,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
        const schos = new L.Icon({
           className:'marker-selected',
            iconUrl: schools,
            iconRetinaUrl: schools,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
         const schog = new L.Icon({
           className:'marker-groupselected',
            iconUrl: schools,
            iconRetinaUrl: schools,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const comsu = new L.Icon({
           className:'marker-unselected',
            iconUrl: comsups,
            iconRetinaUrl: comsups,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const comss = new L.Icon({
           className:'marker-selected',
            iconUrl: comsups,
            iconRetinaUrl: comsups,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
       const comsg = new L.Icon({
           className:'marker-groupselected',
            iconUrl: comsups,
            iconRetinaUrl: comsups,
            popupAnchor:  [-0, -0],
            iconSize: [15,15],     
        });
      // const all = [ho,jo,scho,sto,coms];
        return (
            <div className = "mcontainer">
               
            {this.state.canadaOrmap?
                
                <div className = "map-container">
                    
                {this.state.selectedIndex!=-1 ? 
                    <div className = "place-holder">
                        {this.state.selectedTopIndex!=-1 && !this.state.menuColapsed ? 
                            <div className = "menu-container-selected" onClick = {(e) =>{if (this.state.menuColapsed){ this.setState({menuColapsed:false})}else{
                                this.setState({menuColapsed:true})
                            }}}>
                            <img src = {ham} ></img>
                        </div>: <div className = "menu-container" onClick = {(e) =>{if (this.state.menuColapsed){ this.setState({menuColapsed:false})}else{
                                this.setState({menuColapsed:true})
                            }}}>
                            <img src = {ham}></img>
                        </div>
                        }
                        
                        <div className = "home-container">
                        
                        </div>
                        <div className = "top-menu-options">
                        {this.state. mapSelectedProvinceIcons.map((icon,i) => {
                            if (i == this.state.selectedTopIndex){
                                return(
                                <div className = "button-background-selected">
                                    <div className = "icon-container-menu">
                                    <img src = {icon}></img>
                                    </div>
                                    <div className = "text-container-menu">
                                {this.state. mapSelectedProvincelabels[i]}
                                </div>
                                </div>)
                            }else{
                            return(
                            <div className = "button-background" onClick = {(e) =>{this.setState({selectedTopIndex:i}); console.log("here")}}>
                                <div className = "icon-container-menu">
                                <img src = {icon}></img>
                                </div>
                                <div className = "text-container-menu">
                                {this.state. mapSelectedProvincelabels[i]}
                                </div>
                                
                            </div>)}
                            
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
                                 
                                 
                            </div>
                        </div>
                    
                        {this.state.selectedIndex!=-1&& !this.state.menuColapsed? 
                            <div className = "side-menu-container-open">
                                <div className = "side-menu-header">
                                <div className = 'title2'>
                                 {this.state.mapSelectedProvincelabels[this.state.selectedTopIndex]}
                                </div>
                                {
                                    this.state.userType=='admin' && this.state.selectedTopIndex==2 ? <div className = 'edit-container'>
                                    <div className = 'add-container' title = 'add city' onClick = {(e) => this.handleAddCity(e)}>
                                    <img src = {add}></img>
                                    </div>
                                    <div className = 'delete-listing-container' onClick = {(e) => this.handleEditCityClick(e)}>
                                        <img src = {edit}></img>
                                    </div>
                                </div> : <div className = 'edit-container'></div>
                                }
                               
                                </div>
                                <div className = 'all-menu-contents'>
                                {this.state.selectedTopIndex==2 ? this.state.displayedCities.map((cityInfo,cn) => {
                                    if (cn == this.state.hoverCityIndex){
                                         return(
                                        
                                        <div className="cityInfoContainer-selected" >
                                        
                                        {this.state.editCity ? <div className = 'editing'>
                                            <div className = 'exitIcon-container' onClick ={(e) => this.removeCity(e,cn)}>
                                            <img src = {deleteListing}></img>
                                            </div>
                                        
                                            </div>:null}
                                        
                                            <div className = "cityNameContainer">
                                                <div className = "cityname">
                                                {this.state.displayedCities[cn].Name}
                                                </div>
                                                <div className = "citypop">
                                                { this.state.cityPops.length!=0 && this.state.cityPops.length>cn ? this.state.cityPops[cn]: ""}
                                                </div>
                                            </div>
                                            <div className = "cityExtraInfo">
                                                <div className = "cityHouseCount" title = "houses">
                                                    <div className = "cityIconContainer">
                                                        <img src = {houses}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][0]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityJobCount" title = "jobs">
                                                    <div className = "cityIconContainer">
                                                    <img src = {jobs}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][1]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "citySchoolCount" title = "schools">
                                                    <div className = "cityIconContainer">
                                                    <img src = {schools}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                   {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][3]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityStoreCount" title = "stores">
                                                    <div className = "cityIconContainer">
                                                    <img src = {stores}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][2]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityComSupportCount" title = "community supports">
                                                    <div className = "cityIconContainer">
                                                    <img src = {comsups}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                   {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][4]: ""}
                                                    </div>
                                                
                                                </div>
                                                <div className = "cityExploreButton" onClick ={(e) => this.handleExploreClick(e,cn)}> <div className = 'buttonTextContainer'>Explore City</div></div>
                                            
                                            </div>
                                        </div>
                                       
                                    )
                                    }else{
                                        return(
                                            
                                            <div className="cityInfoContainer-unselected" onClick = {(e) => {this.setState({hoverCityIndex:cn})}}>
                                            
                                            {this.state.editCity ? <div className = 'editing'>
                                                <div className = 'exitIcon-container' onClick ={(e) => this.removeCity(e,cn)}>
                                                <img src = {deleteListing}></img>
                                                </div>
                                                
                                                </div>:null}
                                            
                                            
                                                <div className = "cityNameContainer">
                                                    <div className = "cityname">
                                                    {this.state.displayedCities[cn].Name}
                                                    </div>
                                                    <div className = "citypop">
                                                    { this.state.cityPops.length!=0 && this.state.cityPops.length>cn ? this.state.cityPops[cn]: ""}
                                                    </div>
                                                </div>
                                            <div className = "cityExtraInfo">
                                                <div className = "cityHouseCount" title = "houses">
                                                    <div className = "cityIconContainer">
                                                        <img src = {houses}></img>
                                                    
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][0]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityJobCount" title = "jobs">
                                                    <div className = "cityIconContainer">
                                                    <img src = {jobs}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][1]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "citySchoolCount" title = "schools">
                                                    <div className = "cityIconContainer">
                                                    <img src = {schools}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                   {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][3]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityStoreCount" title = "stores">
                                                    <div className = "cityIconContainer">
                                                    <img src = {stores}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                    {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][2]: ""}
                                                    </div>
                                                
                                                </div>
                                                 <div className = "cityComSupportCount" title = "community supports">
                                                    <div className = "cityIconContainer">
                                                    <img src = {comsups}></img>
                                                    </div>
                                                    <div className = "cityNumberContainer">
                                                   {this.state.cityNums.length!=0 && cn < this.state.cityNums.length ? this.state.cityNums[cn][4]: ""}
                                                    </div>
                                                
                                                </div>
                                                <div className = "cityExploreButton" onClick ={(e) => this.handleExploreClick(e,cn)}> <div className = 'buttonTextContainer'>Explore City</div></div>
                                            
                                            </div>
                                            </div>
                                        )
                                    }
                                   
                                   
                                }
                                ): null}</div>
                            </div>:<div className = "side-menu-container-closed"></div>
                            
                        }
                    
                        </div>
                        
                        :<div></div>
                        
                        
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
                           <div className = 'citiesContainer' style ={{position:'fixed', top: loc[1], left: loc[0],height:'15px', width: '15px', zIndex:1000, background:"salmon", borderRadius:"50%", border: "1px solid white"}} onClick={(e) => {this.setState({hoverCityIndex:i})}} title = {this.state.displayedCities[i].Name}>
                            <img src = {cities} style ={{position:'fixed', top: loc[1]+2, left: loc[0]+2.5,height:'11px', width: '12px', zIndex:1000, filter: 'invert(1)'}} ></img>
                           </div>
                          
                           
                            )
                            }else{
                                return(
                           <div className = 'citiesContainer' style ={{position:'fixed', top: loc[1], left: loc[0],height:'15px', width: '15px', zIndex:1000, background:"gray", borderRadius:"50%", border: "1px solid white"}} onClick={(e) => {this.setState({hoverCityIndex:i}); this.setState({selectedTopIndex:2}); this.setState({menuColapsed:false})}}  title = {this.state.displayedCities[i].Name}>
                            <img src = {cities} style ={{position:'fixed', top: loc[1]+2, left: loc[0]+2.5,height:'11px', width: '12px', zIndex:1000, filter: 'invert(1)'}} ></img>
                           </div>)
                            }
                            
                          })}
                          {this.state.addingCity ? <AddCity icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingCity}></AddCity>:null}
                      
                </div>: 
                
                <div className = "map-container">
                    {this.state.selectedTopIndex!=-1 && !this.state.menuColapsed ? 
                            <div className = "menu-container-selected" onClick = {(e) =>{if (this.state.menuColapsed){ this.setState({menuColapsed:false})}else{
                                this.setState({menuColapsed:true})
                            }}}>
                            <img src = {ham} ></img>
                        </div>: <div className = "menu-container" onClick = {(e) =>{if (this.state.menuColapsed){ this.setState({menuColapsed:false})}else{
                                this.setState({menuColapsed:true})
                            }}}>
                            <img src = {ham}></img>
                        </div>
                        }
                     <div className = "home-container" onClick = {(e) => this.handleHomeClick(e)}>
                    <img src = {home}></img>
                    </div>
                  <div className = "top-menu-options">
                        {this.state.mapSideIcons.map((icon,i) => {
                            if (i == this.state.selectedTopIndex){
                                return(
                                <div className = "button-background-selected">
                                    <div className = "icon-container-menu">
                                    <img src = {icon}></img>
                                    </div>
                                    <div className = "text-container-menu">
                                {this.state.sideIcons[i]}
                                </div>
                                </div>)
                            }else{
                            return(
                            <div className = "button-background" onClick = {(e) =>{console.log('switching top to: ',i);
                                this.setState({editingListings:false});
                                this.setState({selectedTopIndex:i}); console.log("here"); this.setState({menuColapsed:false})}}>
                                <div className = "icon-container-menu">
                                <img src = {icon}></img>
                                </div>
                                <div className = "text-container-menu">
                                {this.state.sideIcons[i]}
                                </div>
                                
                            </div>)}
                            
                        })}
                        </div>
                         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
                    <MapContainer className = "map" center={[this.state.mapInfo[1],this.state.mapInfo[0]]} zoom={13}
                         zoomControl={ false} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        
                               
                               {this.state.hs.map((thing,c) =>{
                                    return(
                                     <Marker  icon={this.state.selectedAmmenity[0]==0&& this.state.selectedAmmenity[1]==c ? hos : this.state.selectedTopIndex==0 ? hog : hou}  position={[thing.Longitude,thing.Latitude]} eventHandlers={{
                                        click: (e) => {
                                            var te = [0,c];
                                            this.forceUpdate();
                                       this.setState({selectedAmmenity:te});
                                       this.setState({selectedTopIndex:0});
                                       this.setState({menuColapsed:false})
                                       console.log("selecting house")
                                       this.forceUpdate();
                                        },
                                    }}/>
                                    )
                                    
                                })}
                                
                                {this.state.js.map((thing,c) =>{
                                    return(
                                     <Marker icon={this.state.selectedAmmenity[0]==1&& this.state.selectedAmmenity[1]==c ? jos : this.state.selectedTopIndex==1 ? jog : jou} position={[thing.Longitude,thing.Latitude]} eventHandlers={{
                                        click: (e) => {
                                            var te = [1,c];
                                       this.setState({selectedAmmenity:te});
                                       this.setState({selectedTopIndex:1});
                                       this.setState({menuColapsed:false})
                                       console.log("selecting job")
                                       this.forceUpdate();
                                        },
                                    }}/>
                                    )
                                    
                                })}
                                {this.state.schs.map((thing,c) =>{
                                    return(
                                     <Marker icon={this.state.selectedAmmenity[0]==2&& this.state.selectedAmmenity[1]==c ? schos : this.state.selectedTopIndex==2 ? schog : schou}  position={[thing.Longitude,thing.Latitude]} eventHandlers={{
                                        click: (e) => {
                                            var te = [2,c];
                                       this.setState({selectedAmmenity:te});
                                       this.setState({selectedTopIndex:2});
                                       this.setState({menuColapsed:false})
                                       console.log("selecting school")
                                       this.forceUpdate();
                                        },
                                    }}/>
                                    )
                                    
                                })}
                                {this.state.strs.map((thing,c) =>{
                                    return(
                                     <Marker icon={this.state.selectedAmmenity[0]==3&& this.state.selectedAmmenity[1]==c ? stos : this.state.selectedTopIndex==3 ? stog : stou}  position={[thing.Longitude,thing.Latitude]} eventHandlers={{
                                        click: (e) => {
                                            var te = [3,c];
                                       this.setState({selectedAmmenity:te});
                                       this.setState({selectedTopIndex:3});
                                       this.setState({menuColapsed:false})
                                       console.log("selecting store")
                                       this.forceUpdate();
                                        },
                                    }}/>
                                    )
                                    
                                })}
                                {this.state.comsu.map((thing,c) =>{
                                    return(
                                     <Marker icon={this.state.selectedAmmenity[0]==4&& this.state.selectedAmmenity[1]==c ? comss : this.state.selectedTopIndex==4 ? comsg : comsu} position={[thing.Longitude,thing.Latitude]} eventHandlers={{
                                        click: (e) => {
                                            var te = [4,c];
                                       this.setState({selectedAmmenity:te});
                                       this.setState({selectedTopIndex:4});
                                       this.setState({menuColapsed:false})
                                       console.log("selecting compsums")
                                       this.forceUpdate();
                                        },
                                    }}/>
                                    )
                                    
                                })}
                               
                         
                       
                        
                        
                       
                        
                        
                    
                    </MapContainer>
                    {this.state.selectedIndex!=-1&& !this.state.menuColapsed? 
                            <div className = "side-menu-container-open">
                                <div className = "side-menu-header">
                                <div className = 'title2'>
                                 {this.state.sideIcons[this.state.selectedTopIndex]}
                                </div>{
                                    this.state.userType=='admin' && this.state.selectedTopIndex!=5 ? <div className = 'edit-container'>
                                    <div className = 'add-container' title = {'add '+this.state.sideIcons[this.state.selectedTopIndex]} onClick = {(e) => this.handleClickAmmenity(e)}>
                                    <img src = {add}></img>
                                    </div>
                                    <div className = 'delete-listing-container' onClick = {(e) => this.handleEditListingClick(e)}>
                                        <img src = {edit}></img>
                                    </div>
                                </div> : <div className = 'edit-container'></div>
                                }
                                
                                
                                </div>
                                { !this.state.menuColapsed && this.state.selectedTopIndex==0 ? this.state.hs.map((thing,i) =>{
                                    console.log("rerendering housees",this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==0 && this.state.selectedAmmenity[1]==i )
                                    return(
                                     <HouseListing  socket = {this.socket} selected = {this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==0 && this.state.selectedAmmenity[1]==i ? true: false} info = {thing} canFavorite = {this.state.userType == 'admin' || this.state.userType == 'user'} isFavorited = {false} groupSelect = {true} onClick = {(e) => this.handleListingClick(e,i,0)}  flag = {this.state.editingListings} icon = {deleteListing} deleteListing = {(e) => this.deleteListing(e,i,0)}></HouseListing>
                                    )
                                    
                                }): null}
                                   
                                { !this.state.menuColapsed && this.state.selectedTopIndex==1 ? this.state.js.map((thing,i) =>{
                                    return(
                                     <JobListing   socket = {this.socket} selected = {this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==1 && this.state.selectedAmmenity[1]==i ? true: false} info = {thing} canFavorite = {this.state.userType == 'admin' || this.state.userType == 'user'} isFavorited = {false} groupSelect = {true} onClick = {(e) => this.handleListingClick(e,i,1)} flag = {this.state.editingListings} icon = {deleteListing} deleteListing = {(e) => this.deleteListing(e,i,1)}></JobListing>
                                    )
                                    
                                }): null}
                                    
                               
                               { !this.state.menuColapsed && this.state.selectedTopIndex==2 ? this.state.schs.map((thing,i) =>{
                                    return(
                                     <SchoolListing socket = {this.socket} selected = {this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==2 && this.state.selectedAmmenity[1]==i ? true: false} info = {thing} canFavorite = {this.state.userType == 'admin' || this.state.userType == 'user'} isFavorited = {false} groupSelect = {true} onClick = {(e) => this.handleListingClick(e,i,2)} flag = {this.state.editingListings} icon = {deleteListing} deleteListing = {(e) => this.deleteListing(e,i,2)}></SchoolListing>
                                    )
                                    
                                }): null}
                                
                                { !this.state.menuColapsed && this.state.selectedTopIndex==3 ? this.state.strs.map((thing,i) =>{
                                    return(
                                     <StoreListing socket = {this.socket} selected = {this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==3 && this.state.selectedAmmenity[1]==i ? true: false} info = {thing} canFavorite = {this.state.userType == 'admin' || this.state.userType == 'user'} isFavorited = {false} groupSelect = {true} onClick = {(e) => this.handleListingClick(e,i,3)} flag = {this.state.editingListings} icon = {deleteListing} deleteListing = {(e) => this.deleteListing(e,i,3)}></StoreListing>
                                    )
                                    
                                }): null}
                                
                                { !this.state.menuColapsed && this.state.selectedTopIndex==4 ? this.state.comsu.map((thing,i) =>{
                                    return(
                                     <CsListing socket = {this.socket} selected = {this.state.selectedAmmenity.length!=0 && this.state.selectedAmmenity[0]==4 && this.state.selectedAmmenity[1]==i ? true: false} info = {thing} canFavorite = {this.state.userType == 'admin' || this.state.userType == 'user'} isFavorited = {false} groupSelect = {true} onClick = {(e) => this.handleListingClick(e,i,4)} flag = {this.state.editingListings} icon = {deleteListing} deleteListing = {(e) => this.deleteListing(e,i,4)}></CsListing>
                                    )
                                    
                                }): null}
                               
                                
                               
                            
                                
                            </div>:<div className = "side-menu-container-closed"></div>
                            
                           
                    }
                      {this.state.selectedTopIndex== 0 &&this.state.adding ? <AddHome icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingAmmenity}></AddHome>
                        :   this.state.selectedTopIndex == 1 &&this.state.adding? <AddJob icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingAmmenity}></AddJob>
                        :   this.state.selectedTopIndex == 2 &&this.state.adding? <AddSchool icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingAmmenity}></AddSchool>
                        :   this.state.selectedTopIndex == 3 &&this.state.adding? <AddStore icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingAmmenity}></AddStore>
                        :   this.state.selectedTopIndex == 4 &&this.state.adding? <AddComSup icon = {deleteListing} handleAddExit = {this.handleAddExit} onSubmit = {this.handleAddingAmmenity}></AddComSup>:null
                            }
                </div>
                
                    
                }
               
                
            </div>
        )
    }
}

export default InteractiveMap
