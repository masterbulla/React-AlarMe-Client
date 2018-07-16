import React, {Component} from 'react';
import '../index.css';
import images from './images';
import StarRatings from 'react-star-ratings';
import Switch from '@material-ui/core/Switch';
import {Popover, Overlay ,ButtonToolbar} from 'react-bootstrap'
import axios from 'axios';

class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkedB: true,
            checkedA: true,
            National: true,
            Friends: true,
            show: false,
            morningTip: ''
        };
        this.handleClick = e => {
            this.setState({ target: e.target, show: !this.state.show });
        };

        this.textHandle = this.textHandle.bind(this);
    }

    componentDidMount() {
        var url = null;
        //read the id of the login user
        var profile = global.GmailID;
        
        if(profile === '')
            url ="https://alarme-app.herokuapp.com/setting?id=114530631895967788443";
        else
            url =`https://alarme-app.herokuapp.com/setting?id=${profile}`;


        //read all alarm data from DB
        fetch(url).then((res) => {
            if(res.statusText === 'Internal Server Error'){
                return 'error';
            }else
                return res.json();    

        }).then((data) => {
            if(data === 'error'){
                console.log("error to get setting");
                return 0 ;
            }
            this.setState({
                id: data.id,
                fullName: data.fullName,stars: data.setting.stars,
                reviews: data.setting.reviews,
                nationalRington: data.setting.nationalRington,
                friendAlert: data.setting.friendAlert,
                morningTip: data.setting.morningTip,
                checkedB:  data.setting.nationalRington,
                checkedA:  data.setting.friendAlert
            })
            return 0;
        })
    }

    //Get images dynamic
    getImage(id){
        return (images[id])
    }

    //Switch handlenational rington (on\off)
    handleChange = name => event => {
        var key = null;
        if(event.target.value === 'checkedB'){
            this.setState({ checkedB: event.target.checked });
            key = 'setting.nationalRington'
        }
            
        else{
            this.setState({ checkedA: event.target.checked });
            key = 'setting.friendAlert'
        }
            

        if(event.target.checked === false){
            this.setState({[name]: false})
            axios.get(`https://alarme-app.herokuapp.com/updatesetting?id=${this.state.id}&keyupdate=${key}&valueupdate=false`)
            .then(res => {
              console.log(res);
            })
        }
        else{
            this.setState({[name]: true})
            axios.get(`https://alarme-app.herokuapp.com/updatesetting?id=${this.state.id}&keyupdate=${key}&valueupdate=true`)
            .then(res => {
            console.log(res);
        })
        }
    };

    //tip handle
    textHandle(event){
        this.setState({morningTip: event.target.value});        
        axios.get(`https://alarme-app.herokuapp.com/updatesetting?id=${this.state.id}&keyupdate=setting.morningTip&valueupdate=${event.target.value}`)
        .then(res => {
          console.log(res);
        })
    }
    
    

    

    render(){
        return(
            <div className="settingBackground">
                <div className ="setting-header">
                    <img className="setting-picture" src={this.getImage(this.state.fullName)} alt="refresh" />
                    <span>{this.state.fullName}</span>
                    <img src={require('../static/facbook.svg')} alt="facbook connect"/>
                    <img src={require('../static/gmail.svg')} alt="facbook connect"/>
                </div>
                    <hr className="setting-hr"/>
                <div className="setting-score">
                    <span>Your Score </span>
                    <StarRatings rating={this.state.stars} starRatedColor="#00FF6F" changeRating={this.changeRating} numberOfStars={5}name='rating' starDimension="25px" starSpacing="3px"/>
                    <br/>
                    <span><b>{this.state.stars}</b> Based on <b>{this.state.reviews}</b> AlarMe reviews</span>
                </div>
                    <hr className="setting-hr"/>
                <div className="setting-national">
                    <span>National anthem Ringtone<Switch checked={this.state.checkedB} onChange={this.handleChange('National')} value="checkedB" color="primary" className="switchAlarm"/></span><br/>
                    <span>Wake people up with your national <br/>anthem</span>
                </div>
                    <hr className="setting-hr"/>
                <div className="setting-friend">
                    <span>Friends alerts<Switch checked={this.state.checkedA} onChange={this.handleChange('National')}  value="checkedA" color="primary" className="switchAlarm"/></span><br/>
                    <span>Notify me when friends <br/>want to wake up</span>
                </div>
                    <hr className="setting-hr"/>
                <div className="setting-tip">
                    <ButtonToolbar>
                        <p onClick={this.handleClick}>Edit morning awakening tip <span>></span></p>
                        <Overlay show={this.state.show} target={this.state.target} placement="top" >
                            <Popover id="popover-contained" title="Morning Tip">
                                <textarea className="setting-area"  value={this.state.morningTip} onChange={this.textHandle}>{this.state.morningTip}</textarea>
                            </Popover>
                        </Overlay>
                    </ButtonToolbar>
                </div>      
            </div>
        );
    }
}

export default Setting;

