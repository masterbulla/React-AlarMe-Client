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
              <div>
                <div>
                  <div className="width-25-percent pos-20px-bottom">
                    <div className="D8D8D8-color">Sleep Time</div>
                    <div className="color-626A7C">4.8</div>
                    <div className="margin-bottom-25px color-626A7C">HRS</div>
                    <div className="D8D8D8-color">Gender</div>
                    <div>
                      <img className="gender-icon color-626A7C" src={require('../static/woman.svg')} alt="woman" />
                      <span className="color-626A7C">{this.props.alarm.filter.gender}</span>
                    </div>
                  </div>
                  <div className="width-50-percent">
                    <img className="main-picture" src={require('../static/kim-kardashian.jpg')} alt="kim-kardashian" />
                  </div>
                  <div className="width-25-percent pos-40px-bottom">
                    <div className="D8D8D8-color">Country</div>
                    <div className="margin-bottom-5px">
                      <img className="flag-icon" src={require('../static/united-states.svg')} alt="usa" />
                    </div>
                    <div className="top-17px D8D8D8-color">Age</div>
                    <div className="top-17px color-626A7C">{this.props.alarm.filter.age}</div>
                  </div>
                </div>
                <div className="text-center"><span className="name-main">kim Kardashian</span></div>
                <div className="text-center D8D8D8-color">{this.props.alarm.time} {this.morningChack()}</div>
                <div className="text-center but-wake-up"><button>wake-up</button></div>
                <div className="text-center D8D8D8-color"><span>Skip Kim</span></div>
              </div>

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

               {this.morningChack()}
               <p><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
               <p>Country</p>
               <ConfirmationDialog/>
               <p>Gender</p>
               {this.props.alarm.filter.age}<br/>
               {this.props.alarm.filter.gender}<br/>
               {this.props.alarm.repeat}<br/>
                  */