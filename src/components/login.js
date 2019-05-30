import React from "react";
import "../../bower_components/materialize/dist/css/materialize.css";

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
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-logo">GLINE</li>
                            <li className="header-overview">GLINEの概要</li>
                            <li className="header-help">ヘルプ</li>
                            <li className="header-login">GLINEにアクセス</li>
                        </ul>
                    </div>
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