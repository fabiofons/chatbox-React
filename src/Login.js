import React from 'react';
import './App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {user: ''};
  }; 

  createUser(e){
    this.setState({
      user: e.target.value
    });
  };

  handleSubmit(){

  }

  render() {
    return(
      <div>
        <div className="login">
          <form action="/chat" className="chart" onSubmit={this.handleSubmit.bind(this)}>
            <h3>¿Cuál es tu nombre?</h3>
            <input type="text" className= "inputlogin" value={this.state.user} onChange={this.createUser.bind(this)}/>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  };

};



export default Login;