import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
import merch from "../icons2/misc/merch.png";

class StoreListing extends React.Component{
    constructor(props){
        super(props);
        this.socket = props.socket;
        this.state = {
            selected: props.selected,
            info:props.info,
            canFavorite: props.canFavorite,
            isFavorited: props.isFavorited,
            groupSelect:props.groupSelect,
            onclick: props.onClick,
            editingState:false,
            deleteIcon:props.icon,
            deleteListing:props.deleteListing,
            f:props.favs
            
        }
        this.addFav = props.addFav
    }componentWillReceiveProps(nextProps) {
        this.setState({ editingState: nextProps.flag });  
        this.setState({ selected: nextProps.selected });
        this.setState({ info: nextProps.info });
        this.setState({isFavorited: nextProps.isFavorited})
        this.setState({canFavorite: nextProps.canFavorite})
        this.setState({f:nextProps.favs})
        console.log('updating thing')
    }
    updateEditingState(newState){
        this.setState({editingState:newState});
        
    }
    
    render(){
        return(
            <div className = {this.state.selected ? 'storelisting-selected': this.state.groupSelect ? 'storelisting-groupselect':'storelisting-unselected'} onClick = {this.state.onclick}>
            
            <div className = {this.state.editingState ? 'hediting':'hnot-editing'}>
                    <div className = 'hdelete-listing-container' onClick = {this.state.deleteListing}>
                    <img src = {this.state.deleteIcon}></img>
                    </div>
                
                </div>
            <div className = 'total-header-container'>
                <div className = "storelisting-header" >
                   <a href = {this.state.info.Link} target="_blank" className = 'type-container' >
                        {this.state.info.Name}
                    </a>
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {this.addFav}>
                                <img className = 'favs-im' src = {favs}></img>
                    </div>
                </div>
                 <div className = 'storelisting-body'>
                 <div className  = 'merch-icon-cont' title = 'merchandise type'>
                 <img src = {merch}></img>
                 </div>
                 <div className = 'storetype-container' title = 'merchandise type'>
                 {this.state.info.Type}
                 </div>
                 </div>
            </div>
        )
    }
}

export default StoreListing
