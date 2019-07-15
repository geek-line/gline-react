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
        }
       
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
            const uid = firebase.auth().currentUser.uid 
        // ?const myposts= this.props.posts.filter((posts) => {return (posts.favusers != undefined&&posts.favusers[uid] == true);})
        
            const myposts = this.props.posts.filter((posts) => {return (posts.email === user.email);})
        
        
        return(
           <div>
                <div id="tab" >
                    <ul>
                    <li className="Like" onClick={()=>this.handleChange("Like")} >Like</li>
                    <li className="Post" onClick={()=>this.handleChange("Post")}>Post</li>
                    
                    </ul>
                    </div>
                    
            
             <div id ="index"className={this.state.currentcourse} >
            
                {this.props.user&&this.state.current=="Like"?(
                    
                   <Like like = {this.props.like}  posts={this.props.posts} user={this.props.user}></Like>
                   
                )
                :
                (
                        
                        <div><h3　className='center' >自分の質問</h3>
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
                            </CardActions>
                            </Card> 
                            </div>
                        )
                    })}  
                   </div>
                )
               
                    
                }
                
                </div>  
               
            <Link to='/posts/index'>ホームへ戻る</Link>
            </div>
        )
    }
}

export default Mypage
