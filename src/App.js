import React from 'react';
import Login from "./components/login";
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends React.Component{
  constructor(){
    super()
    
  }
   render(){
    return(
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Login}/>
      </div>
  </BrowserRouter>
    )
  }
}

export default App;