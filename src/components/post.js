import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'




class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body : "",
            title : "",
            favcount: 0,
            librarycount: 0,
            answered:false,
            timestamp:null
        }

        this.save = this.save.bind(this);
        this.handleInputtitle = this.handleInputtitle.bind(this);
        this.handleInputbody = this.handleInputbody.bind(this);
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
    // coursecheck = () => {
    //     var userdb = db.collection('users').doc('user.uid');
    //     if (userdb.course == "") {

    //         return true
    //     } else {
    //         return false
    //     }
    // }




    save = (e) => {
        e.preventDefault()
        
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
                        pic: userdb.data().photoURL || '/images/profile_placeholder.png',
                        email: userdb.data().email,
                        course: userdb.data().course,
                        nickname: userdb.data().nickname,
                        body: this.state.body,
                        title: this.state.title,
                        favcount: 0,
                        librarycount: 0,
                        timestamp: new Date(),
                        answered:this.state.answered

                    })
                
                        .then(() => {
                            this.setState({
                                post_id : db.collection("posts").doc(),
                                name: userdb.data().name,
                                pic: userdb.data().photoURL || '/images/profile_placeholder.png',
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
       
        return (
            
         
                <div>
                    <header>

                        {this.props.user ?
                            (
                                <div className="header-content">
                                    <ul className="header-list">

                                    </ul>

                                </div>
                            )
                            :
                            (
                                <div className="header-content">


                                </div>




                            )}
                    </header>
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
                                    <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file"/>
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text"/>
                                    </div>
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
                                <li className="gline-logout" onClick={this.logout}><Link to='/'>ログアウト</Link></li>
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