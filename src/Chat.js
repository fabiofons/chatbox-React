import React from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import user from './User';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      users: [
        // {id: "",name:""}
      ],
      messages: [],
      login: ""
    };

    this.message = this.message.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <div className="mainbox">
          <aside className="contacts">
            {this.state.users.map(u => {
              return(
                <div className="user" /*key={u.id}*/>
                  <span className="state"><i className="fa fa-circle" /></span>
                  <p className="name">{u.name}</p>
                  <i className="fa fa-ellipsis-v"></i>
                </div>
              )
            })}
          </aside>
          <div className="conversation">
            <div className="close-chat">
              <p>Close conversation</p>
            </div>
            <div className="chat" key="chat">
              {this.state.messages.map(m =>{
                  return (
                    <div className="message" key={m.id}>
                      <p className="username">
                        {m.user} <span>{m.date}</span>
                      </p>
                      <p className="text">{m.body}</p>
                    </div>  
                  )
                })
              }
              { this.state.login ? <p className='conected'>{this.state.login} connected</p> : null }
            </div>
            <div className="type-zone">
              <input className="send" id="send" value={this.state.inputValue} onKeyPress={this.onSubmit} onChange={this.message}/>
              <i className="far fa-smile"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getUsers();
    this.getMessages();
    const socket = socketIOClient('http://localhost:3002/');
    socket.emit('login', { user: user.name});
    socket.on('user-connected', (name) => {
      console.log(name.user)
      this.setState({
        login: name.user,
        users: this.state.users.concat({name: name.user})
      })
    })  
    // socket.on('user-disconnected', state => {
    //   $('#chat').append(`<p class='conected'>${state.user} disconnected</p>`);
    //   $(`#${state.user}`).remove();
    // });
    // $('#send').on('keydown', function(e){
    //   const keycode = (event.keyCode ? event.keyCode : event.which);
    //   if(keycode == '13'){
    //     const userLogin = $('#user').text();
    //     let userMessage = $('#send').val();
    //     socket.emit('new-message', {message: userMessage, user: '<%= user %>', date: new Date()});
    //     $('#send').val('');
    //   }
    // });
    // socket.on('new-message', msg => {
    //   $('#chat').append(`<div class='message'>
    //   <p class='title'>
    //     ${msg.user}<span>${msg.date}</span>
    //   </p>
    //   <p class='text'>${msg.message}</p>
    //   </div>`);
    // });
  }

  async getUsers() {
    try {
      const res = await fetch('http://localhost:3002/api/users');
      const data = await res.json();
      const users = this.state.users;
      const newUsers = await data.map(u => {
        const newUser = {
          id: u._id,
          name: u.user,
        };
        return newUser;
      });

      this.setState({
        users: [...users, ...newUsers]
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getMessages() {
    try {
      const res = await fetch('http://localhost:3002/api/messages');
      const data = await res.json();
      const messages = this.state.messages;
      const newMessages = await data.map(m => {
        const newMessage = {
          id: m._id,
          user: m.user,
          body: m.body,
          date: m.date
        };
        return newMessage;
      });
      this.setState({
        messages: [...messages, ...newMessages]
      });
    } catch (e) {
      console.log(e);
    }
  }

  dateNow() {
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let d = new Date();
    let month = months[d.getMonth()]; 
    let day = d.getDate();
    let hour = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let fecha = month.concat(" ",day," ",hour);
    return fecha;
  }

  message(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  onSubmit(e) {
    if(e.key === "Enter") {
      const message = {
        user: user.name, // este usuario debe venir del login
        body: this.state.inputValue,
        date: this.dateNow()
      }
      this.setState({
        messages: this.state.messages.concat(message),
        inputValue:""
      })
    }
  }
}

export default Chat;
