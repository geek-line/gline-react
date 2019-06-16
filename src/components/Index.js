import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'
import Detail from "./Detail"


class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            postpage:false,
            user:null,
            pictureurl:"",
            detail:[]


        }
        this.detail= this.detail.bind(this);
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
                return {...post,id:postdoc.id}
                
               
            })
            this.setState({
                posts : posts,
                
            })
           
        });
        
    
    }

   
    post = () =>{
        if(this.state.postpage==true){
        this.setState({
            postpage:false
        })
         }else{
        this.setState({
            postpage : true
        })  
    }
    }

    detail = (post,post_id)=>{
        
       console.log(post.id)
    
         
     }

    render(){
        console.log(this.state)
        return(
            <div>

                {this.props.user&&
                this.state.postpage==false&&
                     this.state.posts.map((post) => { 
                        console.log(post)
                        
                      return(
                            <div>
                                <Link to={"/posts"} onclick ={this.detail(post,post.id)}>{post.title}</Link>
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
                    
               
                }
            {this.props.user&&
                this.state.postpage?(
                    <div>
                    <div><Post user = {this.state.user} postpage={this.state.postpage} changepost={this.changepost}/></div>
                    <button onClick={this.changepost}>投稿をやめる</button>
                    </div>
                )
                :
                (
                    <a class="btn-floating btn-large waves-effect waves-light red"onClick={this.post}><i class="material-icons">add</i></a>
                    
                )
           
            }
            <BrowserRouter>
            
                <div>
                    <Route  path='/posts/:id' render={()=><Detail  user ={this.props.user} detail={this.state.detail}/>}/>
                </div>
                
            </BrowserRouter> 
            </div>
        );
    }
    
}

export default Index
