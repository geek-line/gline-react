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
            <div>

                {this.props.user&&
                        
                           <div>
                                {post.title}
                                {post.body}
                                {post.name}
                                {post.pictureurl}
                               
                                {post.course}
                                {post.nickname}
                                {post.favcount}
                                {post.librarycount}
                                {post.answered}
                                {post.postimageurl&&
                                    post.postimageurl.map((imageurl,j)=>{
                                        return (
                                        <div key={j}>
                                        <img src={imageurl} className="post-image"></img>
                                        </div>
                                        )
                                    })
                                }
                            </div> 
                         
                           
                   
                }

                {user.email==post.email?(
                    post.answered?(
                    <div>
                        解決済み
                        <button onClick={()=>this.answered(false,post)}>回答済み取り消し</button>
                    </div>
                )
                :
                (
                    <div>
                        未解決
                    <button onClick={()=>this.answered(true,post)}>回答済みにする</button>
                    </div>
                )
                ):(<div></div>)
                }
            
            <Response match={this.props.match}/>
            <Link to='/posts/index'>ホームへ戻る</Link>
            </div>
        )
    }
}

export default Detail
