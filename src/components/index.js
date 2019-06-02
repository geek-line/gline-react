import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Post from "./post";
import firebase from '../firebase'




class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:this.props.user
        }
        
    }

    logout() {
        firebase.auth().signOut()
      }

    render(){
        console.log(this.props.user)
        return(
            <BrowserRouter>
            <div>
                 <header>
                 { this.props.user
                 ? (
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-web"><Link to='/web'>WEB</Link></li>
                            <li className ="header-game"><Link to='/game'>GAME</Link></li>
                            <li className="header-iphone"><Link to='/iphone'>iPhone</Link></li>
                             {/* <Route path='/web' component={Web} />
                        <Route path='/game' component={Game} />
                        <Route path='/iphone' component={Iphone} /> */}
                            
                        </ul>
                    </div>
                )
                :
                (
                    <div className="header-content">

                        
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
                <div>名前: {this.props.user && this.props.user.displayName}</div>
                <div>E-mail: {this.props.user && this.props.user.email}</div>
                <div>picture: {this.props.user && this.props.user.photoURL || '/images/profile_placeholder.png'}</div>
                <li className="gline-access" onClick={this.logout}><Link to='/login'>ログアウト</Link></li>
                </div>
                ) : (
                   <div></div>
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



export default Index