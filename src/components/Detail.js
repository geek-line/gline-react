import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import Post from "./Post"
import { db } from '../firebase'
import firebase from '../firebase'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { storage } from '../firebase'
import Posts from "./Posts";

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
           post:[],
           body : "",
           title : "",
           postimageurls:[],
           responses:[]
           
        }
        this.handleInputtitle = this.handleInputtitle.bind(this);
        
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleInputtitle(event) {
        this.setState({

            title: event.target.value
        })
    }

    handleInputbody(event) {
        this.setState({
            body: event.target.value

        })
    }

    handleFileSelect = (e) => {
        const files = e.target.files
        Array.prototype.forEach.call(files,(file) => {
            const reader = new FileReader()
            reader.addEventListener("load",()=>{
                this.setState((state)=>{
                    state.postimageurls.push(reader.result)
                    state.files.push(file)
                    return state
                })

             })
            if(file){
                reader.readAsDataURL(file)
            }
        });
        
    }

    componentWillMount(){

        

        const postsref = db.collection("posts").orderBy('timestamp', 'desc')
        postsref.limit(20).onSnapshot((snapshot) => {
            const posts = snapshot.docs.map( (postdoc) =>{
                
                const post = postdoc.data();
                    //  console.log(post);
                if(post.postimageurl!=[]){
                    const pathref = storage.ref().child(`images/${post.postimageurl}`)
                    pathref.getDownloadURL().then((url)=>{ 

                        this.setState((state)=>{
                            const index =  state.posts.findIndex((post)=>{
                                return post.id === postdoc.id;
                            })
                            state.posts[index].postimageurl.push(url)


                            
                            return state
                        })
                    })

                    
                }
                return {...post,id:postdoc.id}
                
               
            })
            console.log(posts)
            const uid =this.props.match.params.id
            const post= posts.find((posts) => {return (posts.id === uid);})
            this.setState({
                post:post
            })
           
        });
       
    
    }
   

    render(){
        
        return(
            <div>

                {this.props.user&&
                     
                    
                          <div>
                                {this.state.post.title}
                                {this.state.post.body}
                                {this.state.post.name}
                                {this.state.post.pictureurl}
                               
                                {this.state.post.course}
                                {this.state.post.nickname}
                                {this.state.post.favcount}
                                {this.state.post.librarycount}
                                
                           
                            <div className="posttitle">タイトルを入力:
                            <input type='text' value={this.state.title} onChange={this.handleInputtitle.bind(this)} />
                        </div>
                       
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file" onChange={this.handleFileSelect.bind(this)} multiple />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                            {
                                this.state.postimageurls.map((imageurl,i)=>{
                                    return (
                                    <div key={i}>
                                        <img src={imageurl}></img>
                                    </div>
                                    )
                                })
                            }
                        </div>
                      
                                                    <button onClick={this.save}  ><Link to='/posts'>質問を投稿する</Link></button>

                            </div>
                   
                }
            
                
            </div>
        );
    }
    
}

export default Detail
