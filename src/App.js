import React from 'react';
import { BrowserRouter, Route, Redirect,Link } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LandingPage from './components/LandingPage.js'
import Login from "./components/Login";
import Post from './components/Post'
import Library from './components/Library'
import MyPage from './components/Mypage'
import Posts from './components/Posts'
import firebase from './firebase'
import Index from './components/Index'
import { db } from './firebase'
import LoginHeader from './components/items/Login-header.js'
import Detail from './components/Detail'
import IndexHeader from './components/items/Index-header.js'



class App extends React.Component{
  constructor(){
    super()
    this.state ={
    user:null,
    isLogging:false,
    course: '',
    nickname: '',
    logined: true
    }

    this.send = this.save.bind(this);

  }
  save = (e) => {
      
    const user = firebase.auth().currentUser
    if (user) {
        db.collection("users").doc(user.uid).set({
            name: user.displayName,
            pic: user.photoURL || '/images/profile_placeholder.png',
            email: user.email,
            course: this.state.course,
            nickname: this.state.nickname
        })
            .then(() => {
                this.setState({
                    logined : false
                })
                console.log(`追加に成功しました `);
            })
            .catch((error) => {
                console.log(`追加に失敗しました (${error})`);
            });
    }

    
}

handleInputsearch(event) {
  this.setState({
  })
}

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
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
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
    const user = this.state.user
  }


  logout=()=> {
    firebase.auth().signOut()
    this.setState({ isLogging:false,user:null })
  }

   render(){
    console.log(this.state.search)
    return(
      <React.Fragment>
        <MuiThemeProvider>
          <BrowserRouter>
          {this.state.user?(
               <div>
               <IndexHeader  searching ={this.state.searching} handleInputsearch ={this.handleInputsearch} search={this.state.search} login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
               <Route  path='/login' render={() => <Login save={this.save} nickname={this.state.nickname} course={this.state.course} logout={this.logout} user={this.state.user} isLogging={this.state.isLogging} />}/>
               <Route  path='/form' render={()=><Post  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
               <Route  path='/posts' render={(props)=><Posts match={props.match} search={this.state.search} logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
               <Route  path='/library' component={Library}/>
               <Route  path='/mypage' component={MyPage}/>
               </div>
           
          ):(
            <div>
            <LoginHeader login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
            <Route exact path='/' render={()=> <LandingPage login={this.login} logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>}/>
            </div>
          )
          }
          </BrowserRouter>
        </MuiThemeProvider> 
      </React.Fragment>
    )
  }
}

export default App;
