import React from "react";
import "./index.css";

class Post extends React.Component{
    constructor(props){
      super(props)
      this.state={
        loading: false,
        data: [],
      }
    }
    componentDidMount(){
      return fetch('http://localhost:3000/posts')
        .then((res) => {res.json()})
        .then((json)=>{
          this.setState({
            loading: true,
            data: json,
          })
        })
    }
    render(){
      if(this.state.loading){
        return(
          <div className="Post-header">
            <p>{ this.state.data }</p>
          </div>
        );
      }else{
        return(
          <div className="Post-header">
            <p>Loading...</p>
          </div>
        );
      }
    }
}
export default Post;