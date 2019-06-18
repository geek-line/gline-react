import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link ,Redirect} from 'react-router-dom'
import { storage } from '../firebase'
import Detail from "./Detail"
import Index from "./Index"
import { loadOptions } from "@babel/core";
import Login from "./Login"
import Mypage from "./Mypage"


class Posts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postpage:false,
            pictureurl:"",
            detail:[],
            isLoading:false,
            posts:null,
            isuser:false,
        }

        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        postsref.onSnapshot((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                const post = postdoc.data();
                    
                if(post.postimageurl.length != 0){
                    
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
                isLoading:true
            })

            const user=firebase.auth().currentUser
            if(user)
            {
                const userdb = db.collection("users").doc(this.props.user.uid)    
                console.log(userdb)
                var userref = userdb.get()
                .then(doc => 
                {
                    if (!doc.exists) 
                    {
                        console.log('No such document!');
                       
                        this.setState({
                            isuser : true, 
                        })
                    } 
                    else 
                    {
                        console.log('Document data:', doc.data());
                    }
                })
                .catch(err => 
                {
                console.log('Error getting document', err);
                });

            };           
        })
        
    }

    changepost=()=>{
        this.setState({
        postpage:false
    })
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


    render(){
     
       
console.log( this.state.isLoading)
console.log( this.state.isuser)
        return(
            <div>
               
                {this.props.user&&this.state.isLoading&&
                <div>
                {this.state.isuser?(
               
                 
                    <div>
                       {/* <Redirect to='/posts/login'/> */}
                       {/* <Route  path='/posts/index/:id' render={(props)=><Mypage match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/> */}
                    </div>
                )
                :
                (
                <div>

                 <Route  exact path='/posts/index' render={()=><Index post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  path='/posts/index/:id' render={(props)=><Detail match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  path='/posts/index/user/:id' render={(props)=><Mypage match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                </div>
                )
                }
                </div>
                }
           
               
                
            </div>
        );
    }
    
}

export default Posts
