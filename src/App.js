import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import LandingPage from './components/LandingPage.js'
import Login from "./components/Login";
import Post from './components/Post'
import Library from './components/Library'
import Answer from './components/Answer'
import MyPage from './components/Mypage'
import './bower_components/materialize/dist/css/materialize.css'
import firebase from './firebase'
import Index from './components/Index'
import { db } from './firebase'
import LoginHeader from './components/items/Login-header.js'
import Detail from './components/Detail'


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
    return(
      <div>
        
       
       
      <BrowserRouter>
      
        <div>
          <LoginHeader login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
          <Route exact path='/' render={()=> <LandingPage login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>}/>
          <Route  path='/login' render={() => <Login save={this.save} nickname={this.state.nickname} course={this.state.course} logout={this.logout} user={this.state.user} isLogging={this.state.isLogging} />}/>
          <Route  path='/form' render={()=><Post  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
          <Route  path='/library' component={Library}/>
          <Route  exact path='/posts' render={()=><Index  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
          <Route  path='/posts/:id' render={()=><Detail  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
          <Route  path='/answer' component={Answer} />
          <Route  path='/mypage' component={MyPage}/>
        
        </div>
       
      </BrowserRouter>
      
      
      </div>
    )
  }
}

export default App;
