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
            onclick: props.onClick,
            editingState:false,
            deleteIcon:props.icon,
            f:props.favs
            
        }
        this.delete = props.deleteListing
        this.addFav = props.addFav
    }componentWillReceiveProps(nextProps) {
        this.setState({ editingState: nextProps.flag });  
        this.setState({ selected: nextProps.selected });
        this.setState({ info: nextProps.info });
        this.setState({isFavorited: nextProps.isFavorited})
        this.setState({canFavorite: nextProps.canFavorite})
        this.setState({f:nextProps.favs})
    }
    updateEditingState(newState){
        this.setState({editingState:newState});
        
    }
    render(){
        return(
            <div className = {this.state.selected ? 'cslisting-selected': this.state.groupSelect ? 'cslisting-groupselect':'cslisting-unselected'} onClick = {this.state.onclick}>
            <div className = {this.state.editingState ? 'hediting':'hnot-editing'}>
                    <div className = 'hdelete-listing-container' onClick = {this.delete}>
                    <img src = {this.state.deleteIcon}></img>
                    </div>
                
                </div>
             <div className = 'total-header-container'>
                <div className = "cslisting-header" >
                    <a href = {this.state.info.Link} target="_blank" className = 'type-container' >
                        {this.state.info.Organizers}
                    </a>
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {this.addFav}>
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
