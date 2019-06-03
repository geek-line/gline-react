import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import Post from "./post";
import firebase from '../firebase'
import Select from 'react-select';



class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            course: ''
        }
        this.handleInput = this.handleInput.bind(this);
    this.send = this.save.bind(this);
    }


    handleInput({ target: { value } }) {
        this.setState({
          course: value
        });
      }
      
    save=(e)=>{
        e.preventDefault()

        const user = firebase.auth().currentUser
        if( user ){
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                pic: user.photoURL || '/images/profile_placeholder.png',
                email: user.email,
                course: this.state.course
            })
            .then(() => {
                console.log(`追加に成功しました `);
            })
            .catch((error) => {
                console.log(`追加に失敗しました (${error})`);
            });
        }
    }


    render(){
        console.log(this.props.user)
        return(
            <BrowserRouter>
            <div>
                 <header>
                 { this.props.user?
                 (
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-web"><Link to='/web'>WEB</Link></li>
                            <li className ="header-game"><Link to='/game'>GAME</Link></li>
                            <li className="header-iphone"><Link to='/iphone'>iPhone</Link></li>
                           
                           
                          
                             {/* <Route path='/web' component={Web} />
                        <Route path='/game' component={Game} />
                        <Route path='/iphone' component={Iphone} /> */}
                            
                        </ul>
                        <div>
                        <form>
                        <select name = "course" value={this.state.course} onChange={this.handleInput}>
                            <option defaultValue="web"> web</option>
                            <option value="game"> game</option>
                            <option value="iphone">iphone</option>
                        </select> 
                          
                        <button onClick={this.save}>send</button>
                        
                        </form>
                
                        </div>
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
                <div><img src  ={this.props.user.photoURL || '/images/profile_placeholder.png'}></img></div>
              
                <li className="gline-logout" onClick={this.logout}><Link to='/login'>ログアウト</Link></li>
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