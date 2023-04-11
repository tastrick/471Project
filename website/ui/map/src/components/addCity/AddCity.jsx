import React from "react";
import "./style.css";
class AddCity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             name:'',
             lat:'',
             long:'',
             pop:''
        }
         this.icon = props.icon;
        this.addingAmen = props.onSubmit
        this.changeToNotAdding =  props.handleAddExit
    }
    handleSubmitClick = (e) =>{
        this.addingAmen(this.state);
        this.changeToNotAdding()
    }
    handleOnChange = (e,i) =>{
        if (i ==0){//type
            this.setState({name:e.target.value})
        }else if(i==1){
            this.setState({pop:e.target.value})
        }else if(i==2){
            this.setState({lat:e.target.value})
        }else if(i==3){
            this.setState({long:e.target.value})
        }
    }
    render (){
        return(
            <div className = 'adding-city-container'>
         <div className = 'add-window'>
                    <div className = 'adding-header'>
                        <div className = 'add-window-exit' onClick = {this.changeToNotAdding}>
                        <img src = {this.icon}></img>
                        </div>
                        <div className = 'add-window-title'>
                        {'add city'}
                        </div>
                    </div>
                    
                    <div className = 'add-window-body'>
                     <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Name:</div>
                            <div className = 'house-value-enter'>
                                <input className = 'house-value' value = {this.state.name} onChange = {(e) => this.handleOnChange(e,0)}></input>
                                
                                
                                </div>
                            </div>
                             <div className = 'house-rent-container'>
                                <div className = 'house-type-text'>population:</div>
                                <div className = 'house-value2-enter'>
                                    <input className = 'house-value' value = {this.state.pop} onChange = {(e) => this.handleOnChange(e,1)}></input>
                                    </div>
                            </div>
                        
                       
                       </div>
                        
                        <div className = 'first-row-container'>
                       <div className = 'house-type-container'>
                        <div className = 'house-type-text'>longitude:</div>
                        <div className = 'house-value-enter'>
                             <input className = 'house-value' value = {this.state.long} onChange = {(e) => this.handleOnChange(e,3)}></input>
                             </div>
                       </div>
                       <div className = 'house-rent-container'>
                        <div className = 'house-type-text'>Latitude:</div>
                        <div className = 'house-value2-enter'>
                             <input className = 'house-value' value = {this.state.lat} onChange = {(e) => this.handleOnChange(e,2)}></input>
                             </div>
                       </div>
                       
                       </div>
                    </div>
                    <div className = 'add-window-footer'>
                        <button className = 'add-button-container' onClick = {(e) => this.handleSubmitClick(e)}>
                        add
                        </button>
                    </div>
            </div>
        </div>
            
        )
        
    }
}
export default AddCity
