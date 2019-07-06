import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import firebase from 'firebase'
class IndexHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        

        
    }


    
   
    render(){
     return(
            <div>
                {this.props.user? (
                   
                    <header>
                        <div className="login-header grey lighten-3">
                            <ul className="row center">
                            <Link to='/posts/index'><li className="m2 s12 col logo-gline"><a href="/posts/index"><span className='orange-text text-lighten-1'>G</span><span className='light-blue-text text-lighten-1'>L</span><span className='black-text'>I</span><span className='green-text text-lighten-1'>N</span><span className='red-text text-lighten-1'>E</span></a></li></Link>
                                <li className="m2 hide-on-small-and-down col"><p>GLINEとは</p></li>
                                <li className="offset-m4 m2 hide-on-small-and-down col"><Link to={`/posts/user/${this.props.user.uid}`}>マイページ</Link></li>
                                <li className="m2 s12 col" onClick={this.props.logout} ><Link to='/'>ログアウト</Link></li>
                                
                               
                            
                             <li><input type='text' value={this.props.search} onChange={this.props.handleInputsearch} /></li>
                             
                            
                            
                           
                                             
                            
                            
                            </ul>
                        </div>
                    </header>
                  
                )
                :
                (
                    this.props.isLogging ? 
                    (
                    <div></div>
                    )
                    :
                    (
                   
                    <header>
                        <div className="login-header grey lighten-3">
                            <ul className="row center">
                                <li className="m2 s12 col logo-gline"><a href=""><span className='orange-text text-lighten-1'>G</span><span className='light-blue-text text-lighten-1'>L</span><span className='black-text'>I</span><span className='green-text text-lighten-1'>N</span><span className='red-text text-lighten-1'>E</span></a></li>
                                <li className="m2 hide-on-small-and-down col"><p>GLINEとは</p></li>
                                <li className="offset-m4 m2 hide-on-small-and-down col"><p>ヘルプ</p></li>
                                <li><a href="" className="m2 s12 col" onClick={this.props.login} ><Link to='/posts/index'>ログイン</Link></a></li>
                            
                            </ul>
                        </div>
                    </header>
            
                    )
                )
                }
                
                
            </div>
        
                    )
            }
        }


export default IndexHeader