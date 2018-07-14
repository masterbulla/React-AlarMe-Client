import React from "react";
import { Route } from "react-router-dom";
import Header from "../Header";
import Setting from '../Components/Setting';
import Send from '../Components/Send';
import Get from '../Components/Get';
import GmailLogin from '../Components/GmailLogin'


const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/"  component={GmailLogin}/>
            <Route  exact path="/Setting" component={Setting} />
            <Route  exact path="/get" component={Get} />
            <Route  exact path="/send" component={Send} />
        </React.Fragment>
    );}

export default ReactRouter;
