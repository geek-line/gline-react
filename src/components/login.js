import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'





class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
            course: ['web'],
            nickname: ''
        }
        
    this.send = this.save.bind(this);
    }

    handleInputText(event) {
        this.setState({
            nickname: event.target.value
        })
      }　　

      handleChange(event) {
        console.log(this.state.course);
        var course = this.state.course;
        var position = course.indexOf(event.target.value);
        if (position === -1) {
            course.push(event.target.value);
        } else {
            course.splice(position, 1);
        }
        this.setState({course: course});
        console.log(this.state);
      };
      
    save=(e)=>{
        e.preventDefault()

        const user = firebase.auth().currentUser
        if( user ){
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                pic: user.photoURL || '/images/profile_placeholder.png',
                email: user.email,
                course: this.state.course,
                nickname:this.state.nickname
            })
            .then(() => {
                console.log(`追加に成功しました `);
            })
            .catch((error) => {
                console.log(`追加に失敗しました (${error})`);
            });
        }
    }


    render(){
        console.log(this.props.user)
        return(
            <BrowserRouter>
            <div>
                 <header>
                 { this.props.user?
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
                <div><img src  ={this.props.user.photoURL || '/images/profile_placeholder.png'}></img></div>
                    <div>ニックネームを入力:
                    <input type='text' value={this.state.nickname} onChange={this.handleInputText.bind(this)}/>
                    </div>
                    
                    <div>いくつでも選んでください
                    <div><input
                        type='radio'
                        value='first'
                        checked={this.state.course.indexOf('first') !== -1}
                        onChange={this.handleChange.bind(this)}
                    />最初の選択肢</div>
                    <div><input
                        type='radio'
                        value='secound'
                        checked={this.state.course.indexOf('secound') !== -1}
                        onChange={this.handleChange.bind(this)}
                    />二番目の選択肢</div>
                    <div><input
                        type='radio'
                        value='third'
                        checked={this.state.course.indexOf('third') !== -1}
                        onChange={this.handleChange.bind(this)}
                    />三番目の選択肢</div>
                    </div>

                        {this.state.nickname == '' ?
                        (
                            <div>名前を入力してください</div> 
                        ):(
                            this.state.course == '' ?
                            (
                              <div>コースを入力してください</div> 
                            ):(
                            <button onClick={this.save}><Link to='/index'>geek-lineに登録</Link></button>
                            )
                            
                        )
                        }
                
                    
                
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