import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";

import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'
import Index from './Index'
import PropTypes from 'prop-types';

import "./style.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const courses = [
  'WEB',
  'GAME',
  'iPhone',
  'WEB Expert',
  
];



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCourses: [],
            course: '',
            nickname: '',
            logined: true
        }

        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ user })
        })
      }

    handleChange = (event, index, selectedCourses) => this.setState({selectedCourses});
    menuItems(selectedCourses) {
        return courses.map((course) => (
          <MenuItem
            key={course}
            insetChildren={true}
            checked={selectedCourses && selectedCourses.indexOf(course) > -1}
            value={course}
            primaryText={course}
          />
        ));
      }


    handleInputnickname(event) {
        this.setState({
            nickname: event.target.value

        })
    }

    save = (e) => {
       
        const user = firebase.auth().currentUser
        if (user) {
            db.collection("users").doc(user.uid).set({
                name: user.displayName,
                pic: user.photoURL || '/images/profile_placeholder.png',
                email: user.email,
                course: this.state.selectedCourses,
                nickname: this.state.nickname
            })
                .then(() => {
                    this.setState({
                        logined : true
                    })
                    console.log(`追加に成功しました `);
                    
                })
                .catch((error) => {
                    console.log(`追加に失敗しました (${error})`);
                });
        }
    }

    render() {
        console.log(this.props.user)
        console.log(this.state.selectedCourses)
        const {selectedCourses} = this.state;
        return (
            
            
                <div>
                   
                      
                    {this.state.logined?(
                        
                        this.props.user ? (
                            <div>
                                <div className="plfname">名前: {this.props.user && this.props.user.displayName}</div>
                                <div className="plfemail">E-mail: {this.props.user && this.props.user.email}</div>
                               
                               <form>
                                    <div className="plfnickname">ニックネームを入力:
                    <input type='text' value={this.state.nickname} onChange={this.handleInputnickname.bind(this)} />
                                    </div>
                                    <div className="plfcourse">コースを入力:<br/>

                                    <SelectField
                                        multiple={true}
                                        hintText="Select courses"
                                        value={selectedCourses}
                                        onChange={this.handleChange}
                                    >
                                        {this.menuItems(selectedCourses)}
                                    </SelectField>
                                    </div>
                                    

                                    {this.state.nickname == '' ?
                                        (
                                            <div>名前を入力してください</div>
                                        ) : (
                                            this.state.selectedCourses.length != 0?
                                                (
                                                    <button onClick={this.save}><Link to='/posts/index'>geek-lineに登録</Link></button>

                                                ) : (
                                                    <div>コースを選択してください</div>

                                                )
                                        )
                        
                                    }
                                    


                                </form>

                                <li className="gline-logout" onClick={this.props.logout}><Link to='/'>ログアウト</Link></li>
                            </div>
                        ) : (
                                <div></div>
                            )
        
          
                        
                    
                    )
                    :
                    (
                        <div></div>  
                    )
                    }
  
                
                    </div> 
                    
               
                
            
            
        );
    }
}


export default Login
