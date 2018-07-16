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
        active: true,
        time: "00:00",
        age: "",
        gender: 'M',
        repeat: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      };
  }

//Time pick
 handleClose = () => {
  this.setState({ open: false});
};
handleAccapt = (data) => {
    this.setState({time: data.state.time});
    this.setState({open: false });
};

 //Removeing the component
  removeComponent(){
      this.props.onChange(this)
  }

  //Switch handle morning awk (on\off)
  handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
      if(event.target.checked === false){
          this.setState({active: false})
        }
      else{
          this.setState({active: true})
      }
  };

  //Country update
  countryupdate = (Country) => {
     this.setState({country: Country});
  }


//Gender (M\F) 
activeGender(e){
    var gender  = e.target;
    var temp = gender.innerText
    
    
    if(e.target.className === 'noActiveAlarm'){
      e.target.className = 'activeAlarm'
      this.setState({gender: temp[0]});
    }
    else{
      e.target.className = 'noActiveAlarm'
    }
}

//Age range change
onSliderChange = (value) => {
    this.setState({min: value[0], max: value[1]});
    var temp = `${value[0]}-${value[1]}`;               //put to DB
    this.setState({age: temp});                            
}

//Day repaeat chack  
activerepeat(e, type){
    if(e.target.className === 'noActiveDayAlarm'){
          e.target.className = 'activeDayAlarm';
          this.state.repeat[type] = true;
    }
    else{
          e.target.className = 'noActiveDayAlarm';
          this.state.repeat[type] = false;
    }
}

//Save Alarm
saveAlarm(){
    axios.post(`https://alarme-app.herokuapp.com/insertalarm`,{ 
          "filter": {
            "country": this.state.country,
            "gender": this.state.gender,
            "age": this.state.age
          },
          "repeat": {
              "monday": this.state.repeat.monday,
              "tuesday":  this.state.repeat.tuesday,
              "wednesday":  this.state.repeat.wednesday,
              "thursday":  this.state.repeat.thursday,
              "friday":  this.state.repeat.friday,
              "saturday":  this.state.repeat.saturday,
              "sunday":  this.state.repeat.sunday
          },
          "id": global.GmailID,
          "time": this.state.time,
          "active": true,
          "morningAwakning": this.state.active,
          "creatorName": global.fullName,
          "creatorAge": global.age,
          "sleepTime": "12:51",
      })
      .then(res => {
          this.removeComponent()
          console.log(res);
      })
}


  
  render() {
      return (
        <div>
          <Panel className="panelAlarm" id="collapsible-panel-example-2"  defaultExpanded>
                <Panel.Heading>
                          <div onClick={()=> this.removeComponent()} className="removeAlarm">Delete</div>
                          <div className = "saveAlarm" onClick={() => this.saveAlarm()}>Save</div>
                            <span className="createTimeAlarm" onClick={(e)=> this.setState({open: true })}>
                              {this.state.time}
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
                                <DialogTitle id="form-dialog-title">Create New Alarm</DialogTitle>
                                    <DialogContent>
                                          <TextField autoFocus margin="dense" id="name" label="time Address" type="time" fullWidth onChange={(event, newValue) => this.setState({time: event.target.value})}/>
                                    </DialogContent>
                                    <DialogActions>
                                          <Button onClick={this.handleClose} color="primary">
                                            Cancel
                                          </Button>
                                          <Button onClick={(e) => this.handleAccapt(this)} color="primary">
                                            Create
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
