import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            postpage:false,
            user:null,
            pictureurl:""


        }
    }

    changepost=()=>{
        this.setState({
        postpage:false
    })
    }

    componentDidMount(){

        
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
          })
        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        postsref.get().then((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                 const post = postdoc.data();
                 console.log(post);
                 
                 const pathref = storage.ref(`images/${post.postpicname}`)
                 pathref.getDownloadURL().then((url)=>{
                     this.setState({
                        pictureurl:url
                     })
                 }
                 )

                return {
                    title:post.title,
                    body:post.body,
                    name:post.name,
                    pic:post.pic,
                    course:post.course,
                    nickname: post.nickname,
                    favcount: post.favcount,
                    librarycount: post.librarycount,
                    timestamp: post.timestamp,
                    postpicname: post.postpicname
                }   
               
            })
            this.setState({
                posts : posts,
                
            })
           
        });



    }

    post = () =>{
       
            this.setState({
                postpage : true
            })  
      
    }

   

    render(){
        console.log(this.state.user)
        return(
            <div>

                {this.props.user?(
                     this.state.posts.map((post, i) => { 
                        return ( 
                            <div key={i}>
                                {post.title}
                                {post.body}
                                {post.name}
                                {post.pictureurl}
                               
                                {post.course}
                                {post.nickname}
                                {post.favcount}
                                {post.librarycount}
                                {post.timestamp.toString()}
                            </div>
                        )

                    })
                )   
                :
                (
                    <div></div>
                )
                }
            {this.props.user?(
                this.state.postpage?(
                    <div>
                    <div><Post user = {this.state.user} postpage={this.state.postpage} changepost={this.changepost}/></div>
                    <button onClick={this.changepost}>投稿をやめる</button>
                    </div>
                )
                :
                (
                    <button onClick={this.post}>投稿する</button>
                )
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

export default Index