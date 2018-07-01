import React, {Component} from 'react';
//import { GoogleLogout, GoogleLogin } from 'react-google-login';



/*const clientId = '782556741203-uladecd3ldunajlfrffffosqr6nl7l1p.apps.googleusercontent.com'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'

const success = response => {
    console.log("login");
  console.log(response)
}

const error = response => {
  console.error(response)
}

const loading = () => {
  console.log('loading')
}

const logout = () => {
  console.log('logout')
}
*/

class Login extends Component{

   


    render(){
        return(
            /*
            <div>
                <GoogleLogin
                    clientId={clientId}
                    scope="https://www.googleapis.com/auth/analytics"
                    onSuccess={success}
                    onFailure={error}
                    onRequest={loading}
                    offline={false}
                    approvalPrompt="force"
                    responseType="id_token"
                    isSignedIn
                    // disabled
                    // prompt="consent"
                    // className='button'
                    // style={{ color: 'red' }}
                >
                </GoogleLogin>

                <GoogleLogin
                    clientId={clientId}
                    scope="https://www.googleapis.com/auth/adwords"
                    onSuccess={success}
                    onFailure={error}
                    onRequest={loading}
                    approvalPrompt="force"
                    responseType="code"
                    // uxMode="redirect"
                    // redirectUri="http://google.com"
                    // disabled
                    // prompt="consent"
                    // className='button'
                    // style={{ color: 'red' }}
                >
                </GoogleLogin>

                <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
            </div>*/
            <div>login</div>
        );
    }
}

export default Login;



 
