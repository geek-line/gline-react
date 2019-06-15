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
            detail:[]


        }
    }

    changepost=()=>{
        this.setState({
        postpage:false
    })
    }

    componentWillMount(){

        
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
          })

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
                                return post.uid === postdoc.uid;
                            })
                            state.posts[index].postimageurl.push(url)


                            
                            return state
                        })
                    })

                    
                }
                return {...post,uid:postdoc.uid}
                
               
            })
            this.setState({
                posts : posts,
                
            })
           
        });
        
       


    
    }

   
    post = () =>{
            this.setState({
        postpage:false
    })
            this.setState({
                postpage : true
            })  
      
    }

   detail =(post)=>{
       this.setState({
           detail:post
    })
    }

    render(){
        
        return(
            <div>

                {this.props.user?(
                     this.state.posts.map((post, i) => { 
                      
                        return ( 
                            <div key={i}>
                                <Link to={post.id} onclick ={this.detail(post)}>{post.title}</Link>
                                {post.body}
                                
                                {post.postimageurl&&
                                    post.postimageurl.map((imageurl,j)=>{
                                        return (
                                        <div key={j}>
                                        <img src={imageurl} className="post-image"></img>
                                        </div>
                                        )
                                    })
                                }
                                {post.course}
                                {post.nickname}
                                {post.favcount}
                                {post.librarycount}
                                {/* {post.timestamp.toString()} */}
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
                    <button  onClick={this.post}>投稿する</button>
                )
            )   
            :
            (
                <div></div>
            )
            }
            <BrowserRouter>
            
                <div>
                    <Route  path='/posts/:id' render={()=><Detail   user ={this.props.user} post={this.state.detail}/>}/>
                </div>
                
            </BrowserRouter> 
            </div>
        );
    }
    
}

export default Index
