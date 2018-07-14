import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import {Form,FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

class Login extends React.Component{

  responseGoogle (googleUser) {
      var googleId = googleUser.getId();
      var BasicProfile = googleUser.getBasicProfile();

      
      global.GmailID = googleId;


      axios.get(`https://alarme-app.herokuapp.com/Setting?id=${global.GmailID}`)
      .then(res => {
          global.fullName =  res.data.fullName;
          global.age = res.data.age;
          console.log(global.age);
          console.log(res.data.fullName);
      })
      console.log(googleUser.getId())
      //anything else you want to do(save to localStorage)...
      fetch("https://alarme-app.herokuapp.com/profile?id="+googleUser.getId()).then((res) => {

            return res.json();
      }).then((data) => {
                if(data.profile.length === 0){
                  console.log('User Not Found');
                  return 0;
                }
                localStorage.setItem('userProfile',JSON.stringify(data.profile[0].id));
      });
  }


  logout() {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
          auth2.signOut();
          global.GmailID = null;
      }
  }

  render () {
      return (
        <div className="login-div">
          <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
              </FormGroup>
              <FormGroup>
                  <Col componentClass={ControlLabel} sm={2} className="forgat-login">
                    Forget Password
                  </Col>
                  <Col smOffset={2} sm={10}>
                    <button className="login-div-button">Sign in</button>
                  </Col>
              </FormGroup>
          </Form>
          <p>or</p>
          <GoogleLogin socialId="752982261918-subri23eo060sdbjn9e3sgc10c5pfvh4.apps.googleusercontent.com"
                      className="g-signin2 button-login"
                      scope="profile"
                      fetchBasicProfile={false}
                      responseHandler={this.responseGoogle}
                      buttonText="Login With Google"
                      style = {{
                        width: 180,
                        display: 'block',
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderRadius: 2,
                        paddingLeft: 0,
                        margin: '5px auto',
                        fontFamily: 'BPrepalyBold',

                      }}
                      />
          <GoogleLogout
                      buttonText="Logout"
                      className="button-logout"
                      onLogoutSuccess={this.logout}
                      style = {{
                        width: 90,
                        display: 'block',
                        margin: '5px auto',
                        backgroundColor: 'red',
                        fontFamily: 'BPrepalyBold',
                        opacity: 0.8,

                      }}
                      
                      >
                      
          </GoogleLogout>
          
        </div>
      );
   }
}



export default Login;