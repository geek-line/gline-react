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


class Library extends React.Component{
    constructor(props){
        super(props)
        this.state={
            myposts:[],
           answered:false,
           answerdisplay:false,
           Libraryposts:[]
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
        const uid = firebase.auth().currentUser.uid 
        const Libraryposts= this.props.posts.filter((posts) => {return (posts.favusers != undefined&&posts.favusers[uid] == true);})
       
        return(
           <div>
             <div><h3　className='center' >いいねした質問</h3></div>
           
                {this.props.user&&
                    Libraryposts.map((post,i) => { 
                        return(
                            <div key={i}>
                                <button key={i} onClick={e=>this.props.like(post,i)}>{post.favcount}</button>
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

export default Library   