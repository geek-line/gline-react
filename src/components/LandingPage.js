import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import { BrowserRouter, Route, Link,Redirect } from 'react-router-dom';


import firebase from '../firebase'
import Login from "./Login";
import PropTypes from 'prop-types';

import LoginHeader from './items/Login-header'


class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    

    render(){
        
        return(
            <div>
                {this.props.user&&
               
                    <Redirect to='/posts/index'/>
          
                }
                <div className="main">
                    <div className="container-landingPage">
                        <div className='title center'>
                        <br/><br/><br/><br/>
                            <div className="title-landingPage"><h3>自分のプロダクトを<br/>さらなるものへ</h3><br/></div>
                            <div><a className="btn" onClick={this.props.login}><Link to='/posts/index'>GLINEにアクセス</Link></a></div>
                            <br/><br/><br/><br/>
                            <div><a href="#about"><i className="material-icons">details</i></a></div>
                           
                        </div>
                        <div className='about'id="about">
                            <br/><br/>
                            <div className='aboutgline center' ><h4>GLINEの3つの特徴</h4><br/></div>
                            <ul className='row center'>
                                <li className='col m4 s12'>
                                    <div className="card">
                                        <div className="card-content">
                                            <span className="card-title">誰でもいつでも簡単に質問</span>
                                            <p>ここにどうして誰でもいつでも簡単に質問できるのかの詳細を表示</p>
                                        </div>
                                    </div>
                                </li>
                                <li className='col m4 s12'>
                                    <div className="card">
                                        <div className="card-content">
                                            <span className="card-title">みんなで質問を共有</span>
                                            <p>ここにどうしてみんなで質問を共有できるのかを表示</p>
                                        </div>
                                    </div>
                                </li>
                                <li className='col m4 s12'>
                                    <div className="card">
                                        <div className="card-content">
                                            <span className="card-title">便利な記事を簡単に検索</span>
                                            <p>どうして便利な記事を簡単に共有できるのかをここに表示</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
LandingPage.propTypes = {
    user: PropTypes.string.isRequired,
  };
  
export default LandingPage
