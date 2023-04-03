import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
import bed from "../icons2/misc/bed.png";
import bath from "../icons2/misc/bath.png";
import ruler from "../icons2/misc/ruler.png";
class HouseListing extends React.Component{
    constructor(props){
        super(props);
        this.socket = props.socket;
        this.state = {
            selected: props.selected,
            info:props.info,
            canFavorite: props.canFavorite,
            isFavorited: props.isFavorited,
            groupSelect:props.groupSelect,
            onclick: props.onClick
        }
       console.log('from component: ',this.state.selected,this.state.groupSelect )
    }
    
    render(){
        
        return(
            <div className = {this.state.selected ? 'houselisting-selected': this.state.groupSelect ? 'houselisting-groupselect':'houselisting-unselected'} onClick = {this.state.onclick}>
                <div className = "houselisting-header" >
                    <div className = 'type-container'>
                        {this.state.info.HouseType}
                    </div>
                    
                     <div className =  {this.state.canFavorite && this.state.isFavorited ? 'favorited-container': this.state.canFavorite ? 'favorite-container': 'cantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {(e) => {
                         if (this.state.canFavorite){
                             this.setState({isFavorited:true});
                             
                             //user add to favorites
                        }
                    }}>
                                <img className = 'favs-im' src = {favs}></img>
                    </div>
                    <div className = 'hprice-container'>${this.state.info.Rent}</div>
                </div>
                <div className = 'houselisting-body'>
                    <div className = 'number-baths'>
                        <div className = 'hicon-container'>
                            <img src = {bath}></img>
                        </div>
                        <div className = 'info-container'>
                        {this.state.info.NBathroom}
                        </div>
                    </div>
                    <div className = 'number-beds'>
                         <div className = 'hicon-container'>
                            <img src = {bed}></img>
                        </div>
                        <div className = 'info-container'>
                         {this.state.info.NBedroom}
                        </div>
                    </div>
                    <div className = 'square-footage-container'>
                        <div className = 'hicon-container'>
                            <img src = {ruler}></img>
                        </div>
                        <div className = 'info-container'>
                         {this.state.info.SquareFootage} ft<sup>2</sup>
                        </div>
                    </div>
                    
                    <div className = 'amenities-container'>
                    {this.state.info.AmenitiesOffered}
                    </div>
                    
                </div>
            
            </div>
        )
    }
}

export default HouseListing
