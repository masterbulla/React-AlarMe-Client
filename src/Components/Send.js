import React, {Component} from 'react';
import SendPanels from './sendAlarmCard'


class Send extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alarm: [
          ],
          showResults: true
        }
        this.eachAlarm   = this.eachAlarm.bind(this);
       
      }

      onClickHandler = ()=>{
        this.setState(prev => ({showResults: !prev.showResults}));
      };

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
           <div key={`send-panel${i}`}> 
            { data.active ? <SendPanels key={i} alarm={data} onChange={this.update}/> : null}
           </div>
        );
      }
    
    calcul(a){
          var now = new Date();

          var first = a.time;
          first = first.replace(/\"/g, '');
          first = first.replace(/\s/g, '');
          var time = first.split(/\:|\-/g);

           var now2 = new Date();
            now2.setHours(time[0]);
            now2.setMinutes(time[1]);
            var result = Math.abs(now - now2);
            console.log(result)
                return result;

    }


    render(){
        return(
            <div>
                {this.state.alarm.sort((a, b) => {return this.calcul(a) - this.calcul(b)}).map(this.eachAlarm)}
               

            </div>
        );
    }
  
}

export default Send;

