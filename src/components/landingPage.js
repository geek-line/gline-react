import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LoginHeader from './items/login-header'
import firebase from '../firebase'
import Login from "./login";


class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
           
        }
        
    }



    render(){
        
        return(
            <BrowserRouter>
            <div>
            {this.props.user? (
                <div></div>
            )
            :
            (
                this.props.isLogging ? (
                    <div>読み込み中です</div>
                )
                :
                (
                  <div>
                  <li className="gline-access" onClick={this.props.login}><Link to='/login'>Glineにアクセス</Link></li>
                  </div>
                )
            )
                }
            </div>
            </BrowserRouter>
        );
    }
}

export default LandingPage