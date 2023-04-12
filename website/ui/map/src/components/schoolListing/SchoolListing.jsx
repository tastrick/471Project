import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
import child from "../icons2/misc/child.png";
import adult from "../icons2/misc/adult.png";
class SchoolListing extends React.Component{
    constructor(props){
        super(props);
        this.socket = props.socket;
        this.state = {
            selected: props.selected,
            info:props.info,
            canFavorite: props.canFavorite,
            isFavorited: props.isFavorited,
            gradeType:['primary', 'secondary', 'post-secondary'],
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
    }
    
    updateEditingState(newState){
        this.setState({editingState:newState});
        
    }
    
    render(){
        return(
            <div className = {this.state.selected ? 'schoollisting-selected':this.state.groupSelect ? 'schoollisting-groupselect':'schoollisting-unselected'} onClick = {this.state.onclick}>
            <div className = {this.state.editingState ? 'hediting':'hnot-editing'}>
                    <div className = 'hdelete-listing-container' onClick = {this.state.deleteListing}>
                    <img src = {this.state.deleteIcon}></img>
                    </div>
                
                </div>
            <div className = 'total-header-container'>
                <div className = "schoollisting-header" >
                    <a href = {this.state.info.Link} className = 'type-container' >
                        {this.state.info.Name}
                    </a>
                    
                    
                    
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {this.addFav}>
                                <img className = 'favs-im' src = {favs}></img>
                    </div>
                </div>
                 <div className = 'schoollisting-body'>
                    <div className = 'child-container'>
                        <div className = 'scicon-container'>
                            <img src = {child}></img>
                        </div>
                        <div className = 'scinfo-container'>
                        gr. {this.state.info.MinimumGrade}
                        </div>
                    </div>
                    <div className = 'adult-container'>
                         <div className = 'j1icon-container'>
                            <img src = {adult}></img>
                        </div>
                        <div className = 'j1info-container'>
                         gr. {this.state.info.MaximumGrade}
                        </div>
                    </div>
                    
                    
                    
                    
                </div>
            </div>
        )
    }
}

export default SchoolListing
