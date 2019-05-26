import React from "react";
import "./post.css";

class Post extends React.Component{
    constructor(props){
      super(props)
      this.state={
        loading: false,
        data: [],
      }
    }
    componentDidMount(){
      fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then((json)=>{
          this.setState({
            loading: false,
            data: json,
          })
        })
    }
    render(){
      
      return(
        <div className="Posts">
          <div>
          {
            this.state.data.map(post => {
              return (
                <div key={post.id}>{ post.id }</div>
              )
            })
          }
          </div>
        </div>
      );
    }
}
export default Post;