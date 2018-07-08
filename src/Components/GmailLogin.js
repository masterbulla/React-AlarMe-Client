import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login-component';


class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
    this.onSignIn = this.onSignIn.bind(this);
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