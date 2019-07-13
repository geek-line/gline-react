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
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import TextField from 'material-ui/TextField';


// const styles = {
//     headline: {
//       fontSize: 24,
//       paddingTop: 16,
//       marginBottom: 12,
//       fontWeight: 400,
//     },
//     slide: {
//       padding: 10,
//     },
//   };

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            slideIndex: "WEB",
            posts:[],
            postpage:false,
            user:null,
            pictureurl:"",
            detail:[],
            expanded: false,
            currentcourse: "WEB",
           
        }
         

    }



        
    handleChange = (value) => {
        console.log(value)
        this.setState({
          slideIndex: value,
          currentcourse:value
        });
      };
      
   
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
            bottom: 30,
           
        }
        console.log(this.props.search)
        // console.log(this.currentcourse)
            const searchs = this.props.posts.filter((searchs) => {return (searchs.body.indexOf(this.props.search) > -1)|| (searchs.title.indexOf(this.props.search) > -1);})
            const posts = searchs.filter((posts) => {return (posts.course.indexOf(this.state.currentcourse) >= 0 && posts.answered ==false );})
            const answeredposts = searchs.filter((posts) => {return (posts.course.indexOf(this.state.currentcourse) >= 0 && posts.answered ==true );})
            return(
            
                <div>
                   
                
                {this.props.user&&
                    this.props.postpage==false&&
                    

                    <div>
                    <li className="grey lighten-3"><div className="search"><TextField fullWidth={true} value={this.props.search} hintText="検索する" onChange={this.props.handleInputsearch} class="textsearch"id="textsearch"/></div><br/></li>

                    <div id="tab" >
                    <ul>
                    <li className="WEB" onClick={()=>this.handleChange("WEB")} >WEB</li>
                    <li className="GAME" onClick={()=>this.handleChange("GAME")}>GAME</li>
                    <li className="iPhone"onClick={()=>this.handleChange("iPhone")}>iPhone</li>
                    <li className="WEB Expert" onClick={()=>this.handleChange("WEB Expert")}>WEB Expert</li>
                    </ul>
                    </div>
                    
                    <div id ="index"className={this.state.currentcourse} >
                    
                    <ul>
                    <li><h3　className='notanswer' >回答募集中の質問</h3>
                    
                    
                   
                        {posts.map((post,i) => (
                            
                            <div key={i} className="post">
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
                                <div>{post.body}</div>
                                <Link to ={`/posts/index/${post.id}`} >詳細へ</Link>
                                <button key={i} onClick={e=>this.props.like(post,i)}>{post.favcount}</button>
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
                        )}
                    </li>
                    
                    <li><h3　className='answer' >回答済みの質問</h3>
                    
                    
                     {answeredposts.map((post,i) => (
                         
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
                             <div>{post.body}</div>
                             <Link to ={`/posts/index/${post.id}`} >詳細へ</Link>
                             <button key={i} onClick={e=>this.props.like(post,i)}>{post.favcount}</button>
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
                     )}
                     </li>
                     
                    
                     </ul>
                     </div>
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
                                <FloatingActionButton sytle={button_style} onClick={this.props.post} className="postbutton">
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
