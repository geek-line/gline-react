import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'
import { storage } from '../firebase'



class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body : "",
            title : "",
            favcount: 0,
            librarycount: 0,
            answered:false,
            timestamp:null,
            file:null,
            imageurl:""
            

        }

        this.save = this.save.bind(this);
        this.handleInputtitle = this.handleInputtitle.bind(this);
        this.handleInputbody = this.handleInputbody.bind(this);
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
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.addEventListener("load",()=>{
            this.setState({
                imageurl: reader.result,
                file
            })

        })
        if(file){
            reader.readAsDataURL(file)
        }
    }

    

    save = (e) => {

        console.log(this.state.imageurl)
       
        e.preventDefault()
        storage.ref().child(`images/${this.state.file.name}`).put(this.state.file).then(snap => {
            console.log('Uploaded a blob or file!');
        });
        let id =0;
        let post_id = String(id)
        const user = firebase.auth().currentUser
        const userdb = db.collection("users").doc(user.uid);
        userdb.get().then((userdb) => {
            if (userdb.exists) {
                console.log("Document data:", userdb.data());
            
                    db.collection("posts").doc().set({
                        post_id : db.collection("posts").doc(),
                        name: userdb.data().name,
                        pic: userdb.data().pic,
                        email: userdb.data().email,
                        course: userdb.data().course,
                        nickname: userdb.data().nickname,
                        body: this.state.body,
                        title: this.state.title,
                        favcount: 0,
                        librarycount: 0,
                        timestamp: new Date(),
                        answered:this.state.answered,
                        postpicname:this.state.file.name

                    })
                
                        .then(() => {
                            this.setState({
                                post_id : db.collection("posts").doc(),
                                name: userdb.data().name,
                                pic: userdb.data().pic,
                                email: userdb.data().email,
                                course: userdb.data().course,
                                nickname: userdb.data().nickname,
                                body: this.state.body,
                                title: this.state.title,
                                favcount: 0,
                                librarycount: 0,
                                timestamp: new Date(),
                                index : true
                            })
                            console.log(`追加に成功しました `);
                            this.props.changepost()
                        })
                        .catch((error) => {
                            console.log(`追加に失敗しました (${error})`);
                        });
                    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
                    
        })
            .catch(function(error){
            console.log(`取得失敗 (${error})`);
             
            });
    }


    render() {
       console.log(this.props.user)
        return (
            
         
                <div>
   
                    <div className="main">
                        <div className="App">
                            <p className="App-intro">

                            </p>


                        </div>
                        
                        {this.props.user ? (
                            <div>
                              
                                <form>
                                    <div className="posttitle">タイトルを入力:
                                        <input type='text' value={this.state.title} onChange={this.handleInputtitle.bind(this)} />
                                    </div>
                                    <div className="postbody">投稿内容を入力:
                                        <input type='text' value={this.state.body} onChange={this.handleInputbody.bind(this)} />
                                    </div>
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file"onChange={this.handleFileSelect.bind(this)} />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text"/>
                                        </div>
                                        <img src = {this.state.imageurl}/>
                                    </div>
                                    

                                    {this.state.title == ''?
                                        (
                                            <div>タイトルを入力してください</div>
                                        ) : (
                                             this.state.body != ''?
                                                (
                                                    <button onClick={this.save}><Link to='/index'>質問を投稿する</Link></button>

                                                ) : (
                                                    <div>投稿内容を入力してください</div>

                                                )
                                        )
                                    }


                                </form>
                               
                            </div>
                        ) : (
                                <div></div>
                            )
                           
                        }
                        
                    </div>

                    <footer>
                        <div className="footer-content">

                        </div>
                    </footer>
                </div>
           
           
        );
    }
}



export default Post