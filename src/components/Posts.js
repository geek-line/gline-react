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
import Like from "./Like"


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
        this.like = this.like.bind(this);
        // postrefにpostコレクションを時間順に並べて渡す
        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        // postrefが更新されるたびにstestateする
        postsref.onSnapshot((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                const post = postdoc.data();
                // 画像がある時の処理
                if(post.postimageurl.length != 0){
                    // storageの画像をURLでとる
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
            
            // ユーザ登録を確認する
            const user=firebase.auth().currentUser
            if(user)
            {
                const userdb = db.collection("users").doc(this.props.user.uid)    
                
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

 

    like = (post,i)=> {
        console.log(post)
        const uid = firebase.auth().currentUser.uid
       
        if (post) {
            if (post.favusers && post.favusers[uid]) {
                post.favcount--;
                post.favusers[uid] = null;
            } else {
                post.favcount++;
                if (!post.favusers) {
                    post.favusers = {};
                }
              post.favusers[uid] = true;
            }   
            var hopperRef = db.collection("posts").doc(post.id)    
            console.log(hopperRef)
            console.log(post.favcount)
            hopperRef.update({
            favcount:post.favcount,
            favusers:post.favusers
            })
            .then(doc => 
                {      
                        console.log('いいねしました');

                })
                .catch(err => 
                {
                console.log('Error getting document', err);
                });       
        }
             
    }

//    投稿フォームに切り替える
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
     
       
// console.log( this.state.isLoading)
// console.log( this.state.isuser)
        return(
            <div>
               
                {this.props.user?(
                    this.state.isLoading&&
                <div>
                {this.state.isuser?(
               
                 
                    <div>
                        <Login save={this.props.save} nickname={this.props.nickname} course={this.props.course} logout={this.props.logout} user={this.props.user} isLogging={this.props.isLogging} />
                       {/* <Redirect to='/posts/login'/> */}
                       {/* <Route  path='/posts/index/:id' render={(props)=><Mypage match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/> */}
                    </div>
                )
                :
                (
                <div>

                 <Route  exact path='/posts/index' render={()=><Index like = {this.like} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  exact path='/posts/index/:id' render={(props)=><Detail like = {this.like} match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  exact path='/posts/user/:id' render={(props)=><Mypage like = {this.like} match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  exact path='/posts/like' render={(props)=><Like like = {this.like} match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                </div>
                )
                }
                </div>

                )
                :
                (
                <div>
                
                </div>
                )
                }
           
               
                
            </div>
        );
    }
    
}

export default Posts
