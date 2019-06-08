import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LoginHeader from './items/login-header'
import firebase from '../firebase'
import Login from "./login";
import PropTypes from 'prop-types';

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ user })

        })
        console.log("おはよう")
      }
   

    render() {

        return (
           
                <div>
                    {this.props.user ? (
                        <Login/>
                    )
                    :
                    (
                            this.props.isLogging ? (
                                <div>読み込み中です</div>
                            )
                            :
                            (
                                    <div>
                                        <li className="gline-access"><button onClick={this.props.login}><Link to='/login'>Glineにアクセス</Link></button></li>
                                    </div>
                            )
                        )
                    }
                </div>
            
        );
    }
}
LandingPage.propTypes = {
    user: PropTypes.string.isRequired,
  };
  
export default LandingPage