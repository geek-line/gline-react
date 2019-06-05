import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

class LoginHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }
   
    render(){
     return(
            <div>
                {this.props.user? (
                    <BrowserRouter>
                    <header>
                        <div className="login-header grey lighten-3">
                            <ul className="row center">
                                <li className="m2 s12 col logo-gline"><a href=""><span className='orange-text text-lighten-1'>G</span><span className='light-blue-text text-lighten-1'>L</span><span className='black-text'>I</span><span className='green-text text-lighten-1'>N</span><span className='red-text text-lighten-1'>E</span></a></li>
                                <li className="m2 hide-on-small-and-down col"><p>GLINEとは</p></li>
                                <li className="offset-m4 m2 hide-on-small-and-down col"><p>ヘルプ</p></li>
                                <li className="m2 s12 col" onClick={this.props.logout} ><Link to='/'>ログアウト</Link></li>
                            
                            </ul>
                        </div>
                    </header>
                    </BrowserRouter>
                )
                :
                (
                    this.props.isLogging ? 
                    (
                    <div></div>
                    )
                    :
                    (
                    <BrowserRouter>
                    <header>
                        <div className="login-header grey lighten-3">
                            <ul className="row center">
                                <li className="m2 s12 col logo-gline"><a href=""><span className='orange-text text-lighten-1'>G</span><span className='light-blue-text text-lighten-1'>L</span><span className='black-text'>I</span><span className='green-text text-lighten-1'>N</span><span className='red-text text-lighten-1'>E</span></a></li>
                                <li className="m2 hide-on-small-and-down col"><p>GLINEとは</p></li>
                                <li className="offset-m4 m2 hide-on-small-and-down col"><p>ヘルプ</p></li>
                                <li className="m2 s12 col" onClick={this.props.login} ><Link to='/login'>ログイン</Link></li>
                            
                            </ul>
                        </div>
                    </header>
                    </BrowserRouter>
                    )
                )
                }
                
                
            </div>
        
                    )
            }
        }


export default LoginHeader