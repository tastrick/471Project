import React from "react";
import "./style.css";
class AddSchool extends React.Component{
    constructor(props){
         super(props);
        this.state = {
             changeToNotAdding: props.handleAddExit
        }
        this.icon = props.icon;
    }

    render(){
        return(
         <div className = 'adding-ammenity-container'>
         <div className = 'add-window'>
                    <div className = 'adding-header'>
                        <div className = 'add-window-exit' onClick = {this.state.changeToNotAdding}>
                        <img src = {this.icon}></img>
                        </div>
                        <div className = 'add-window-title'>
                        {'add school'}
                        </div>
                    </div>
                    
                    <div className = 'add-window-body'>
                    </div>
                    <div className = 'add-window-footer'>
                        <button className = 'add-button-container'>
                        add
                        </button>
                    </div>
            </div>
        </div>
        )
    }
}
export default AddSchool
