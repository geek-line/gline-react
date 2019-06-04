import React from 'react';
import Login from "./components/login";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import LandingPage from './components/landingPage'
import Post from './components/post'
import Library from './components/library'
import Answer from './components/answer'
import MyPage from './components/mypage'

class App extends React.Component{
  constructor(){
    super()
    
  }
   render(){
    return(
    <BrowserRouter>
      <div>
        <Route path='/' component={LandingPage} />
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
