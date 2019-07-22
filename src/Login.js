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

  async handleSubmit(e){
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3002/api/users', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "user": this.state.user
        })
      })
      const data = await res.json();
      user.id = data._id;
      user.name = data.user;
    } catch(err) {
      console.log(err)
    }

    this.props.history.push('/chat'); 
  }
};

export default Login;