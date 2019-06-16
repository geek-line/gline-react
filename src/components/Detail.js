import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'
import Posts from "./Posts";
import Response from "./Response"

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
           post:[],
        }
    }

  
    componentWillMount(){

        

        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        postsref.limit(20).onSnapshot((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                const post = postdoc.data();
                    //  console.log(post);
                if(post.postimageurl!=[]){
                    const pathref = storage.ref().child(`images/${post.postimageurl}`)
                    pathref.getDownloadURL().then((url)=>{ 

                        this.setState((state)=>{
                            const index =  state.posts.findIndex((post)=>{
                                return post.id === postdoc.id;
                            })
                            state.posts[index].postimageurl.push(url)


                            
                            return state
                        })
                    })

                    
                }
                return {...post,id:postdoc.id}
                
               
            })
            console.log(posts)
            const uid =this.props.match.params.id
            const post= posts.find((posts) => {return (posts.id === uid);})
            this.setState({
                post:post
            })
           
        });
       
    
    }
   

    render(){
        
        return(
            <div>

                {this.props.user&&
                     
                    
                           <div>
                                {this.state.post.title}
                                {this.state.post.body}
                                {this.state.post.name}
                                {this.state.post.pictureurl}
                               
                                {this.state.post.course}
                                {this.state.post.nickname}
                                {this.state.post.favcount}
                                {this.state.post.librarycount}
                               
                            </div> 
                         
                           
                   
                }
            
            <Response match={this.props.match}/>
            </div>
        )
    }
    
}

export default Detail
