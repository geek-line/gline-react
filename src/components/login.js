import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import About from "./glineAbout";
import Help from "./help";
import Post from "./post";



class Login extends React.Component{
    constructor(){
        super()
        this.state={

        }
        
    }



    render(){
        
        return(
       
            <div>
                 <header>
                 <BrowserRouter>
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-logo"><Link to='/login'>GLINE</Link></li>
                            <li className ="header-overview"><Link to='/about'>GLINEの概要</Link></li>
                            <li className="header-help"><Link to='/help'>ヘルプ</Link></li>
                            <li className="header-login"><Link to='/post'>GLINEにアクセス</Link></li>
                        </ul>
                        <div className="main">
                          roguinnsitekudasai

                        </div>
                        <Route path='/post' component={Post} />
                        <Route path='/about' component={About} />
                        <Route path='/help' component={Help} />
                    </div>
                 </BrowserRouter>
                    
                </header>
                <div className="main">
                   
                
                
                </div>

                <footer>
                    <div className="footer-content">

                    </div>
                </footer>
            </div>
  
        );
    }
}



export default Login