import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";

import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'
import Index from './Index'
import PropTypes from 'prop-types';

import "./style.css"
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoginHeader from './items/Login-header'



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            course: '',
            nickname: '',
            logined: true
        }

        this.save = this.save.bind(this);
        this.useStyles = makeStyles(theme => ({
            root: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
        
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ user })
        })
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

    save = (e) => {
      
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
        const classes = this.useStyles().bind(this);
        const [values, setValues] = React.useState({
            age: '',
            name: 'hai',
        });

        const inputLabel = React.useRef(null);
        const [labelWidth, setLabelWidth] = React.useState(0);
        React.useEffect(() => {
            setLabelWidth(inputLabel.current.offsetWidth);
        }, []);

        function handleChange(event) {
            setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
            }));
  }
    
        return (
            
            
                <div>
                   
                      
                    {this.state.logined?(
                        
                        this.props.user ? (
                            <div>
                                <div className="plfname">名前: {this.props.user && this.props.user.displayName}</div>
                                <div className="plfemail">E-mail: {this.props.user && this.props.user.email}</div>
                                <div className="plf">コース: {this.props.user && this.props.user.web}</div>
                               <form>
                                    <div className="plfnickname">ニックネームを入力:
                    <input type='text' value={this.state.nickname} onChange={this.handleInputnickname.bind(this)} />
                                    </div>
                                    <div className="plfcourse">コースを入力:
                    <input type='text' value={this.state.course} onChange={this.handleInputcourse.bind(this)} />
                                    </div>
                                    

                                    {this.state.nickname == '' ?
                                        (
                                            <div>名前を入力してください</div>
                                        ) : (
                                            this.state.course == 'game' || this.state.course == 'web' || this.state.course == 'iphone' ?
                                                (
                                                    <button onClick={this.save}><Link to='/posts/index'>geek-lineに登録</Link></button>

                                                ) : (
                                                    <div>コースを入力してください(WEBコース="web",GAMEコース="game",iPhoneコース="iphone")</div>

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
     <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
                    <Select
                    value={values.age}
                    onChange={handleChange}
                    input={<FilledInput name="age" id="filled-age-simple" />}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                
                    </div> 
                    
               
                
            
            
        );
    }
}
    Login.propTypes = {
        user: PropTypes.string.isRequired,
        };
        
     


export default Login
