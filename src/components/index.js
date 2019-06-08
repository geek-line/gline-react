import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Index extends React.Component{
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }

componentDidMount(){

        
        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        postsref.get().then((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                 const post = postdoc.data();
                
                
                return {
                    title:post.title,
                    body:post.body,
                    name:post.name,
                    pic:post.photoURL || '/images/profile_placeholder.png',
                    course:post.course,
                    nickname: post.nickname,
                    favcount: post.favcount,
                    librarycount: post.librarycount,
                    timestamp: post.timestamp,
                    
                }   
               
            })
            this.setState({
                posts : posts
            })
           
        });



    }

    post(){
        return(
            <div>
            <Post/>
            </div>
        )
      
    }

   

    render(){
        
        return(
            <div>
                {
                     this.state.posts.map((post) => { 
                        return ( 
                            <div>
                                {post.title}
                                {post.body}
                                {post.name}
                                {post.pic}
                                {post.course}
                                {post.nickname}
                                {post.favcount}
                                {post.librarycount}
                                {post.timestamp.toString()}
                            </div>
                        )

                    })
                    
                }
                 <button onClick={this.post}>投稿する</button>
            </div>
        );
    }
    
}

export default Index