import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import Modal from './Modal';
import Message from './Message';

const  App = () => { 

  const [userId, setUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setModal] = useState(false);
  const [userName, setUserName] = useState(userId);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');
    socketRef.current.on("your id", id => {
      setUserId(id);
    })

    socketRef.current.on("message", message => {
      _receivedMessage(message);
    });

    // socketRef.current.on("newUserName", (username) => {
    // });
  }, []);

  const _receivedMessage = message => {
    setMessages(oldMessages => [...oldMessages, message]);
  }

  const _sendMessage = e => {
    // e.preventDefault();
    const time = new Date();
    const messageObject = {
      body: message,
      id: userId,
      time: time
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  const _handleMessageChange = e => {
    setMessage(e.target.value);
  }

  const _handleUserNameChange = e => {
    setUserName(e.target.value);
    localStorage.setItem('userName',e.target.value);
    // socketRef.current.emit("change username", e.target.value);
  }

  const _keyPressed = event => {
    if (event.key === "Enter" && event.shiftKey) {
      message && _sendMessage();
    }
  }
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header__title">
          Docler Chat App
        </div>
        <div className="page__header__settings" onClick={()=>setModal(!show)}>
          Settings
        </div>
      </div>
      <div className="page__body">
        { messages.length ? messages.map((message, i) =>{
          if(message.id===userId){
            return(
              <div className="my-message" key={i}>
                <Message { ...message } userName={userName}/>
              </div>
            )
          }
          return(
            <div className="other-message" key={i}>
              <Message { ...message }/>
            </div>
          )
        }) : <div className="empty-text">Say Hello!</div>}
      </div>
      <div className="page__bottom">
        <input 
          value={ message }  
          onChange={ _handleMessageChange } 
          onKeyPress={ localStorage.getItem('enterKey') === "true" ? _keyPressed : null }
          placeholder="Enter a message"
        />
        <input type="button" className="page__bottom__send" onClick={ ()=> message && _sendMessage() } value="Send"/>
      </div>

      <Modal 
        show={show} 
        userId={userId}
        userName={userName}
        _handleClose={()=>setModal(false)}
        _handleUserNameChange={_handleUserNameChange}
        _resetUserName={()=>setUserName('')}
      />
  </div>
  )
}

export default App;