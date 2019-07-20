import React from 'react';
import './App.css';
import user from './User'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {user: ''};
  }; 

  render() {
    return(
      <div>
        <div className="login">
          <form className="chart" onSubmit={this.handleSubmit.bind(this)}>
            <h3>¿Cuál es tu nombre?</h3>
            <input type="text" className= "inputlogin" value={this.state.user} onChange={this.createUser.bind(this)}/>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  };

  createUser(e){
    this.setState({
      user: e.target.value
    });
  };

  handleSubmit(){
    user.name = this.state.user;
    this.props.history.push('/chat');
  }

};

export default Login;