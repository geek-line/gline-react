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
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
    height: 20,
    width: 60,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
    
  };
class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
           post:[],
           answered:false,
         
        }
        this.answered=this.answered.bind(this)
        
    }

    answered(isAnswered,post){
       
        const anspost = {
            ...post,
            answered: isAnswered
        }
        console.log(post.id)
        db.collection("posts").doc(post.id).set(anspost)
        .then(doc => 
            {      
                    console.log('いいねしました');

            })
            .catch(err => 
            {
            console.log('Error getting document', err);
            });             
        
    }
   

    render(){
        console.log(this.state.post.answered)
        const uid =this.props.match.params.id
        // uidとデータベースにあるpostのidを検索して取り出す
        const post= this.props.posts.find((posts) => {return (posts.id === uid);})
        const user = firebase.auth().currentUser
        
        return(
            <div className="detail">

                {this.props.user&&
                        
                           <div　>
                             <Card　>
                            <CardHeader
                            title={post.title}
                            subtitle={post.nickname}
                            avatar={post.pic}
                            >
                                 {
                                    post.answered?(
                                    
                                       
                                        <div>解決済み</div>
                                    
                                )
                                :
                                (
                                    
                                    <div>未解決</div>
                                )
                                
                                }
                            </CardHeader>
                            <CardText>
                            {post.body}
                            </CardText>
                            {post.postimageurl&&
                                    post.postimageurl.map((imageurl,j)=>{
                                        return (
                                            
                                        <div key={j}>
                                        <img src={imageurl} className={`$post-image-{j}`}></img>
                                        </div>
                                        )
                                    })
                                }
                            <CardActions>
                            {/* <FlatButton  label="詳細へ" href ={`/posts/index/${post.id}`} /> */}
                                {post.favusers[this.props.user.uid]==null?
                                (
                                    <FlatButton  onClick={e=>this.props.like(post)} label="いいね"></FlatButton>
                                )
                                :
                                (
                                    <FlatButton  onClick={e=>this.props.like(post)} label="いいねを取り消す"></FlatButton>
                                )
                                }
                                <Paper style={style} zDepth={0} >{post.favcount}</Paper>
                                 {user.email==post.email?(
                                    post.answered?(
                                    
                                       
                                        <FlatButton onClick={()=>this.answered(false,post)}>解決済み取り消し</FlatButton>
                                    
                                )
                                :
                                (
                                    
                                    <FlatButton onClick={()=>this.answered(true,post)}>解決済みにする</FlatButton>
                                )
                                ):(<div></div>)
                                }
                            
                            </CardActions>
                            </Card> 
                            </div> 
                         
                           
                   
                }

               
            <br/>
            
            <Response match={this.props.match}/>
            {/* <Link to='/posts/index'>ホームへ戻る</Link> */}
            </div>
        )
    }
}

export default Detail
