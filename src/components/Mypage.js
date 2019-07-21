import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Like from "./Like"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


const style = {
    height: 20,
    width: 60,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
    
  };

class Mypage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myposts:[],
           answered:false,
           answerdisplay:false,
           likelist:false,
           current:"",
           user:[],
        }
        
        const user = firebase.auth().currentUser
        console.log(user.uid)  
        const userdb = db.collection("users").doc(user.uid);
        var userref = userdb.get()
                .then(doc => 
                {
                    if (!doc.exists) 
                    {
                        console.log('No such document!');
                        console.log(userdb)  
                      
                    } 
                    else 
                    {
                        
                         this.setState({
                            user : doc.data(),
                            
                        })
                        console.log(this.state.user)  
                       
                    }
                })
                .catch(err => 
                {
                console.log('Error getting document', err);
                });
            
        
        
        
    }
  

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
          current:value
        });
      };
   

    render(){
        const user = firebase.auth().currentUser  
        // if(this.state.likelist==true){
        console.log(this.state.user)
        // ?const myposts= this.props.posts.filter((posts) => {return (posts.favusers != undefined&&posts.favusers[uid] == true);})
        
            const myposts1 = this.props.posts.filter((posts) => {return (posts.email === user.email);})
            const myposts = myposts1.filter((searchs) => {return (searchs.body.indexOf(this.props.search) > -1)|| (searchs.title.indexOf(this.props.search) > -1);})
        
        return(
           <div>
               <li className="grey lighten-3"><div className="search"><TextField fullWidth={true} value={this.props.search} hintText="検索する" onChange={this.props.handleInputsearch} class="textsearch"id="textsearch"/></div><br/></li>
              
                
                    
            <div className="mypage">
             <ul id ="index"className={this.state.currentcourse} >
             <li className="aaa  m4 hide-on-small-and-down col"><br/>
             <img src={`${this.state.user.pic}`}/>
             <br/>名前:
             {this.state.user.name}<br/>
             ニックネーム:
            {this.state.user.nickname}
            <br/>
            コース:
          
           {this.state.user.course&&this.state.user.course.map((courses,k)=>{
                return (
                        
                    <div key={k}>
                    {courses}
                    </div>
                )
            })} 
             </li>
             <li className="post offset-m4 m12 hide-on-small-and-down col">
             <div id="tab" >
                    <ul>
                    <li className="Like" onClick={()=>this.handleChange("Like")} >Like</li>
                    <li className="Post" onClick={()=>this.handleChange("Post")}>Post</li> 
                    </ul>
            </div>
            
                {this.props.user&&this.state.current=="Like"?(
                    <div className="likepost offset-m4 m12 hide-on-small-and-down col">
                   <Like like = {this.props.like}  posts={this.props.posts} user={this.props.user} searching ={this.props.searching} handleInputsearch ={this.props.handleInputsearch} search={this.props.search} ></Like>
                   </div>
                )
                :
                (
                        
                        <div className="mypost offset-m4 m8 hide-on-small-and-down col">
                    {myposts.map((post,i) => { 
                        return(
                            <div key={i} className="post"　>
                                
                                <Card　>
                            <CardHeader
                            title={post.title}
                            subtitle={post.nickname}
                            avatar={post.pic}
                            />
                            <CardText>
                            {post.body}
                            </CardText>
                            {post.postimageurl&&
                                    post.postimageurl.map((imageurl,j)=>{
                                        return (
                                            
                                        <div key={j}>
                                        <img src={imageurl} className="post-image"></img>
                                        </div>
                                        )
                                    })
                                }
                            <CardActions>
                            <FlatButton  label="詳細へ" href ={`/posts/index/${post.id}`} />
                                {post.favusers[this.props.user.uid]==null?
                                (
                                    <FlatButton  key={i} onClick={e=>this.props.like(post,i)} label="いいね"></FlatButton>
                                )
                                :
                                (
                                    <FlatButton  key={i} onClick={e=>this.props.like(post,i)} label="いいねを取り消す"></FlatButton>
                                )
                                }
                             <Paper style={style} zDepth={0} >{post.favcount}</Paper>
                             <FlatButton onClick={e=> this.props.remove(post.id)}>削除する</FlatButton>
                            </CardActions>
                            </Card> 
                            </div>
                        )
                    })}  
                   </div>
                )
               
                    
                }
                </li>
                </ul>  
               </div>
           
            </div>
        )
    }
}

export default Mypage
