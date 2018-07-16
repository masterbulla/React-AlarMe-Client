import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
import images from './images';
import genderImage from './gender';
import flag from './flags';
import axios from 'axios';

class SendPanels extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
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
      var now2 = new Date();
      now2.setHours(time[0]);
      now2.setMinutes(time[1]);
      if(now.getHours() > now2.getHours()){
        var res = Math.round((86400000 - Math.abs(now - now2))/1000/60/60);
        return <span>{res + "   hours"}</span>
      }
      var result;
      if(Math.round(Math.abs(now - now2)/1000/60) < 59){
        result = Math.round(Math.abs(now - now2)/1000/60);
        return <span>{result + "   minutes"}</span>
      }
      else{
        result = Math.round(Math.abs(now - now2)/1000/60/60);
        return <span>{result + "   hours"}</span>
      }
          

      // var hr, min;
      // if(now.getHours() > time[0]){
      //   hr = 24 - now.getHours() - time[0];
      // }else if(now.getHours() < time[0]){
      //   hr = 24 - time[0] - now.getHours()
      // }else{
      //   hr = 24
      // }
      // if(now.getMinutes() > time[1]){
      //   min = now.getMinutes() - time[1];
      // }else{
      //   min = time[1] - now.getMinutes();
      // }
      // hr = hr*60;
      // hr = hr + min;
      // var result = hr;
      // result = Math.round(result);
      // if(Math.abs(result) < 59){
      //   result = Math.abs(result) + "  minutes";
      //   return <span>{result}</span>
      // }else{
      //   result = result/60;
      //   result = Math.round(Math.abs(result))
      return <span>{result + "   hours"}</span>
      // }
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

  wakeup(id){

    var key= 'someoneWakeYouUp';

     axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${id}&keyupdate=${key}&valueupdate=true`)
            .then(res => {
            console.log(res);
        })

  }

  istime(identity){
    console.log(identity)
    var alerttime = this.props.alarm.time;
    alerttime = alerttime.replace(/\"/g, '');
    alerttime = alerttime.replace(/\s/g, '');
    var time = alerttime.split(/\:|\-/g);
    var now2 = new Date();
    now2.setHours(time[0]);
    now2.setMinutes(time[1]);

    if(identity){
          setInterval(function(){ 
         var now = new Date();
         if(now.getHours() == now2.getHours() && now.getMinutes() == now2.getMinutes()){
              if(document.getElementById(identity) != null){
                document.getElementById(identity).disabled = false;
                document.getElementById(identity).style.opacity = "1";
              }
            }else{
               if(document.getElementById(identity) != null){
                  console.log("test")
                  document.getElementById(identity).disabled = true;
                  document.getElementById(identity).style.opacity = "0.5";
               }
            }
       }, 3000);      
    }

  
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
                <span className="age-gender" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="gender-icon" src={this.getGenderImage(this.props.alarm.filter.gender)} alt="refresh" />{this.props.alarm.creatorAge}, {this.props.alarm.filter.gender}</span>
                <span className="country-style" onClick={ ()=> this.setState({ open: !this.state.open })}><img className="global-img" src={require('../static/global.svg')} alt="global"/> {this.props.alarm.filter.country}</span>
                <span className="can-be">Can be weaken in {this.weaken(this.props.alarm.time)} </span>
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
                <div className="text-center but-wake-up"><button id={'wake-but' + this.props.alarm.id} onClick={()=> this.wakeup(this.props.alarm.id)}>{this.istime('wake-but' + this.props.alarm.id)}wake-up</button></div>
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
