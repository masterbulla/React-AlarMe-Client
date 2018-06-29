import React, {Component} from 'react';
//import '../index.css';
import Panels from './AlarmCards'

class Get extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alarm: [
          ]
        }
        this.eachAlarm   = this.eachAlarm.bind(this);
       
      }

    componentDidMount() {
        const url ="https://alarme-app.herokuapp.com/getalarm?id=1";
        fetch(url).then((res) => {
          return res.json();
        }).then((data) => {
            
            data.getAlarm.map((data) => {
                this.setState(prevState => ({
                    alarm: [
                    ...prevState.alarm,
                    {
                        _id: data._id,
                        id: data.id,
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
            <Panels key={i} alarm={data}/>
 
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

export default Get;

/*
<p>{data.time}</p>
                <p> {data.active}</p>
                <p> {data.morningAwakning}</p>
                <p> {data.repeat}</p>
                <p> {data.filter.country}</p>
                <p> {data.filter.gender}</p>
                <p> {data.filter.age}</p>
                */