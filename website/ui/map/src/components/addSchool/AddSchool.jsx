import React from "react";
import "./style.css";
class AddSchool extends React.Component{
    constructor(props){
         super(props);
        this.state = {
            type:'',
             minGrade:'',
             maxGrade:'',
             link:'',
             lat:'',
             long:''
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
            this.setState({type:e.target.value})
        }else if(i ==1){//rent
            this.setState({link:e.target.value})
        }else if (i==2){//bed n
            this.setState({minGrade:e.target.value})
        }else if (i ==3){//bath n
            this.setState({maxGrade:e.target.value})
        }else if(i ==4){//lat
            this.setState({lat:e.target.value})
        }else if(i == 5){//long
            this.setState({long:e.target.value})
        }
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
                     <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Name:</div>
                            <div className = 'house-value-enter'>
                                <input className = 'house-value' value = {this.state.type} onChange = {(e) => this.handleOnChange(e,0)}></input>
                                
                                
                                </div>
                            </div>
                             <div className = 'house-rent-container'>
                                <div className = 'house-type-text'>link:</div>
                                <div className = 'house-value2-enter'>
                                    <input className = 'house-value' value = {this.state.link} onChange = {(e) => this.handleOnChange(e,1)}></input>
                                    </div>
                            </div>
                        
                       
                       </div>
                        <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Minimum Grade:</div>
                            <div className = 'house-type-select'>
                                <input className= 'nbed' type = 'number' value = {this.state.minGrade} onChange = {(e) => this.handleOnChange(e,2)}></input>
                            </div>
                            </div>
                            <div className = 'house-rent-container'>
                            <div className = 'house-type-text'>Maximum Grade:</div>
                            <div className = 'house-bn-enter'>
                                <input className= 'nbath' type = 'number' value = {this.state.maxGrade} onChange = {(e) => this.handleOnChange(e,3)}></input>
                            </div>
                            </div>
                        </div>
                        <div className = 'first-row-container'>
                       <div className = 'house-type-container'>
                        <div className = 'house-type-text'>longitude:</div>
                        <div className = 'house-value-enter'>
                             <input className = 'house-value' value = {this.state.lat} onChange = {(e) => this.handleOnChange(e,4)}></input>
                             </div>
                       </div>
                       <div className = 'house-rent-container'>
                        <div className = 'house-type-text'>Latitude:</div>
                        <div className = 'house-value2-enter'>
                             <input className = 'house-value' value = {this.state.long} onChange = {(e) => this.handleOnChange(e,5)}></input>
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
export default AddSchool
