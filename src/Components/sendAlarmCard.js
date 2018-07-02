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
          <Panel.Heading>
            <Panel.Title toggle>
                <img className="profile-picture" src={require('../static/kim-kardashian.jpg')} alt="refresh" />
                <span className="name-of">kim Kardashian</span>
                <span className="time-style" onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.alarm.time}</span><br/>
                <span className="repeat-style" onClick={ ()=> this.setState({ open: !this.state.open })}><img src={require('../static/refresh.svg')} alt="refresh" />{this.repeatCheck(this.props.alarm.repeat)}</span>
                <span className="country-style" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="global-img" src={require('../static/global.svg')} alt="global"/> {this.props.alarm.filter.country}</span>
            
         
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