import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import "./style.css"

class Login extends React.Component{
    constructor(){
        super()
        this.state={

        }
        
    }

    render(){
        
        return(
            <div>
                <header class="page-header teal">
                    <div className="header-content">
                        <ul className="header-list">
                            <li className="header-logo">GLINE</li>
                            <li className="header-overview">GLINEの概要</li>
                            <li className="header-help">ヘルプ</li>
                            <li className="header-login">GLINEにアクセス</li>
                        </ul>
                    </div>
                </header>
                <div className="main">
                <div className="row center">
                    <div className="xl1 l2 m4 s6 col red lighten-5">1</div>
                    <div className="xl1 l2 m4 s6 col red lighten-4">2</div>
                    <div className="xl1 l2 m4 s6 col red lighten-3">3</div>
                    <div className="xl1 l2 m4 s6 col red lighten-2">4</div>
                    <div className="xl1 l2 m4 s6 col red lighten-1">5</div>
                    <div className="xl1 l2 m4 s6 col red">6</div>
                    <div className="xl1 l2 m4 s6 col red lighten-5">7</div>
                    <div className="xl1 l2 m4 s6 col red lighten-4">8</div>
                    <div className="xl1 l2 m4 s6 col red lighten-3">9</div>
                    <div className="xl1 l2 m4 s6 col red lighten-2">10</div>
                    <div className="xl1 l2 m4 s6 col red lighten-1">11</div>
                    <div className="xl1 l2 m4 s6 col red">12</div>
                </div>

                <div class="video-container center">
                        <iframe width="853" height="480" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameborder="0" allowfullscreen></iframe>
                </div>
                <div className="s2 center">
                    <a class="btn-floating pulse"><i class="material-icons"></i></a>
                </div>
                


                <div className="row center">
                    <div className="s2 col">1</div>
                    <div className="s2 col">2</div>
                    <div className="s2 col">3</div>
                    <div className="s2 col">4</div>
                    <div className="s2 col">5</div>
                    <div className="s2 col">6</div>
                </div>
                    
                </div>
        
                <footer class="page-footer teal">
                    <div class="container">
                        <div class="row">
                        <div class="col l6 s12">
                            <h5 class="white-text">Footer Content</h5>
                            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                        </div>
                        <div class="col l4 offset-l2 s12">
                            <h5 class="white-text">Links</h5>
                            <ul>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="footer-copyright">
                <div class="container">
                © 2014 Copyright Text
                <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </footer>
            </div>
        );
    }
}

export default Login