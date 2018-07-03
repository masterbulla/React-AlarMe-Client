import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
import ConfirmationDialog from './Country';

class SendPanels extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };

    this.repeatCheck = this.repeatCheck.bind(this);
    this.morningChack = this.morningChack.bind(this);
  }

  repeatCheck(){
    if(this.props.alarm.repeat.length == null){
      console.log('null');
    }
    else{
      return <small>Repeat</small>
    }
  }

  morningChack(){
    if(this.props.alarm.morningAwakning === true){
      return <p><img src={require('../static/alarm-clock.svg')} alt="alarm"/>Morning Awakening</p>
    }else{
      return <p></p>
    }
  }

  
  render() {
    return (
      <div>
        <Panel ontoggle={this.state.open} id="collapsible-panel-example-2"  expanded={this.state.open}>
          <Panel.Heading className={{ 'opacity0': this.state.open }}>
            <Panel.Title toggle>
                <img className="profile-picture" src={require('../static/kim-kardashian.jpg')} alt="refresh" />
                <span className="name-of">kim Kardashian</span>
                <img className="wake-up" src={require('../static/alarm-clock.svg')} alt="refresh" /><span className="time-style" onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.alarm.time}</span><br/>
                <span className="repeat-style age-gender" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="gender-icon" src={require('../static/woman.svg')} alt="refresh" />{this.props.alarm.filter.age}, {this.props.alarm.filter.gender}</span>
                <span className="country-style" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="global-img" src={require('../static/global.svg')} alt="global"/> {this.props.alarm.filter.country}</span>
                <span className="can-be">Can be weaken in 3 minutes</span>
                
            </Panel.Title>
          </Panel.Heading>

          <Panel.Collapse>
            <Panel.Body>
               {this.morningChack()}
               <p><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
               <p>Country</p>
               <ConfirmationDialog/>
               <p>Gender</p>
               {this.props.alarm.filter.age}<br/>
               {this.props.alarm.filter.gender}<br/>
               {this.props.alarm.repeat}<br/>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>

      </div>
    );
  }
}

export default SendPanels;

/*

{this.props.alarm.time}


                  {this.repeatCheck(this.props.alarm.repeat)}


                  {this.props.alarm.filter.country}

                  */