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
                console.log(postdoc)
                return {...post,id:postdoc.id}
                
               
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

   

    render(){
        
        return(
            <div>

                {this.props.user?(
                     this.state.posts.map((post, i) => { 
                      
                        return ( 
                            <div key={i}>
                                
                                {post.body}
                                <Link to={post.id}> {post.title}</Link>
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
                                <Route  path='/detail' render={() => <Login user={this.props.user} nickname={this.state.nickname} course={this.state.course} logout={this.logout} user={this.state.user} isLogging={this.state.isLogging} />}/>
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
                
            </div>
        );
    }
    
}

export default Index
