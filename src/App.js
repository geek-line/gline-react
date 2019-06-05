import React from 'react';
import Login from "./components/login";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import LandingPage from './components/landingPage'
import LoginHeader from './components/items/login-header'
import Post from './components/post'
import Library from './components/library'
import Answer from './components/answer'
import MyPage from './components/mypage'
import './bower_components/materialize/dist/css/materialize.css'
import firebase from './firebase'

class App extends React.Component{
  constructor(){
    super()
    this.state ={
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
    return(
      <div>
        <LoginHeader login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
        <LandingPage login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
        <Login login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={Login}/>
          <Route path='/post' component={Post} />
          <Route path='/library' component={Library}/>
          <Route path='/answer' component={Answer} />
          <Route path='/mypage' component={MyPage}/>
        </div>
      </BrowserRouter>
      
      
      </div>
    )
  }
}

export default App;
