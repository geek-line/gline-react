import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css"
import Header from './items/login-header'

class Login extends React.Component{
    constructor(){
        super()
        this.state={

        }
        
    }

    render(){
        
        return(
            <div>
                <Header/>
                ログイン画面です
            </div>
        );
    }
}

export default Login