import React, {Component} from 'react';
import Panels from './AlarmCards'
import ReactDOM from 'react-dom';
import CreateAlarm from './CreateAlarm';

class Get extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alarm: [
          ],
          counter: 1
        }
        this.eachAlarm   = this.eachAlarm.bind(this);

       
    }

    componentDidMount() {
      
        var profile = localStorage.getItem('userProfile');

        const url ="https://alarme-app.herokuapp.com/getalarm?id=" +profile.replace(/['"]+/g, '');
        console.log("YRl: "+ url)
        fetch(url).then((res) => {
            if(res.statusText === 'Internal Server Error'){
                return 'error';
            }else
                return res.json();    
            
        }).then((data) => {
            if(data === 'error'){
                console.log("error to get alarm");
                return 0 ;
            }
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

    removeComponent(data){ 
        var remvComponent = ReactDOM.findDOMNode(data).parentNode;
        ReactDOM.unmountComponentAtNode(remvComponent);

    }

    componentWillReceiveProps(){
        this.state.alarm.map(()=>{
            ReactDOM.render(<CreateAlarm key={123}  onChange={this.removeComponent}/>, document.getElementById('c'));
            return 0;
        });    
    }
    
    render(){
        return(
            <div>
                <div id="c"></div>
                {this.state.alarm.map(this.eachAlarm)}
            </div>
        );
    }
}

export default Get;
