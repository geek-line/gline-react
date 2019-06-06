import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'





class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            course: '',
            nickname: ''
        }

        this.send = this.save.bind(this);
    }

    handleInputcourse(event) {
        this.setState({

            course: event.target.value
        })
    }
    handleInputnickname(event) {
        this.setState({
            nickname: event.target.value

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

        const user = firebase.auth().currentUser
        if (user) {
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                pic: user.photoURL || '/images/profile_placeholder.png',
                email: user.email,
                course: this.state.course,
                nickname: this.state.nickname
            })
                .then(() => {
                    console.log(`追加に成功しました `);
                })
                .catch((error) => {
                    console.log(`追加に失敗しました (${error})`);
                });
        }
    }


    render() {
        console.log(this.props.user)
        return (
            
            <BrowserRouter>
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
                                <div>名前: {this.props.user && this.props.user.displayName}</div>
                                <div>E-mail: {this.props.user && this.props.user.email}</div>
                                <div><img src={this.props.user.photoURL || '/images/profile_placeholder.png'}></img></div>
                                <form>
                                    <div>ニックネームを入力:
                    <input type='text' value={this.state.nickname} onChange={this.handleInputnickname.bind(this)} />
                                    </div>
                                    <div>コースを入力:
                    <input type='text' value={this.state.course} onChange={this.handleInputcourse.bind(this)} />
                                    </div>


                                    {this.state.nickname == '' ?
                                        (
                                            <div>名前を入力してください</div>
                                        ) : (
                                            this.state.course == 'game' || this.state.course == 'web' || this.state.course == 'iphone' ?
                                                (
                                                    <button onClick={this.save}><Link to='/index'>geek-lineに登録</Link></button>

                                                ) : (
                                                    <div>コースを入力してください(WEBコース="web",GAMEコース="game",iPhoneコース="iphone")</div>

                                                )
                                        )
                                    }


                                </form>
                                <li className="gline-logout" onClick={this.logout}><Link to='/'>ログアウト</Link></li>
                            </div>
                        ) : (
                                <div></div>
                            )}
                    </div>

                    <footer>
                        <div className="footer-content">

                        </div>
                    </footer>
                </div>
            </BrowserRouter>
           
        );
    }
}



export default Login