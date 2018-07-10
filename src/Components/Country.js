import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const options = [
  'Israel',
  'Russia',
  'US',
  'French',
  'India',
  'Argentina',
  'Brasil',
  'Spain',
  'Canada',
  'Jamaica',
  'Sedna',
  'Romania',
  'Paraguay',
  'Norway',
];

class ConfirmationDialogRaw extends React.Component {
  radioGroup = null;

  constructor(props) {
    super(props);
    
    this.state.value = this.props.value;
  }

  state = {};

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
  country: {
      position: 'absolute',
      left: '-5px',
      marginBottom: '500px'
  },
  dynamicCircle: {
    float: 'left',
    backgroundColor: '#0065ff',
    borderRadius: '21.5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, .4)',
    width: '109px',
    height: '43px',
    fontFamily: 'BPrepalyBold',
    color: '#FFFFFF',
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16.25px',
    fontWeight: '700',
    letterSpacing: '.92625px'
  },
  countryPick: {
    float: 'left',
    backgroundColor: '#0065ff',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, .4)',
    width: '43px',
    height: '43px',
    margin: '5px 0px 0 5px ',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'BPrepalyBold',
    color: '#FFFFFF',
    fontSize: '24.25px',
    fontWeight: '700',
    letterSpacing: '.9215px'
  }
});

class ConfirmationDialog extends React.Component {
  button = null;

  state = {
    open: false,
    value: this.props.route,
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    /*axios.get(`https://alarme-app.herokuapp.com/updatealarm?id=${data.props.alarm._id}&keyupdate=filter.country&valueupdate=${value}`)
    .then(res => {
      console.log(res);
    })*/
    this.setState({ value, open: false });
    this.props.onChange(value);

  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem onClick={this.handleClickListItem}>
            <div className={classes.country} >
                <div className={classes.dynamicCircle}>{this.state.value}</div>
                <div className={classes.countryPick}>+</div>
            </div>
          </ListItem>
          <ConfirmationDialogRaw
            classes={{
              paper: classes.paper,
            }}
            open={this.state.open}
            onClose={this.handleClose}
            value={this.state.value}
          />
        </List>
      </div>
    );
  }
}

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);