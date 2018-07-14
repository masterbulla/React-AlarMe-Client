import React, {Component} from 'react';
//import {NavLink} from 'react-router-dom';
import SendPanels from './sendAlarmCard'

class Send extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alarm: [
          ]
        }
        this.eachAlarm   = this.eachAlarm.bind(this);
       
      }

    componentDidMount() {

        var url = null;
        var profile = global.GmailID;

        if(profile === null)
            url ="https://alarme-app.herokuapp.com/sendalarm?id=";
        else
            url ="https://alarme-app.herokuapp.com/sendalarm?id="+profile;

        fetch(url).then((res) => {
            if(res.statusText === 'Internal Server Error')
                return 'error';
            return res.json();
        }).then((data) => {
            if(data === 'error'){
                console.log("error to get send alarm");
                return 0 ;
            }
            data.sendAlarm.map((data) => {
                this.setState(prevState => ({
                    alarm: [
                    ...prevState.alarm,
                    {
                        time: data.time,
                        active: data.active,
                        morningAwakning: data.morningAwakning,
                        repeat: [data.repeat],
                        filter: {country: data.filter.country, gender: data.filter.gender, age: data.filter.age },
                        creatorName: data.creatorName,
                        creatorAge: data.creatorAge,
                        sleepTime: data.sleepTime
                    }]
                }))
                return 0;
            })
        })
      }

      eachAlarm (data ,i) {
        return (
            <SendPanels key={i} alarm={data}/>
 
        );
      }
    


    render(){
        return(
            <div>
                {this.state.alarm.map(this.eachAlarm)}
               

            </div>
        );
    }
  
}

export default Send;

