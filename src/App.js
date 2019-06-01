import React from 'react';
import Login from "./components/login";
import Index from "./components/index";
import firebase from './firebase'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
        user:null
    }
    
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
   
  }

logout() {
    firebase.auth().signOut()
   
  }

  render(){
  return (
    <div className="App">
      
      <Login login={this.login } logout={this.logout} user ={this.state.user}/>
      <Index logout={this.logout} user ={this.state.user}/>
      
        
    </div>
  );
  }
}
export default App;