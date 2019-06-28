import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import firebase from 'firebase'



class IndexHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
          };
        

        
    }
   


      
   
    render(){
        console.log(this.props.searching)
        const {uid, dispatch} = this.props 
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
                                
                               
                             {/* <button className="" onclick ={()=>this.props.searchdo}><svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
                             <li><input type='text' value={this.props.search} onChange={this.props.handleInputsearch} /></li>
                             
                             */}
                            
                           
                                             
                            
                            
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