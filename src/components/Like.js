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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


const style = {
    height: 20,
    width: 60,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
    
  };

class Like extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myposts:[],
           answered:false,
           answerdisplay:false,
           likedposts:[]
        }
      
    
    }

 
   
    render(){
        const uid = firebase.auth().currentUser.uid 
        const likeposts= this.props.posts.filter((posts) => {return (posts.favusers != undefined&&posts.favusers[uid] == true);})
        const likedposts = likeposts.filter((searchs) => {return (searchs.body.indexOf(this.props.search) > -1)|| (searchs.title.indexOf(this.props.search) > -1);})
        return(
           <div>
                {/* <li className="grey lighten-3"><div className="search"><TextField fullWidth={true} value={this.props.search} hintText="検索する" onChange={this.props.handleInputsearch} class="textsearch"id="textsearch"/></div><br/></li> */}
            
           
                {
                    likedposts.map((post,i) => { 
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
                    })                   
                }

              
            
            </div>
        )
    }
}

export default Like   