import  React, {Component} from 'react';
import './index.css';
import {NavLink} from 'react-router-dom';

class Header extends Component{

    headerStyle = {
        backgroundColor: "#2C2C3B",
        width: "100%",
        height: "136px"
    }

    LogoStyle = {
        margin: 'auto',
        color: '#E5E7EE',
        position: 'absolute',
        top: '38px',
        left: '130px',
        fontSize: '30px'

    }

    settingIcon = {
        width: '25px',
        height: '25.33px',
        position: 'absolute',
        top: '45px',
        left: '30px'

    }

    alarmIcon = {
        width: '25px',
        height: '25.33px',
        position: 'absolute',
        left: '317px',
        top: '46.81px'

    }

    active = {
        color: '#02DD6E'
    }

    
    phoneUpView = {
        position: 'absolute',
        top: '1.5px',
        width: '100%'

    }


    constructor(props){
        super(props);
        
        this.state = {
            editing: true 
        }

        this.renderSetting = this.renderSetting.bind(this);
        this.renderAlarm   = this.renderAlarm.bind(this);
        this.chackRendar   = this.chackRendar.bind(this);
    }

    
    chackRendar(data){
        if(data === 'alarm')
            this.setState({editing: true})
        if(data === 'setting')
            this.setState({editing: false})
    }

    renderSetting(){
        return (
            <div className='alarm'>
                <NavLink exact to='/get' className='getAlarm' activeStyle={this.active}>GET ALARMS</NavLink>
                <NavLink exact to='/send' className='sendAlarm' activeStyle={this.active}>SEND ALARMS</NavLink>
            </div>
          );
    }

    renderAlarm(){
        return (
            <div className='setting'>
                <NavLink exact to='/' className='back' onClick={() => this.chackRendar('alarm')}>&lt; Back</NavLink>
                <a>SETTING</a>
            </div>
          );
    }

    render(){
        return(
            <header style={this.headerStyle}>
                <img src={require('./static/Bars-Status-White.svg')} style={this.phoneUpView} alt="phone up view"/>
                <NavLink  exact to='/' className="logo" style={this.LogoStyle} onClick={() => this.chackRendar('alarm')}>AlarmMe</NavLink>
                <NavLink  exact to='/Setting' onClick={() => this.chackRendar('setting')}><img style={this.settingIcon} src={require('./static/settings.svg')} alt="setting icon" /></NavLink>
                <NavLink  exact to='/' onClick={() => this.chackRendar('alarm')}><img style={this.alarmIcon} src={require('./static/alarm-clock.svg')}  alt="alarm icon"/></NavLink>
                {this.state.editing ? this.renderSetting() : this.renderAlarm()}
            </header>
        );
    }
}

export default Header;
