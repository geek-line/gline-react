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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const courses = [
    'WEB',
    'GAME',
    'iPhone',
    'WEB Expert',
    
  ];
  
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
            meta:[],
            selectedCourses:[],
            nickname:"",
            load:false,
            course: '',

        }
        this.handleChange = this.handleChange.bind(this)
        this. handleInputnickname = this. handleInputnickname.bind(this)
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this)
        this.like = this.like.bind(this);
        // postrefにpostコレクションを時間順に並べて渡す
        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        // postrefが更新されるたびにstestateする
        postsref.onSnapshot((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                const post = postdoc.data();
                
                // 画像がある時の処理
                if(post.postimagenames.length != 0){
                   
                    // storageの画像をURLでとる
                    //var pathref = storage.ref().child(`images/${post.postimagename}`)
                    post.postimagenames.map((name)=>{
                    var pathref = storage.refFromURL(`gs://geek-line.appspot.com/${name}`)
                    // pathref.getMetadata().then((metadata) =>{
                    //     // Metadata now contains the metadata for 'images/forest.jpg'

                    //   console.log(metadata)
                    //   this.setState({
                    //     meta:metadata
                    // })
                    //   }).catch(function(error) {
                    //     console.log(error)
                    //   });
                    //   console.log(this.state.meta)
                     
                    // var pathref = storage.refFromURL(`gs://geek-line.appspot.com/images/${post.postimagenames}`)
     
                    pathref.getDownloadURL().then((url)=>{ 

                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function(event) {
                          var blob = xhr.response;
                        };
                        xhr.open('GET', url);
                        xhr.send();

                        this.setState((state)=>{
                            const index =  state.posts.findIndex((post)=>{
                                return post.id === postdoc.id;
                            })
                            state.posts[index].postimageurl.push(url)   
                            return state
                        })
                    })
                 } )
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
                        console.log(this.state.isuser);
                    } 
                    else 
                    {
                        this.setState({
                            isuser : false, 
                        })
                        console.log('Document data:', doc.data());
                        // console.log(this.state.isuser);
                    }
                })
                .catch(err => 
                {
                console.log('Error getting document', err);
                });
                

            };           
        })
        
    }

    menuItems(selectedCourses) {
        return courses.map((course) => (
          <MenuItem
            key={course}
            insetChildren={true}
            checked={selectedCourses && selectedCourses.indexOf(course) > -1}
            value={course}
            primaryText={course}
          />
        ));
      }

    handleChange = (event, index, selectedCourses) => this.setState({selectedCourses});


    handleInputnickname(event) {
        
        this.setState({
            nickname: event.target.value

        })
        // console.log(event.target.value)
        // console.log(this.state.nickname)
    }

    save = () => {
        this.setState({
            
            load:true
        })
        const user = firebase.auth().currentUser
        if (user) {
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                pic: user.photoURL || '/images/profile_placeholder.png',
                email: user.email,
                course: this.state.selectedCourses,
                nickname: this.state.nickname
            })
                .then(() => {
                    this.setState({
                        logined : true,
                        load:true,
                        isuser:false
                    })
                    console.log(`追加に成功しました `);
                   
                    
                })
                .catch((error) => {
                    console.log(`追加に失敗しました (${error})`);
                });
        }
    }

    changepost=()=>{
        this.setState({
        postpage:false
    })
    }

    remove = (id)=>{
        const postdb = db.ref(`posts/${id}`);
        console.log(postdb)
        postdb.remove()
    }

    // certificate=()=>{
    //     const user=firebase.auth().currentUser
    //     if(user)
    //     {
    //         const userdb = db.collection("users").doc(this.props.user.uid)    
            
    //         var userref = userdb.get()
    //         .then(doc => 
    //         {
    //             if (!doc.exists) 
    //             {
    //                 console.log('No such document!');
                   
    //                 this.setState({
    //                     isuser : false, 
    //                 })
    //             } 
    //             else 
    //             {
    //                 // console.log('Document data:', doc.data());
    //             }
    //         })
    //         .catch(err => 
    //         {
    //         console.log('Error getting document', err);
    //         });

    //     };    
    // }

    like = (post,i)=> {
       
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
            // console.log(hopperRef)
            // console.log(post.favcount)
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
     
        // console.log(this.state.isuser);
// console.log( this.state.isLoading)
//  console.log( this.state.load)
        return(
            <div>
               
                {this.props.user?(
                    this.state.isLoading&&
                <div>
                {this.state.isuser?(
               
                 
                    <div>
                        <Login load={this.state.load}nickname={this.state.nickname}selectedCourses={this.state.selectedCourses}menuItems={this.menuItems}handleChange={this.handleChange}handleInputnickname ={this.handleInputnickname} save={this.save} certificate={this.state.certificate}   course={this.props.course} logout={this.props.logout} user={this.props.user} isLogging={this.props.isLogging} />
                       {/* <Redirect to='/posts/login'/> */}
                       {/* <Route  path='/posts/index/:id' render={(props)=><Mypage match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/> */}
                    </div>
                )
                :
                (
                <div>

                 <Route  exact path='/posts/index' render={()=><Index searching ={this.props.searching} handleInputsearch ={this.props.handleInputsearch} search={this.props.search} like = {this.like} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  exact path='/posts/index/:id' render={(props)=><Detail like = {this.like} match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
                 <Route  exact path='/posts/user/:id' render={(props)=><Mypage  remove={this.remove}searching ={this.props.searching} handleInputsearch ={this.props.handleInputsearch} search={this.props.search}  like = {this.like} match ={props.match} post={this.post} changepost={this.changepost} pictureurl = { this.state.pictureurl} posts={this.state.posts} postpage={this.state.postpage} user ={this.props.user} post = {this.post}/>}/>
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
