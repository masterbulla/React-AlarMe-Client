import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
import ConfirmationDialog from './Country';
import images from './images';
import genderImage from './gender';
import flag from './flags'

class SendPanels extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };

    this.repeatCheck = this.repeatCheck.bind(this);
    this.morningChack = this.morningChack.bind(this);
    this.calculateSleptTime = this.calculateSleptTime.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  repeatCheck(){
    if(this.props.alarm.repeat.length == null){
      console.log('null');
    }
    else{
      return <small>Repeat</small>
    }
  }

  getImage(id){
    return (images[id])
  }

  getGenderImage(gender){
      return (genderImage[gender])
  }

  getFlagImage(country){
      return (flag[country])
  }
  morningChack(){
    if(this.props.alarm.morningAwakning === true){
      return <p><img src={require('../static/alarm-clock.svg')} alt="alarm"/>Morning Awakening</p>
    }else{
      return <p></p>
    }
  }

  weaken(alartime){
    var now = new Date();
    alartime= alartime.replace(/\"/g, '');
    alartime = alartime.replace(/\s/g, '');
    var time = alartime.split(/\:|\-/g);
    var hr, min;
    if(now.getHours() > time[0]){
       hr = now.getHours() - time[0];
    }else{
       hr = time[0] - now.getHours();
    }
    if(now.getMinutes() > time[1]){
      min = now.getMinutes() - time[1];
    }else{
      min = time[1] - now.getMinutes();
    }
    hr = hr*60;
    hr = hr + min;
    var result = hr;
    result = Math.round(result);
    return <span>{result}</span>
  }

  calculateSleptTime(){
      //takes the date of the alarm and removes quotes or spaces
    var s  = this.props.alarm.sleepTime;
    s = s.replace(/\"/g, '');
    s = s.replace(/\s/g, '');

    //split the time to hours and minutes
    var time = s.split(/\:|\-/g);
    var dat = new Date();
    dat.setHours(time[0]);
    dat.setMinutes(time[1]);

    //calculate the sleep time from now to the set alarm time
    var d = new Date();
    if(d.getHours() > dat.getHours()){
        d.setHours(d.getHours() - dat.getHours());    
    }else{
        d.setHours(dat.getHours() - d.getHours());  
    }
    if(d.getMinutes() > dat.getMinutes()){
        d.setMinutes(d.getMinutes() - dat.getMinutes());
    }else{
        d.setMinutes(dat.getMinutes() - d.getMinutes());
    }
    var result = d.getHours() +':'+ d.getMinutes();
    return <span>{result}</span>
  }

  
  render() {
    return (
      <div>
        <Panel ontoggle={this.state.open} id="collapsible-panel-example-2"  expanded={this.state.open}>
          <Panel.Heading className={{ 'opacity0': this.state.open }}>
            <Panel.Title toggle>
                <img className="profile-picture" src={this.getImage(this.props.alarm.creatorName)} alt="refresh" />
                <span className="name-of">{this.props.alarm.creatorName}</span>
                <img className="wake-up" src={require('../static/alarm-clock.svg')} alt="refresh" /><span className="time-style" onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.alarm.time}</span><br/>
                <span className="age-gender" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="gender-icon" src={this.getGenderImage(this.props.alarm.filter.gender)} alt="refresh" />{this.props.alarm.filter.age}, {this.props.alarm.filter.gender}</span>
                <span className="country-style" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="global-img" src={require('../static/global.svg')} alt="global"/> {this.props.alarm.filter.country}</span>
                <span className="can-be">Can be weaken in {this.weaken(this.props.alarm.time)} minutes</span>
                
            </Panel.Title>
          </Panel.Heading>

          <Panel.Collapse>
            <Panel.Body>
              <div>
                <div>
                  <div className="width-25-percent pos-20px-bottom">
                    <div className="D8D8D8-color">Sleep Time</div>
                    <div className="color-626A7C">{this.calculateSleptTime()}</div>
                    <div className="margin-bottom-25px color-626A7C">HRS</div>
                    <div className="D8D8D8-color">Gender</div>
                    <div>
                      <img className="gender-icon color-626A7C" src={require('../static/woman.svg')} alt="woman" />
                      <span className="color-626A7C">{this.props.alarm.filter.gender}</span>
                    </div>
                  </div>
                  <div className="width-50-percent">
                    <img className="main-picture" src={this.getImage(this.props.alarm.creatorName)}  alt="kim-kardashian" />
                  </div>
                  <div className="width-25-percent pos-40px-bottom">
                    <div className="D8D8D8-color">Country</div>
                    <div className="margin-bottom-5px">
                      <img className="flag-icon" src={this.getFlagImage(this.props.alarm.filter.country)} alt="usa" />
                    </div>
                    <div className="top-17px D8D8D8-color">Age</div>
                    <div className="top-17px color-626A7C">{this.props.alarm.creatorAge}</div>
                  </div>
                </div>
                <div className="text-center"><span className="name-main">{this.props.alarm.creatorName}</span></div>
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