import React from "react";
import "./style.css";
class AddStore extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             type:'',
             merch:'',
             link:'',
             lat:'',
             long:'',
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
            this.setState({merch:e.target.value})
        }else if(i ==1){//rent
            this.setState({type:e.target.value})
        }else if (i==2){//bed n
            this.setState({lat:e.target.value})
        }else if(i ==3){//lat
            this.setState({long:e.target.value})
        }else if(i == 4){//long
            this.setState({link:e.target.value})
        }
    }

    render(){
        return(
         <div className = 'adding-ammenity-container'>
            <div className = 'add-window'>
                 <div className = 'adding-header'>
                        <div className = 'add-window-exit' onClick = {this.changeToNotAdding}>
                        <img src = {this.icon}></img>
                        </div>
                        <div className = 'add-window-title'>
                        {'add store'}
                        </div>
                    </div>
                    
                    <div className = 'add-window-body'>
                    <div className = 'first-row-container'>
                        <div className = 'house-type-container'>
                            <div className = 'house-type-text'>type:</div>
                            <div className = 'house-type-select'>
                                <select className="house-type" value = {this.state.merch} onChange = {(e) => this.handleOnChange(e,0)}>
                                    <option value="food">food</option>
                                    <option value="clothes">clothes</option>
                                    <option value="furniture">furniture</option>
                                    <option value="general">general</option>
                                    <option value="electronics">electronics</option>
                                    <option value="pharmacy">pharmacy</option>
                                    
                                </select>
                            
                            </div>
                            </div>
                             <div className = 'house-rent-container'>
                        <div className = 'house-type-text'>Name:</div>
                        <div className = 'house-value2-enter'>
                             <input className = 'house-value' value = {this.state.type} onChange = {(e) => this.handleOnChange(e,1)}></input>
                             </div>
                       </div>
                        </div>
                        <div className = 'first-row-container'>
                       <div className = 'house-type-container'>
                        <div className = 'house-type-text'>longitude:</div>
                        <div className = 'house-value-enter'>
                             <input className = 'house-value' value = {this.state.lat} onChange = {(e) => this.handleOnChange(e,2)}></input>
                             </div>
                       </div>
                       <div className = 'house-rent-container'>
                        <div className = 'house-type-text'>Latitude:</div>
                        <div className = 'house-value2-enter'>
                             <input className = 'house-value' value = {this.state.long} onChange = {(e) => this.handleOnChange(e,3)}></input>
                             </div>
                       </div>
                       
                       </div>
                       <div className = 'first-row-container'>
                       <div className = 'house-type-container'>
                        <div className = 'house-type-text'>link:</div>
                        <div className = 'house-value-enter'>
                             <input className = 'house-value' value = {this.state.link} onChange = {(e) => this.handleOnChange(e,4)}></input>
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
export default AddStore
