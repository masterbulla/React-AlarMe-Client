import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login-component';


class Login extends React.Component{
 
  constructor (props, context) {
      super(props, context);
    this.state = {
            profile: [
          ]
        }

    this.onSignIn = this.onSignIn.bind(this);
  }
 
  componentWillMount(){
    var profile = localStorage.getItem('userProfile');
        console.log(profile)
        const url = "https://alarme-app.herokuapp.com/profile?id=" + profile.replace(/['"]+/g, '');

        fetch(url).then((res) => {
            if(res.statusText === 'Internal Server Error')
                return 'error';
            return res.json();
        }).then((data) => {
            if(data === 'error'){
                console.log("error to get user profile. Please try again later.");
                return 0 ;
            }
            data.profile.map((data) => {
                this.setState(prevState => ({
                    profile: [
                    ...prevState.profile,
                    {
                        stars: data.setting.stars,
                        review: data.setting.reviews,
                        ringtone: data.setting.nationalRington,
                        friendAlert: data.setting.friendAlert,
                        id: data.id,
                        morningTip: data.setting.morningTip,
                        fullname: data.fullName,
                        age: data.age,
                        picture: data.pic,
                        country: data.country,
                        gender: data.gender
                    }]
                }))
                console.log(this.state.profile[0].picture)
                return 0;
            })
        })
  }


 onSignIn(googleUser) {
  console.log("test")
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}



  render () {
    return (  

          <div className="g-signin2" data-onsuccess="onSignIn"></div>
     
    );
  }
 
}
 
export default Login;