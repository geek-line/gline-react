import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from "./components/Login";
import Post from './components/Post'
import Library from './components/Library'
import Answer from './components/Answer'
import MyPage from './components/MyPage'
import './bower_components/materialize/dist/css/materialize.css'

class App extends React.Component{
  constructor(){
    super()
    
  }
   render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/landingPage' component={LandingPage}/>
          <Route exact path='/login' component={Login}/>
          <Route path='/post' component={Post} />
          <Route path='/library' component={Library}/>
          <Route path='/answer' component={Answer} />
          <Route path='/mypage' component={MyPage}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
