import React from "react";
import { Route } from "react-router-dom";
import Header from "../Header";
import Setting from '../Components/Setting';
import Login from '../Login';
import Send from '../Components/Send';
import Get from '../Components/Get';

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/"  component={Login}/>
            <Route  exact path="/Setting" component={Setting} />
            <Route  exact path="/get" component={Get} />
            <Route  exact path="/send" component={Send} />
        </React.Fragment>
    );}

export default ReactRouter;
