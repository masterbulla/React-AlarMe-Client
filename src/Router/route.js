import React from "react";
import { Route } from "react-router-dom";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" /*component={OpenApp}*/ />
            <Route  path="/MyIdeas" /*component={LoginApp}*/  />
        </React.Fragment>
    );}

export default ReactRouter;
