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
            gradeType:['primary', 'secondary', 'post-secondary']
        }
    }
    
    render(){
        return(
            <div className = {this.state.selected ? 'schoollisting-selected':'schoollisting-unselected'}>
            <div className = 'total-header-container'>
                <div className = "schoollisting-header" >
                    <div className = 'type-container'>
                        {this.state.info.Name}
                    </div>
                    
                    
                    
                </div>
                 <div className =  {this.state.canFavorite && this.state.isFavorited ? 'jfavorited-container': this.state.canFavorite ? 'jfavorite-container': 'jcantfavorite-container'} title = {!this.state.canFavorite ? 'sign in to favorite': null} onClick = {(e) => {
                         if (this.state.canFavorite){
                             this.setState({isFavorited:true});
                             
                             //user add to favorites
                        }
                    }}>
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
