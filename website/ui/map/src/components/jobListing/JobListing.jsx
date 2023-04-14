import React from "react";
import "./style.css";
import favs from "../icons2/misc/fav.png";
import pay from "../icons2/misc/pay.png";
import clock from "../icons2/misc/clock.png";
class JobListing extends React.Component{
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
    }
    
    updateEditingState(newState){
        this.setState({editingState:newState});
        
    }
    
    render(){
        return(
            <div className = {this.state.selected ? 'joblisting-selected': this.state.groupSelect ? 'joblisting-groupselect':'joblisting-unselected'} onClick = {this.state.onclick}>
            <div className = {this.state.editingState ? 'hediting':'hnot-editing'}>
                    <div className = 'hdelete-listing-container' onClick = {this.state.deleteListing}>
                    <img src = {this.state.deleteIcon}></img>
                    </div>
                
                </div>
            <div className = 'total-header-container'>
                <div className = "joblisting-header" >
                    <a href = {this.state.info.Link} target="_blank" className = 'type-container' >
                        {this.state.info.Industry}
                    </a>
                    
                    
                    
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {this.addFav}>
                                <img className = 'favs-im' src = {favs}></img>
                    </div>
                </div>
                 <div className = 'joblisting-body'>
                    <div className = 'pay-container'>
                        <div className = 'jicon-container'>
                            <img src = {pay}></img>
                        </div>
                        <div className = 'jinfo-container'>
                        {this.state.info.Salary}
                        </div>
                    </div>
                    <div className = 'time-container'>
                         <div className = 'jicon-container'>
                            <img src = {clock}></img>
                        </div>
                        <div className = 'jinfo-container'>
                         {this.state.info.Hours}
                        </div>
                    </div>
                    <div className = 'employer-container'>
                        <div ClassName = 'em'>
                            {this.state.info.Employer}
                        </div>
                        <div className = 'remote'>
                            {this.state.info.RemoteInPerson == 0 ? '- in person':'- remote'}
                        </div>
                    </div>
                    
                    <div className = 'jamenities-container'>
                    {this.state.info.JobDescription}
                    </div>
                    
                </div>
                <div className = 'dates-container'>
                    <div className = 'posted-Date-cont' title = 'job posting date'>
                    {this.state.info.PostingDate}
                    </div>
                    <div className = 'due-Date-cont' title = 'application due date'>
                    {this.state.info.ApplicationDeadline}
                    </div>
                </div>
            </div>
        )
    }
}

export default JobListing
