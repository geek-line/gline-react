import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import About from "./glineAbout";
import Help from "./help";
import Post from "./post";
import Index from "./index"





class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:null
        }
        
    }

    render(){
        
        return(
            <BrowserRouter>
            <div>
            
                
                 <header>
                 {this.props.user ? (
                     <div>
                     <li className="gline-access" onClick={this.props.logout}><Link to='/login'>ログアウト</Link></li>
                     <Route path='/login' component={Login} />
                     </div>
                  ) : (
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-logo"><Link to='/login'>GLINE</Link></li>
                            <li className ="header-overview"><Link to='/about'>GLINEの概要</Link></li>
                            <li className="header-help"><Link to='/help'>ヘルプ</Link></li>
                            <li className="header-login" onClick={this.props.login}><Link to='/index'>ログイン</Link></li>
                            
                        </ul>
                        
                       
                    </div>
                 
                    )}
                </header>
            
                    
                   
                <div className="main">
                <div className="App">
                     <p className="App-intro">
         
        </p>

       
      </div>
      {this.props.user ? (
          <div>
               
                </div>
                ) : (
                    <div>
                    <li className="gline-access" onClick={this.props.login}><Link to='/index'>Glineにアクセス</Link></li>
                    <Route path='/post' component={Post} />
                    <Route path='/about' component={About} />
                    <Route path='/help' component={Help} />
                    <Route path='/index' component={Index} />
                    </div>
                    )}
                </div>

                <footer>
                    <div className="footer-content">

                    </div>
                </footer>
            </div>
            </BrowserRouter>
        );
    }
}



export default Login