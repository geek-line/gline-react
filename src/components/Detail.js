import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={


        }
    }

    

   

   

    render(){
        console.log(this.props.detail)
        return(
            <div>

                {this.props.user?(
                     
                    
                          <div>
                                {this.props.detail.title}
                                {this.props.detail.body}
                                {this.props.detail.name}
                                {this.props.detail.pictureurl}
                               
                                {this.props.detail.course}
                                {this.props.detail.nickname}
                                {this.props.detail.favcount}
                                {this.props.detail.librarycount}
                                {/* {post.timestamp.toString()} */}
                            </div>
                        

                    )
                   
                :
                (
                    <div></div>
                )
                }
            
                
            </div>
        );
    }
    
}

export default Detail
