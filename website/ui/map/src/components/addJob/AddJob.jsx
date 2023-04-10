import React from "react";
import "./style.css";
class AddJob extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:'',
            salary:'',
            time:'full-time',
            employer:'',
            remote:'0',
            des:'',
            start:'',
            due:'',
            link:'',
            lat:'',
            long:''
        }
        this.icon = props.icon;
        this.addingAmen = props.onSubmit
        this.changeToNotAdding =  props.handleAddExit
    }
    handleRemoteClick = (e) =>{
        if (this.state.remote == '0'){
            this.setState({remote:'1'});
        }else{
            this.setState({remote:'0'});
        }
    }
    handleTimeClick = (e) =>{
        if (this.state.time == 'full-time'){
            this.setState({time:'part-time'});
        }else{
            this.setState({time:'full-time'});
        }
    }
    handleOnChange = (e,i) =>{
        if (i ==0){//type
            this.setState({type:e.target.value})
        }else if(i ==1){//rent
            this.setState({salary:e.target.value})
        }else if (i==2){//bed n
            
            this.setState({start:e.target.value})
            //console.log(this.state.start)
        }else if (i ==3){//bath n
            this.setState({due:e.target.value})
        }else if (i ==4){//bath n
            this.setState({lat:e.target.value})
        }else if (i ==5){//bath n
            this.setState({long:e.target.value})
        }else if (i ==6){//bath n
            this.setState({employer:e.target.value})
        }else if (i ==7){//bath n
            this.setState({link:e.target.value})
        }else if (i ==8){//bath n
            this.setState({des:e.target.value})
        }
    }
    handleSubmitClick = (e) =>{
        this.addingAmen(this.state);
        this.changeToNotAdding()
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
                        {'add job'}
                        </div>
                    </div>
                    
                    <div className = 'add-window-body'>
                    <div className = 'first-row-container'>
                         <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Type:</div>
                            <div className = 'house-value-enter'>
                                <input className = 'house-value' value = {this.state.type} onChange = {(e) => this.handleOnChange(e,0)}></input>
                                
                                
                            </div>
                    
                        </div>
                         <div className = 'house-rent-container'>
                             <div className = 'house-type-text'>salary:</div>
                             <div className = 'house-rent-enter'>
                             <input className = 'house-rent' value = {this.state.salary} onChange = {(e) => this.handleOnChange(e,1)}></input>
                             </div>
                        </div>
                    
                    </div>
                    <div className = 'first-row-container'>
                        <div className = 'job-in-container'>
                            <div className = 'house-type-text'>remote/in-person</div>
                            <div className = 'house-value-enter'>
                               <button className = 'inperson' onClick = {(e) => this.handleRemoteClick(e)}>{this.state.remote=='0' ? 'remote':'in-person'}</button>
                                
                                
                            </div>
                            
                    
                        </div>
                       
                        <div className = 'house-rent-container'>
                        <div className = 'house-type-text'>Hours:</div>
                        <div className = 'house-value2-enter'>
                             <button className = 'inperson' onClick = {(e) => this.handleTimeClick(e)}>{this.state.time}</button>
                             </div>
                       </div>
                    </div>
                    <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>posting date:</div>
                            <div className = 'house-value-enter'>
                                <input type = 'date' className = 'house-value' value = {this.state.start} onChange = {(e) => this.handleOnChange(e,2)}></input>
                                
                               
                                </div>
                            </div>
                             <div className = 'house-rent-container'>
                                <div className = 'house-type-text'>application due:</div>
                                <div className = 'house-value2-enter'>
                                    <input type = 'date'className = 'house-value' value = {this.state.due} onChange = {(e) => this.handleOnChange(e,3)}></input>
                                    </div>
                            </div>
                        
                       
                       </div>
                       <div className = 'first-row-container'>
                            <div className = 'house-type-container'>
                            <div className = 'house-type-text'>Employer</div>
                            <div className = 'house-value-enter'>
                                <input className = 'house-value' value = {this.state.size} onChange = {(e) => this.handleOnChange(e,6)}></input>
                                
                                
                                </div>
                            </div>
                             <div className = 'house-rent-container'>
                                <div className = 'house-type-text'>link:</div>
                                <div className = 'house-value2-enter'>
                                    <input className = 'house-value' value = {this.state.link} onChange = {(e) => this.handleOnChange(e,7)}></input>
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
export default AddJob
