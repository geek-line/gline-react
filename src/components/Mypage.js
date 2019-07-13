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

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


class Mypage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myposts:[],
           answered:false,
           answerdisplay:false
        }
        this.answered=this.answered.bind(this)
    }


    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
      };
    
      handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
      };
    
      handleExpand = () => {
        this.setState({expanded: true});
      };
    
      handleReduce = () => {
        this.setState({expanded: false});
      };
   
 
    answered(isAnswered){
        this.setState((state)=>{
            state.post.answered=isAnswered
            
        })
        console.log(this.state.post);
        console.log(this.state.post.answered);
        const ansewredPost = {
            ...this.state.post,
            answered: this.state.post.answered
        }
        db.collection("posts").doc(this.state.post.id).set(ansewredPost) .then(doc => 
            {      
                    console.log('いいねしました');

            })
            .catch(err => 
            {
            console.log('Error getting document', err);
            });       
    
        
    }
   

    render(){
        const user = firebase.auth().currentUser  
        const myposts= this.props.posts.filter((posts) => {return (posts.email === user.email);})
        // console.log(this.state.post.answered)
        return(
           <div>
             <div><h3　className='center' >自分の質問</h3></div>
             <Link to='/posts/like'> いいねした投稿</Link>
                {this.props.user&&
                    myposts.map((post,i) => { 
                        return(
                            <div key={i}>
                                
                            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardHeader
                            title={post.title}
                            subtitle={post.nickname}
                            avatar={post.pic}
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            <CardText>
                            <Toggle
                                toggled={this.state.expanded}
                                onToggle={this.handleToggle}
                                labelPosition="right"
                                label="This toggle controls the expanded state of the component."
                            />
                            </CardText>
                            <CardMedia
                            expandable={true}
                            // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                             {post.postimageurl&&
                                    post.postimageurl.map((imageurl,j)=>{
                                        return (
                                            
                                        <div key={j}>
                                        <img src={imageurl} className="post-image"></img>
                                        </div>
                                        )
                                    })
                                }
                            
                            {/* <img src="images/nature-600-337.jpg" alt="" /> */}
                            </CardMedia>
                            <CardTitle title={post.title} subtitle={post.nickname} expandable={true} />
                            <CardText expandable={true}>
                                {post.body}
                            </CardText>
                            <CardActions>
                            <FlatButton label="Expand" onClick={this.handleExpand} />
                            <FlatButton label="Reduce" onClick={this.handleReduce} />
                            </CardActions>
                            </Card>
                            </div>
                        )
                    })                   
                }

                {this.state.answerdisplay?(
                    this.state.post.answered?(
                    <div>
                        解決済み
                        <button onClick={()=>{this.answered(false)}}>回答済み取り消し</button>
                    </div>
                )
                :
                (
                    <div>
                        未解決
                    <button onClick={()=>{this.answered(true)}}>回答済みにする</button>
                    </div>
                )
                ):(<div></div>)
                }
            
            
            <Link to='/posts/index'>ホームへ戻る</Link>
            </div>
        )
    }
}

export default Mypage
