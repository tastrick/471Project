import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
import offering from "../icons2/misc/offering.png";
class CsListing extends React.Component{
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
    }
    
    render(){
        return(
            <div className = {this.state.selected ? 'cslisting-selected': this.state.groupSelect ? 'cslisting-groupselect':'cslisting-unselected'} onClick = {this.state.onclick}>
             <div className = 'total-header-container'>
                <div className = "cslisting-header" >
                    <div className = 'type-container'>
                        {this.state.info.Organizers}
                    </div>
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {(e) => {
                         if (this.state.canFavorite){
                             this.setState({isFavorited:true});
                             
                             //user add to favorites
                        }
                    }}>
                                <img className = 'favs-im' src = {favs}></img>
                    </div>
                </div>
                 <div className = 'cslisting-body'>
                 <div className = 'csicon-container' title = 'offerings'>
                 <img src = {offering}></img>
                 </div>
                 <div className = 'offered-container' title = 'offerings'>
                 {this.state.info.Offering}
                 </div>
                 </div>
            </div>
        )
    }
}

export default CsListing
