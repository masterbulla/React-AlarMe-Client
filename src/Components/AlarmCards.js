import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
import ConfirmationDialog from './Country';
import CircularProgressbar from 'react-circular-progressbar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';




class Panels extends React.Component {
  constructor(props, context) {
    super(props, context);

    var string = this.props.alarm.filter.age;
    var numbers = string.match(/\d+/g).map(Number);     //for Client side
  
    this.state = {
      open: false,
      checkedB: true,
      min: numbers[0],
      max: numbers[1],
      textFieldValue: '',
      time: this.props.alarm.time,
      country: this.props.alarm.filter.country
    };

    this.repeatCheck  = this.repeatCheck.bind(this);
    this.morningChack = this.morningChack.bind(this);
    this.activeGender = this.activeGender.bind(this);
    //this.calculateSleptTime = this.calculateSleptTime.bind(this);
    this.genderChack = this.genderChack.bind(this);


  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    if(event.target.checked === false){
        axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=active&valueupdate=false`)
        .then(res => {
          console.log(res);
        })
    }
    else{
        axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=active&valueupdate=true`)
        .then(res => {
          console.log(res);
        })
    }
  };



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
    if(e.target.className === 'noActive'){
      e.target.className = 'active'
      //console.log(e.target);
    }
    else{
      e.target.className = 'noActive'
      //console.log(e.target)
    }
      
  }
  genderChack(gender, type ){
      if(gender === type){
        //console.log(gender.target);
        return 'active'

      }
      else  {
        //console.log(gender.target);
        return 'noActive'

      }

  }

  
  //calculate sleep time
 /* calculateSleptTime(){
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
}*/


//time handle
// handleClose = () => {
//   this.setState({ open: false, time: this.props.alarm.time });
// };
// handleAccapt = (data) => {
//   axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${data.props.alarm._id}&keyupdate=time&valueupdate=${this.state.time}`)
//   .then(res => {
//     console.log(res);
//   })
//   this.setState({open: false });
// };


//country update
// countryupdate = (Country) => {
//   this.setState({country: Country})
//   axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=filter.country&valueupdate=${Country}`)
//   .then(res => {
//     console.log(res);
//   })
// }

//day chack  
activerepeat(e, type){
  if(e.target.className === 'noActiveDay'){
        e.target.className = 'activeDay'
        axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=repeat.${type}&valueupdate=true`)
        .then(res => {
          console.log(res);
        })
   }
  else{
        e.target.className = 'noActiveDay';
        axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=repeat.${type}&valueupdate=false`)
        .then(res => {
          console.log(res);
        })
   
  }
}
repeatChack(repeat, type ){
  if(repeat[type] === true)
    return 'activeDay'
  else{
    return 'noActiveDay'
  }
}

onSliderChange = (value) => {
    this.setState({min: value[0], max: value[1]});
    var temp = `${value[0]}-${value[1]}`;               //put to DB

    axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=filter.age&valueupdate=${temp}`)
    .then(res => {
      console.log(res);
    })
}


  render() {
    //const percentage = this.calculateSleptTime();
    
    const percentage = 10;
    return (
      <div>
        <Panel id="collapsible-panel-example-2"  defaultExpanded={this.state.open}>
              <Panel.Heading>
                <Switch checked={this.state.checkedB} onChange={this.handleChange('checkedB')} value="checkedB" color="primary" className="switch"/>
                    <Panel.Title toggle>
                          <div className="circularProgressbar">
                                <CircularProgressbar percentage={percentage} text={`${percentage}\nHR`} strokeWidth={10}/>
                          </div>
                          <span className="timeSpan" onClick={(e)=> this.setState({open: true })}>
                                {this.state.time}
                          </span><br/>
                          
                          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                  <DialogContent>
                                        <DialogContentText>
                                          To subscribe to this website, please enter your email address here. We will send
                                          updates occasionally.
                                        </DialogContentText>
                                        <TextField autoFocus margin="dense" id="name" label="time Address" type="time" fullWidth onChange={(event, newValue) => this.setState({time: event.target.value})}/>
                                  </DialogContent>
                                  <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                          Cancel
                                        </Button>
                                        <Button onClick={(e) => this.handleAccapt(this)} color="primary">
                                          Subscribe
                                        </Button>
                                  </DialogActions>
                          </Dialog>
                          <div className="iconDiv">
                              <span><img src={require('../static/global.svg')} alt="global" /> {this.state.country}</span>
                              <span><img src={require('../static/refresh.svg')} alt="refresh"/>{this.repeatCheck(this.props.alarm.repeat)}</span>
                          </div>
                          <hr />
                    </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                    <Panel.Body>
                          {this.morningChack()}
                          <p><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
                          <p>Country</p>
                          <ConfirmationDialog onChange={this.countryupdate} route={this.state.country}/>

                          <p>Gender</p> <div className={this.genderChack(this.props.alarm.filter.gender, "F")}   onClick={(e) => this.activeGender(e,this)}>Female</div><div className={this.genderChack(this.props.alarm.filter.gender, "M")}    onClick={(e) => this.activeGender(e, this)}>Male</div>
                          
                          <p>Age<span>{this.state.min} - {this.state.max}</span></p>
                          <p><img src={require('../static/repeat.svg')} alt="volume"/>Repeat</p>
                          {console.log()}
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'monday')}   onClick={(e) => this.activerepeat(e, 'monday')}>M</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'tuesday')}   onClick={(e) => this.activerepeat(e, 'tuesday')}>T</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'wednesday')}   onClick={(e) => this.activerepeat(e,'wednesday')}>W</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'thursday')}   onClick={(e) => this.activerepeat(e, 'thursday')}>T</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'friday')}   onClick={(e) => this.activerepeat(e, 'friday')}>F</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'saturday')}   onClick={(e) => this.activerepeat(e, 'saturday')}>S</div>
                          <div className={this.repeatChack(this.props.alarm.repeat[0], 'sunday')}   onClick={(e) => this.activerepeat(e, 'sunday')}>S</div>    
                          <Range  className="range"  defaultValue={[this.state.min, this.state.max]} min={0} max={120} onChange={this.onSliderChange}/>
                    </Panel.Body>
              </Panel.Collapse>
        </Panel>

      </div>
    );
  }
}

export default Panels;


/*
onClick={ ()=> this.setState({ open: !this.state.open })}

<TextField
                      id="time"
                      type="time"
                      className="textField"
                      defaultValue={this.props.alarm.time}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />






                    <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To subscribe to this website, please enter your email address here. We will send
                      updates occasionally.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="time Address"
                      type="time"
                      fullWidth
                      onChange={(event, newValue) => this.setState({time: event.target.value})}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={console.log('dfdf')} color="primary">
                      Subscribe
                    </Button>
                  </DialogActions>
                </Dialog>

*/