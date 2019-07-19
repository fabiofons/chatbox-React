import React from 'react';
import './App.css';


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      users: ['Germán', 'Mauricio', 'Eduardo' ],
      messages: [{ 
        user:"Germán",
        body:"Esto es una prueba",
        date: "Jul 18 17:42" 
      },
      {
        user: "Mauricio", 
        body: "Mensaje prueba 2", 
        date: "Jul 18 17:43"
      },
      {
        user: "Eduardo", 
        body: "Mensaje prueba 3", 
        date: "Jul 18 17:53"
      }]
    };

    this.message = this.message.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
        user: "Daniel", // este usuario debe venir del login
        body: this.state.inputValue,
        date: this.dateNow()
      }
      this.setState({
        messages: this.state.messages.concat(message),
        inputValue:""
      })
    }
  }

  render() {
    return (
      <div>
        <div className="mainbox">
          <aside className="contacts">
            {this.state.users.map(u => {
              return(
                <div className="user" id={u}>
                  <span className="state"><i className="fa fa-circle" /></span>
                  <p className="name">{u}</p>
                  <i className="fa fa-ellipsis-v"></i>
                </div>
              )
            })}
          </aside>
          <div className="conversation">
            <div className="close-chat">
              <p>Close conversation</p>
            </div>
            <div className="chat" id="chat">
              {this.state.messages.map(m =>{
                  return (
                    <div className="message">
                      <p className="username">
                        {m.user} <span>{m.date}</span>
                      </p>
                      <p className="text">{m.body}</p>
                    </div>  
                  )
                })
              }
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
}
export default Chat;
