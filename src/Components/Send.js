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
        const url ="https://alarme-app.herokuapp.com/sendalarm?id=1";
        fetch(url).then((res) => {
          return res.json();
        }).then((data) => {
            
            data.sendAlarm.map((data) => {
                this.setState(prevState => ({
                    alarm: [
                    ...prevState.alarm,
                    {
                        
                    
                        time: data.time,
                        active: data.active,
                        morningAwakning: data.morningAwakning,
                        repeat: [data.repeat],
                        filter: {country: data.filter.country, gender: data.filter.gender, age: data.filter.age }
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

