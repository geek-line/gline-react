import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';

class LandingPage extends React.Component{
    constructor(){
        super()
        this.state={

        }
        
    }

    render(){
        
        return(
            <div>
                LandingPageです
            </div>
        );
    }
}

export default LandingPage