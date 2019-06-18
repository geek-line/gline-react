import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'
import Detail from "./Detail"

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            posts:[],
            postpage:false,
            user:null,
            pictureurl:"",
            detail:[],
            expanded: false,

        }
        
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
   
 

    render(){

        const button_style = {
            position: 'fixed',
            right: 30,
            bottom: 30
        }
       
        return(
            
            <div>
                {this.props.user&&
                    this.props.postpage==false&&
                    <div>
                    <div><h3　className='center' >回答募集中の質問</h3></div>
                        {this.props.posts.map((post,i) => { 
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

                                    {/* <Link to={`/posts/index/${post.id}`}>{post.title}</Link> */}


                                    {/* <div className="post-body">{post.body}</div>
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
                        </div>
                }
                 <div>
                    <Link to ={`/posts/index/user/${this.props.user.uid}`}></Link>
                    </div>
                    {this.props.user&&
                        this.props.postpage?(
                            <div>
                            <div><Post user = {this.props.user} postpage={this.props.postpage} changepost={this.props.changepost}/></div>
                            <button onClick={this.props.changepost}>投稿をやめる</button>
                            </div>
                        )
                        :
                        (
                            <div>
                                <FloatingActionButton sytle={button_style} onClick={this.props.post} >
                                    <ContentAdd/>
                                </FloatingActionButton>
                            </div>
                        )
                        
                    }
            </div>
        );
    }
    
}

export default Index
