import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import ReactRouter from './Router/route';
import registerServiceWorker from './registerServiceWorker';
import MediaQuery from 'react-responsive';


ReactDOM.render(<MediaQuery maxDeviceWidth={375}>
                    <Router>
                        <ReactRouter />
                    </Router>
                </MediaQuery>, 
                document.getElementById('root'));
registerServiceWorker();
