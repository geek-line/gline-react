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
                   
                   <div>now loading</div>
                    )
                )
                }
                
                
            </div>
        
                    )
            }
        }


export default IndexHeader