import React from 'react';
import Login from "./components/login";
import { BrowserRouter, Route, browserHistory ,Switch} from 'react-router-dom'
import LandingPage from './components/landingPage'
import LoginHeader from './components/items/login-header'
import Post from './components/post'
import Library from './components/library'
import Answer from './components/answer'
import MyPage from './components/mypage'
import './bower_components/materialize/dist/css/materialize.css'
import firebase from './firebase'
import Index from './components/index'
import { db } from './firebase'


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
    this.setState({ isLogging:false }) 
  }

   render(){
    return(
      <div>
        
       
       
      <BrowserRouter>
      
        <div>
          <LoginHeader login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>
          <Route exact path='/' render={()=> <LandingPage login={this.login } logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging}/>}/>
          <Route  path='/login' render={() => <Login save={this.save} nickname={this.state.nickname} course={this.state.course} logout={this.logout} user={this.state.user} isLogging={this.state.isLogging} />}/>
          <Route  path='/post' render={()=><Post  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
          <Route  path='/library' component={Library}/>
          <Route  path='/index' render={()=><Index  logout={this.logout} user ={this.state.user} isLogging = {this.state.isLogging} index ={this.state.index}/>}/>
          <Route  path='/answer' component={Answer} />
          <Route  path='/mypage' component={MyPage}/>
        
        </div>
       
      </BrowserRouter>
      
      
      </div>
    )
  }
}

export default App;
