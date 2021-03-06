//解答の閲覧画面のコンポーネントを編集
import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import firebase, { db, storage } from '../firebase';




const style = {
    height: 20,
    width: 60,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
    
  };


class Response extends React.Component{
    constructor(props){
        super(props)
        this.state={

            text : "",
            responseimageurls:[],
            files:[],
            responses:[]
            
         }
         this.handleInputText = this.handleInputText.bind(this);
         
         this.handleFileSelect = this.handleFileSelect.bind(this);
     }


     componentDidMount(){

        
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
          })

        const responsesref = db.collection("Responses").orderBy('timestamp', 'desc')
        responsesref.onSnapshot((snapshot) => {
            const responses = snapshot.docs.map( (responsedoc) =>{
                
                const response = responsedoc.data();
                    //  console.log(post);
                if(response.responseimageurl.length!=0){
                    const pathref = storage.ref().child(`images/${response.responseimageurls}`)
                    pathref.getDownloadURL().then((url)=>{ 

                        this.setState((state)=>{
                            const index =  state.responses.findIndex((response)=>{
                                return response.id === responsedoc.id;
                            })
                            state.responses[index].responseimageurl.push(url)


                            
                            return state
                        })
                    })

                    
                }
                return {...response,id:responsedoc.id}
                
               
            })
            const refid =this.props.match.params.id
            console.log(responses)
            const res = responses.find((responses) => {return (responses.post_id === refid);})
            console.log(res)
            this.setState({
                responses : responses.filter((responses) => {return (responses.post_id === refid);}),
                
            })

           
          
        });
        
    
    }

     save = (e) => {

        

        if(this.state.files!=[]){
             e.preventDefault()
             this.state.files.forEach((file)=>{
                
                 storage.ref().child(`images/${file.name}`).put(file).then(snap => {
                     console.log('Uploaded a blob or file!');
                 });
             })
         }   
         let id =0;
         let post_id = String(id)
         const user = firebase.auth().currentUser
         const userdb = db.collection("users").doc(user.uid);
         userdb.get().then((userdb) => {
             if (userdb.exists) {
                 console.log("Document data:", userdb.data());
             
                     if(this.state.files==null){
                         db.collection("Responses").doc().set({
                             post_id : this.props.match.params.id,
                             name: userdb.data().name,
                             pic: userdb.data().pic,
                             email: userdb.data().email,
                             course: userdb.data().course,
                             nickname: userdb.data().nickname,
                             text: this.state.text,
                             favcount: 0,                           
                             timestamp: new Date(),                            
                             responseimageurl:[]
 
                         })        
                         .then(() => {
                             
                            this.setState({

                                text:""
                            })
                             console.log(`追加に成功しました `);
                             
                             
                         })
                         .catch((error) => {
                             console.log(`追加に失敗しました (${error})`);
                         });

                     }else{
                         db.collection("Responses").doc().set({
                            post_id : this.props.match.params.id,
                             name: userdb.data().name,
                             pic: userdb.data().pic,
                             email: userdb.data().email,
                             course: userdb.data().course,
                             nickname: userdb.data().nickname,
                             text: this.state.text,
                             favcount: 0,                           
                             timestamp: new Date(),      
                             responseimageurl:this.state.responseimageurls                      
                           
 
 
                         })        
                         .then(() => {
                           
                             console.log(`追加に成功しました `);
                             this.setState({

                                text:""
                            })
                                
                            
                         })
                         .catch((error) => {
                             console.log(`追加に失敗しました (${error})`);
                         });
 
 
 
                     }
             } else {
                 // doc.data() will be undefined in this case
                 console.log("No such document!");
             }
                     
         })
         .catch(function(error){
         console.log(`取得失敗 (${error})`);
             });
             
     }


    handleInputText(event) {
        this.setState({

            text: event.target.value
        })
    }


    handleFileSelect = (e) => {
        const files = e.target.files
        Array.prototype.forEach.call(files,(file) => {
            const reader = new FileReader()
            reader.addEventListener("load",()=>{
                this.setState((state)=>{
                    state.responseimageurls.push(reader.result)
                    state.files.push(file)
                    return state
                })

             })
            if(file){
                reader.readAsDataURL(file)
            }
        });
        
    }

    render(){
       
        const user = firebase.auth().currentUser
        return(
            <div>
                <h3>回答する</h3>
                <Card>
                
                            <CardText>
                            
                            <h5>回答を入力する</h5>
                            <br/> 
                            <TextField fullWidth={true} value={this.state.text} hintText="入力する" onChange={this.handleInputText.bind(this)} />  
                            
                            
                    {/* <input type='text' value={this.state.Text} onChange={this.handleInputText.bind(this)} /> */}
                    </CardText>
                
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleFileSelect.bind(this)} multiple />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                    {
                        this.state.responseimageurls.map((imageurl,i)=>{
                            return (
                            <div key={i}>
                                <img src={imageurl}></img>
                            </div>
                            )
                        })
                    }
                    
                </div>
                {this.state.text?
                (
               
                <FlatButton onClick={this.save}　label="回答を投稿する" />
                )
                :
                (
                    <FlatButton label="回答を投稿する" disabled={true} />
                )
                }
                </Card>
                <br/>
                <h3>回答一覧</h3>
                {this.state.responses&&
                    this.state.responses.map((post,i) => { 
                    
                    return(
                        
                        <div key={i} className="response">
                        {post.email==user.email?
                        (
                            <div className="cardleft">
                        <Card>
                            <CardHeader
                            
                            subtitle={post.nickname}
                            avatar={post.pic}
                            >
                            
                            </CardHeader>
                            <CardText>
                            {post.text}
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
                            
                        </Card> 
                        </div>
                        )
                        :    
                        (
                            <div className="cardright">
                        <Card>
                            
                            <CardHeader
                            
                            subtitle={post.nickname}
                            avatar={post.pic}
                            >
                            
                            </CardHeader>
                            <CardText>
                            {post.text}
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
                            
                        </Card> 
                        </div>
                        )
                        }
                        </div>
                    )
                })
                }

            
                
            </div>
                
        );
        
    }
}

export default Response
