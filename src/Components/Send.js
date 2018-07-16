import React, {Component} from 'react';
import SendPanels from './sendAlarmCard';
import images from './images';

class Send extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alarm: [
          ],
          showResults: true,
          popover: false
        }
        this.eachAlarm   = this.eachAlarm.bind(this);
        this.getImage    = this.getImage.bind(this);
        this.getSend     =  this.getSend.bind(this);
      }

      onClickHandler = ()=>{
        this.setState(prev => ({showResults: !prev.showResults}));
      };

      showPopover = ()=>{
        this.setState(prev => ({popover: !prev.popover}));
      };

    componentDidMount() {

        var url = null;
        var profile = global.GmailID;

        if(profile === null)
            url ="https://alarme-app.herokuapp.com/sendalarms?id=";
        else
            url ="https://alarme-app.herokuapp.com/sendalarms?id="+profile;

        fetch(url).then((res) => {
            if(res.statusText === 'Internal Server Error')
                return 'error';
            console.log(res);
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
                        sleepTime: data.sleepTime,
                        weaken: data.someoneWakeYouUp,
                        id: data._id
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
            var result;

            if(now.getHours() > now2.getHours()){
                result = 86400000 - Math.abs(now - now2);
            }else{
                result = Math.abs(now - now2);
            }
                return result;
    }

    checkIfAwake(){
        var profile = global.GmailID;
        var url ="https://alarme-app.herokuapp.com/getalarm?id="+profile;

        setInterval(function(){ 
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
                if(data.someoneWakeYouUp == true){
                    var result = "OPEN CALL";
                        var url2 ="https://alarme-app.herokuapp.com/getalarmbyid?id="+data._id;
                         fetch(url2).then((res) => {
                                if(res.statusText === 'Internal Server Error'){
                                    return 'error';
                                }else{

                                       return res.json();    
                                }
                                
                            }).then((result)=>{
                                var res = result.alarmbyid[0].creatorName;
                                //document.getElementById('imgpic').src = this.getImage(result.alarmbyid[0].creatorName)
                           
                             return  `<div>${res}</div>`
                            })
                        
                    }else{
                        return 0;
                    }
                }
            )

    })}, 3000);
    }

    getImage(id){console.log(id)
        return (images[id]);
    }

    getSend(){
        return(
            <div>
                <div id="popover" className={"btn-group pull-right " + (this.checkIfAwake() == 0  ? 'hidden' : 'show call-popover')}> 
                    <div className="inside-div">
                        <img id="imgpic" className="img-pic" src={require('../static/manuser.svg')}/>
                        <div className="call-counter">00:03</div>
                        <div className="calling">
                            <img id="imgpic" className="clock" src={require('../static/alarm-clock.svg')}/>
                            <span >Calling...</span>
                            <div>{this.checkIfAwake()}</div>
                            <div>
                                <img className="lamp" src={require('../static/creative.svg')}/>
                                <span className="tip">Tip!</span>
                                <span className="tip-text">Good Morning!</span>
                            </div>    
                            <div className="parent-hang-div">
                                <img id="imgpic" className="width-55-px" src={require('../static/mute.svg')}/>
                                <img id="imgpic" className="hang width-55-px" src={require('../static/hang.svg')}/>
                                <img id="imgpic" className="width-55-px" src={require('../static/speaker.svg')}/>
                            </div>
                            <div className="div-mute">
                                <span className="mute-style">mute</span>
                                <span className="end-style">end</span>
                                <span className="speaker-style">speaker</span>
                            </div>
                        </div>        
                    </div>
                </div>
        </div>
        );
    }

    render(){
        return(
            <div>
                {this.state.popover ? this.getSend(): null}
                {this.state.alarm.sort((a, b) => {return this.calcul(a) - this.calcul(b)}).map(this.eachAlarm)}
           </div>
        );
    }
  
}

export default Send;

