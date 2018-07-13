import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';


var Foo;


class Login extends React.Component{
  
  constructor (props, context) {
    super(props, context);
    global.GmailID = '';
    global.fullName = '';
    global.age = 0
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

    
    global.GmailID = googleId;


    axios.get(`https://alarme-app.herokuapp.com/Setting?id=${global.GmailID}`)
    .then(res => {
        global.fullName =  res.data.fullName;
        global.age = res.data.age;
    })

    //anything else you want to do(save to localStorage)...
    fetch("http://localhost:3030/profile?id="+googleUser.getId()).then((res) => {
          return res.json();
    }).then((data) => {
              console.log(data);
              localStorage.setItem('userProfile',JSON.stringify(data.profile[0].id));
    });
}

  logout() {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
          auth2.signOut();
      }
  }

  render () {
      return (
        <div>
          <p className="welcome-paragraph" >Welcome to Alarme App! Please Login with your google account</p>
          <GoogleLogin socialId="752982261918-subri23eo060sdbjn9e3sgc10c5pfvh4.apps.googleusercontent.com"
                      className="g-signin2 button-login"
                      scope="profile"
                      fetchBasicProfile={false}
                      responseHandler={this.responseGoogle}
                      buttonText="Login With Google"
                      disabledStyle/>
          <GoogleLogout
                      buttonText="Logout"
                      className="button-logout"
                      onLogoutSuccess={this.logout}>

          </GoogleLogout>
          
        </div>
      );
   }
}



export default Login;