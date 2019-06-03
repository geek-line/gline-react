import React from 'react';
import Login from "./components/login";
import Index from "./components/index";
import firebase from './firebase'
import { db } from './firebase'
import About from "./components/glineAbout";
import { BrowserRouter, Route, Link } from 'react-router-dom'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
        user:null,
        isLogging:false
    }
    
  }

  componentDidMount= () =>{
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  login=()=> {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    this.setState({ isLogging:true }) 
    
  }

  logout=()=> {
    firebase.auth().signOut()
    this.setState({ isLogging:false }) 
  }

  

  render(){
    return (
      <div className="App">
        
        <Login login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
        <Index logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
        
        <BrowserRouter>
        <Route path='/about' component={About} />
        </BrowserRouter>

          
      </div>
    );
  }
}
export default App;