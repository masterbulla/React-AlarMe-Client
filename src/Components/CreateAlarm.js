import {Panel} from 'react-bootstrap';
import React from 'react';
import '../CreateAlarm.css';
import ConfirmationDialog from './Country';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Switch from '@material-ui/core/Switch';





class CreateAlarm extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      open: false,
      checkedB: true,
      country: 'Israel',
      min: 0,
      max: 120,

    };
  }

 //remove the component
  removeComponent(){
    this.props.onChange(this)
  }


  //switch handle morning awk
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    
    if(event.target.checked === false){
        /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=active&valueupdate=false`)
        .then(res => {
          console.log(res);
        })*/
        console.log(event.target.checked);
      }
    else{
       /* axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=active&valueupdate=true`)
        .then(res => {
          console.log(res);
        })*/
        console.log(event.target.checked);
    }
  };

  //country update
 countryupdate = (Country) => {
  console.log(Country);
  /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=filter.country&valueupdate=${Country}`)
  .then(res => {
    console.log(res);
  })*/
}


//gender chack 
activeGender(e){
  if(e.target.className === 'noActiveAlarm'){
    e.target.className = 'activeAlarm'
    console.log(e.target);
  }
  else{
    e.target.className = 'noActiveAlarm'
    console.log(e.target)
  }
    
}

//age range change
onSliderChange = (value) => {
  this.setState({min: value[0], max: value[1]});
  var temp = `${value[0]}-${value[1]}`;               //put to DB
  console.log(temp);
  /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=filter.age&valueupdate=${temp}`)
  .then(res => {
    console.log(res);
  })*/
}

//day chack  
activerepeat(e, type){
  console.log(type);
  if(e.target.className === 'noActiveDayAlarm'){
        e.target.className = 'activeDayAlarm'
        /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=repeat.${type}&valueupdate=true`)
        .then(res => {
          console.log(res);
        })*/
   }
  else{
        e.target.className = 'noActiveDayAlarm';
        /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${this.props.alarm._id}&keyupdate=repeat.${type}&valueupdate=false`)
        .then(res => {
          console.log(res);
        })*/
   
  }
}


  
  render() {
    return (
      <div>
        <Panel className="panelAlarm" id="collapsible-panel-example-2"  defaultExpanded>
              <Panel.Heading>
                        <div onClick={()=> this.removeComponent()} className="removeAlarm">Delete</div>
                        <div className = "saveAlarm" >Save</div>
                          <span className="createTimeAlarm">
                            10:00
                          </span><br/>
                          <hr/>
                          <div className="Morning">
                              <span className="MorningAlarm"><img src={require('../static/morning.svg')} alt="alarm"/>Morning Awakening</span>
                              <Switch checked={this.state.checkedB} onChange={this.handleChange('checkedB')}  value="checkedB" color="primary" className="switchAlarm"/>
                          </div>
                          <p className="filterAlarm"><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
                          <p className="countryAlarm">Country</p>
                          <ConfirmationDialog onChange={this.countryupdate} route={this.state.country}/>
                          <p className="pickGender">Gender</p> 
                          <div className="noActiveAlarm"   onClick={(e) => this.activeGender(e,this)}>Female</div>
                          <div className="noActiveAlarm"    onClick={(e) => this.activeGender(e, this)}>Male</div>
                          <p className="ageAlarm">Age<span>{this.state.min} - {this.state.max}</span></p>
                          <Range  className="rangeAlarm"  defaultValue={[this.state.min, this.state.max]} min={0} max={120} onChange={this.onSliderChange}/>

                          <p className="repeatAlarm"><img src={require('../static/repeat.svg')} alt="volume"/>Repeat</p>
                          <div className="noActiveDayAlarm"   onClick={(e) => this.activerepeat(e, 'monday')}>M</div>
                          <div className="noActiveDayAlarm"  onClick={(e) => this.activerepeat(e, 'tuesday')}>T</div>
                          <div className="noActiveDayAlarm"   onClick={(e) => this.activerepeat(e,'wednesday')}>W</div>
                          <div className="noActiveDayAlarm"   onClick={(e) => this.activerepeat(e, 'thursday')}>T</div>
                          <div className="noActiveDayAlarm"    onClick={(e) => this.activerepeat(e, 'friday')}>F</div>
                          <div className="noActiveDayAlarm"    onClick={(e) => this.activerepeat(e, 'saturday')}>S</div>
                          <div className="noActiveDayAlarm"    onClick={(e) => this.activerepeat(e, 'sunday')}>S</div>  




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
              </Panel.Heading>
              <Panel.Collapse>
                    <Panel.Body>
                          
                    </Panel.Body>
              </Panel.Collapse>
        </Panel>

      </div>
    );
  }
}

export default CreateAlarm;
