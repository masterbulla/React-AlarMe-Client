import {Panel} from 'react-bootstrap';
import React from 'react';
import '../index.css';
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




class CreateAlarm extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      open: false,
    };
  }

  removeComponent(){
    this.props.onChange(this)
  }

  
  render() {
    return (
      <div>
        <Panel id="collapsible-panel-example-2"  defaultExpanded>
              <Panel.Heading>
                    <Panel.Title>
                        <div onClick={()=> this.removeComponent()}>Delete</div>

                          <span className="timeSpan" onClick={(e)=> this.setState({open: true })}>
                                10:00
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
                    </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                    <Panel.Body>
                          <p><img src={require('../static/volume-bars.svg')} alt="volume"/> Filter Alarm personal</p>
                          <p>Country</p>
                          <ConfirmationDialog onChange={this.countryupdate} route={this.state.country}/>

                          <p>Gender</p>
                           <div >Female</div>
                          <div>Male</div>
                          
                          <p>Age<span>{this.state.min} - {this.state.max}</span></p>
                          <p><img src={require('../static/repeat.svg')} alt="volume"/>Repeat</p>
                          {console.log()}
                          <div >M</div>
                          <div >T</div>
                          <div >W</div>
                          <div >T</div>
                          <div >F</div>
                          <div >S</div>
                          <div >S</div>    
                          <Range   min={0} max={120} onChange={this.onSliderChange}/>
                    </Panel.Body>
              </Panel.Collapse>
        </Panel>

      </div>
    );
  }
}

export default CreateAlarm;
