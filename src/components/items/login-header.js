import React from "react";

export default () => {
    return(
        <header>
            <div className="login-header grey lighten-3">
                <ul className="row center">
                    <li className="l2 m2 s12 col logo-gline"><a href=""><span className='orange-text text-lighten-1'>G</span><span className='light-blue-text text-lighten-1'>L</span><span className='black-text'>I</span><span className='green-text text-lighten-1'>N</span><span className='red-text text-lighten-1'>E</span></a></li>
                    <li className="offset-l1 l2 hide-on-med-and-down col"><p>GLINEとは</p></li>
                    <li className="l2 offset-l3 offset-m6 m2 hide-on-med-and-down col"><p>ヘルプ</p></li>
                    <li className="l2 offset-m7 m3 s12 col"><a href="">ログイン</a></li>
                </ul>
            </div>          
        </header>
    )
}