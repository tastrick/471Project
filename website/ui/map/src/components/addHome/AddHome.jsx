import React from "react";
import "./style.css";
class AddHome extends React.Component{
    constructor(props){
         super(props);
        this.state = {
            type:'house',
            rent: '',
            bedn:'',
            bathn:'',
            lat:'',
            long:'',
            size: '',
            link:'',
            des:''
        }
        this.icon = props.icon;
        this.addingAmen = props.onSubmit
        this.changeToNotAdding =  props.handleAddExit
    }
    handleSubmitClick = (e) =>{
        var all = {
            type:this.state.type,
            rent: this.state.rent,
            
        }
        this.addingAmen(this.state);
        this.changeToNotAdding()
    }
    handleOnChange = (e,i) =>{
        if (i ==0){//type
            this.setState({type:e.target.value})
        }else if(i ==1){//rent
            this.setState({rent:e.target.value})
        }else if (i==3){//bed n
            this.setState({bedn:e.target.value})
        }else if (i ==2){//bath n
            this.setState({bathn:e.target.value})
        }else if(i ==4){//lat
            this.setState({lat:e.target.value})
        }else if(i == 5){//long
            this.setState({long:e.target.value})
        }else if (i == 6){
            this.setState({size:e.target.value})
        }else if(i == 7){
            this.setState({link:e.target.value})
        }else if (i ==8){
            this.setState({des:e.target.value})
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
                        {'add house'}
                        </div>
                    </div>
                    
                    <div className = 'add-window-body'>
                        <div className = 'first-row-container'>
                        <div className = 'house-type-container'>
                            <div className = 'house-type-text'>type:</div>
                            <div className = 'house-type-select'>
                                <select className="house-type" value = {this.state.type} onChange = {(e) => this.handleOnChange(e,0)}>
                                    <option value="house">house</option>
                                    <option value="condo">condo</option>
                                    <option value="apartment">apartment</option>
                                    <option value="duplex">duplpex</option>
                                    <option value="townhouse">townhouse</option>
                                    <option value="basement">basement</option>
                                    <option value="main">main floor</option>
                                    <option value="room">room</option>
                                </select>
                            
                            </div>
                            </div>
                             <div className = 'house-rent-container'>
                             <div className = 'house-type-text'>Rent Cost:</div>
                             <div className = 'house-rent-enter'>
                             <input className = 'house-rent' value = {this.state.rent} onChange = {(e) => this.handleOnChange(e,1)}></input>
                             </div>
                        </div>
                        </div>
                        <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>bathroom number:</div>
                            <div className = 'house-type-select'>
                                <input className= 'nbed' type = 'number' value = {this.state.bathn} onChange = {(e) => this.handleOnChange(e,2)}></input>
                            </div>
                            </div>
                            <div className = 'house-rent-container'>
                            <div className = 'house-type-text'>bedroom number:</div>
                            <div className = 'house-bn-enter'>
                                <input className= 'nbath' type = 'number' value = {this.state.bedn} onChange = {(e) => this.handleOnChange(e,3)}></input>
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
                       
                       <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Size:</div>
                            <div className = 'house-value-enter'>
                                <input className = 'house-value' value = {this.state.size} onChange = {(e) => this.handleOnChange(e,6)}></input>
                                
                                <div className = 'units'>ft<sup>2</sup></div>
                                </div>
                            </div>
                             <div className = 'house-rent-container'>
                                <div className = 'house-type-text'>link:</div>
                                <div className = 'house-value2-enter'>
                                    <input className = 'house-value' value = {this.state.link} onChange = {(e) => this.handleOnChange(e,7)}></input>
                                    </div>
                            </div>
                        
                       
                       </div>
                       <div className = 'desc-row-container'>
                       <div className = 'description-container'>
                       <div className = 'house-type-text'>Description:</div>
                        <textarea className = 'description' value = {this.state.des} onChange = {(e) => this.handleOnChange(e,8)} rows = '4' cols = '43'></textarea>
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
export default AddHome
