import React from "react";
import "../bower_components/materialize/dist/css/materialize.css";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { db } from '../firebase'
import firebase from '../firebase'
import { storage } from '../firebase'
import "./style.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
const courses = [
    'WEB',
    'GAME',
    'iPhone',
    'WEB Expert',
    
  ];
class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body : "",
            title : "",
            favcount: 0,
            librarycount: 0,
            answered:false,
            timestamp:null,
            files:[],
            postimageurls:[],
            selectedCourses: [],
            postimagenames:[],
            

        }
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this);
        this.handleInputtitle = this.handleInputtitle.bind(this);
        this.handleInputbody = this.handleInputbody.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
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

    handleFileSelect = (e) => {
        const files = e.target.files
        Array.prototype.forEach.call(files,(file) => {
            const reader = new FileReader()
            reader.addEventListener("load",()=>{
                this.setState((state)=>{
                    state.postimageurls.push(reader.result)
                    state.files.push(file)
                    return state
                })

             })
            if(file){
                reader.readAsDataURL(file)
                this.setState((state)=>{
                    state.postimagenames.push(file.name)
                    return state
                })
            }
        });
        
    }

    

    save = (e) => {

        
        // 画像のアップロード
       if(this.state.files!=[]){
            e.preventDefault()
            this.state.files.forEach((file)=>{
               
                storage.ref().child(`${file.name}`).put(file).then(snap => {
                    console.log('Uploaded a blob or file!');
                });
            })
        }   
        let id =0;
        let post_id = String(id)
        const user = firebase.auth().currentUser
        console.log(user)
        const userdb = db.collection("users").doc(user.uid);
        userdb.get().then((userdb) => {
            if (userdb.exists) {
                console.log("Document data:", userdb.data());
                    // 画像があるかないか
                    if(this.state.files==null){
                        // データベースに保存
                        db.collection("posts").doc().set({
                            post_id : db.collection("posts").doc(),
                            name: userdb.data().name,
                            pic: userdb.data().pic,
                            email: userdb.data().email,
                            course: this.state.selectedCourses,
                            nickname: userdb.data().nickname,
                            body: this.state.body,
                            title: this.state.title,
                            favcount: 0,
                            favusers:{},
                            librarycount: 0,
                            timestamp: new Date(),
                            answered:this.state.answered,
                            postimageurl:[],
                            postimagenames:[],


                        })        
                        .then(() => {
                            console.log(`追加に成功しました `);
                            this.props.changepost()
                        })
                        .catch((error) => {
                            console.log(`追加に失敗しました (${error})`);
                        });
                    }else{
                        db.collection("posts").doc().set({
                            post_id : db.collection("posts").doc(),
                            name: userdb.data().name,
                            pic: userdb.data().pic,
                            email: userdb.data().email,
                            course: this.state.selectedCourses,
                            nickname: userdb.data().nickname,
                            body: this.state.body,
                            title: this.state.title,
                            favusers:{},
                            favcount: 0,
                            librarycount: 0,
                            timestamp: new Date(),
                            answered:this.state.answered,
                            postimageurl:[],
                            postimagenames:this.state.postimagenames,
                        })        
                        .then(() => {
                    
                            console.log(`追加に成功しました `);
                            this.props.changepost()
                        })
                        .catch((error) => {
                            console.log(`追加に失敗しました (${error})`);
                        });



                    }
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
        const {selectedCourses} = this.state;
        return (
            
         
                <div>
   
                    <div className="main">
                        <div className="App">
                            <p className="App-intro">

                            </p>


                        </div>
                        
                        {this.props.user&&
                            <div>
                                <Card className ="toukou">
                              <h3 className='center'>質問を投稿</h3>
                              
                              
                              
                                <form>
                                    
                                    <div className="posttitle">タイトルを入力:
                                        <input type='text' value={this.state.title} onChange={this.handleInputtitle.bind(this)} />
                                    </div>   
                                    <div class="input-field col s12">
                                    <div className="postbody">投稿内容を入力:
                                   
                                    </div>
                                    </div>
                               
                                    <div class="row">
                                        <div class="input-field">
                                        <textarea id="textarea1" class="materialize-textarea" type='textArea' value={this.state.body} onChange={this.handleInputbody.bind(this)} />
                                        </div>
                                    </div>
      
                                    <div className="postbody">質問ジャンルを入力(複数選択可能):
                                    <br/>
                                    <SelectField
                                        multiple={true}
                                        hintText="Select genre"
                                        value={selectedCourses}
                                        onChange={this.handleChange}
                                    >
                                        {this.menuItems(selectedCourses)}
                                    </SelectField>
                                    </div>
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file" onChange={this.handleFileSelect.bind(this)} multiple />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text"/>
                                        </div>
                                        {
                                            this.state.postimageurls.map((imageurl,i)=>{
                                                return (
                                                <div key={i}>
                                                    <img src={imageurl}></img>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                    

                                    {this.state.title == ''?
                                        (
                                            <div>タイトルを入力してください</div>
                                        ) : (
                                             this.state.body != ''?
                                                (
                                                    <button onClick={this.save}  ><Link to='/posts/index'>質問を投稿する</Link></button>

                                                ) : (
                                                    <div>投稿内容を入力してください</div>

                                                )
                                        )
                                    }


                                </form>
                                </Card>
                               
                            </div>
                        
                           
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
