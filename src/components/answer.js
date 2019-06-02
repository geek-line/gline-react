//解答の閲覧画面のコンポーネントを編集
import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Answer extends React.Component{
    constructor(){
        super()
        this.state={

        }
        
    }

    render(){
        
        return(
            <div>
                解答閲覧画面です
            </div>
        );
    }
}

export default Answer