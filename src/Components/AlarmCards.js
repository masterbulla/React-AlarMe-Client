import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
import ConfirmationDialog from './Country';
import CircularProgressbar from 'react-circular-progressbar';



class Panels extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };

    this.repeatCheck  = this.repeatCheck.bind(this);
    this.morningChack = this.morningChack.bind(this);
    this.activeGender = this.activeGender.bind(this);
    this.calculateSleptTime = this.calculateSleptTime.bind(this);
    this.genderChack = this.genderChack.bind(this);
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
      return <p><img src={require('../static/morning.svg')} alt="alarm"/>Morning Awakening</p>
    }else{
      return <p></p>
    }
  }

  //gender chack 
  activeGender(e){
    if(e.target.className == 'noActive')
        e.target.className = 'active'
    else
      e.target.className = 'noActive'
  }
  genderChack(gender, type ){
      if(gender == type)
        return 'active'
      else  
        return 'noActive'

  }

   //day chack  -צריך לסדר את הימים בשרת כדי שיהיה נוח לבצע עדכון וחיפוש 
   activerepeat(e){
    if(e.target.className == 'noActiveDay')
        e.target.className = 'activeDay'
    else
      e.target.className = 'noActiveDay'
  }
  repeatChack(repeat, type ){
    
    for(var i=0;i<repeat.length;i++){
      console.log(repeat[0]);
      if(repeat == type)
        return 'activeDay'
      else  
        return 'noActiveDay'
    }
  }

  //calculate sleep time
  calculateSleptTime(){
    //takes the date of the alarm and removes quotes or spaces
    var s  = this.props.alarm.time;
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
    const percentage = this.calculateSleptTime();
    return (
      <div>
        <Panel  id="collapsible-panel-example-2"  defaultExpanded={this.state.open}>
          <Panel.Heading>
            <Panel.Title toggle>
              <div className="circularProgressbar">
                  <CircularProgressbar percentage={percentage} text={`${percentage}\nHR`} strokeWidth={10}/>
              </div>
              <span onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.alarm.time}</span><br/>
              <span onClick={ ()=> this.setState({ open: !this.state.open })}><img src={require('../static/refresh.svg')} alt="refresh" />{this.repeatCheck(this.props.alarm.repeat)}</span>
              <span onClick={ ()=> this.setState({ open: !this.state.open })}><img src={require('../static/global.svg')} alt="global"/> {this.props.alarm.filter.country}</span>
              <hr />
            </Panel.Title>
          </Panel.Heading>

          <Panel.Collapse>
            <Panel.Body>
               {this.morningChack()}
               <p><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
               <p>Country</p>
               <ConfirmationDialog/>

               <p>Gender</p> <div className={this.genderChack(this.props.alarm.filter.gender, "F")}   onClick={(e) => this.activeGender(e,this)}>Female</div><div className={this.genderChack(this.props.alarm.filter.gender, "M")}    onClick={(e) => this.activeGender(e, this)}>Male</div>
               
               <p>Age</p>
               <p><img src={require('../static/repeat.svg')} alt="volume"/>Repeat</p>
               {console.log()}
               <div className={this.repeatChack(this.props.alarm.repeat, "M")}   onClick={(e) => this.activerepeat(e,this)}>M</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "T")}   onClick={(e) => this.activerepeat(e,this)}>T</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "W")}   onClick={(e) => this.activerepeat(e,this)}>W</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "T")}   onClick={(e) => this.activerepeat(e,this)}>T</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "F")}   onClick={(e) => this.activerepeat(e,this)}>F</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "S")}   onClick={(e) => this.activerepeat(e,this)}>S</div>
               <div className={this.repeatChack(this.props.alarm.repeat, "S")}   onClick={(e) => this.activerepeat(e,this)}>S</div>
                              
            </Panel.Body>
          </Panel.Collapse>
        </Panel>

      </div>
    );
  }
}

export default Panels;
