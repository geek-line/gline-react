import React from 'react';
import Login from "./components/login";
import Index from "./components/index";
import firebase from './firebase'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
        user:null,
        isLogging:false
    }
    
  }

  componentDidMount() {
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
        
          
      </div>
    );
  }
}
export default App;