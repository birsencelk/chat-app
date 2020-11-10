# Chat App via React and Socket.io


### About
It's a small chat app between users through web browser. Application developed with socket.io and react.

### How it works

Users interacts each of them through sending text message and images at http://localhost:3000/. Chat App also allows to manage settings which is navigated through the Settings button. Settings are listed as respectively as below 

* change clock display format
* change username 
* sending message through shortcuts (Shift + Enter)
* reset all changes


### Install

First thing, install `npm` dependencies by running:

    npm install


### Run

For server you have go to main root --docler-case-study--

    node server.js


To start frontend application in development mode, you have go to client root:
    
    cd client
    npm start


### CheckList
- [x] Chat message box to list messages;
- [x] Input field where I can type and send messages;
- [x] Users can send pictures via URL. When sent, this URL is rendered on the message box as an image;
- [x] Next to the input field it is expected a button to send the message;
- [x] All the settings should be consumed and saved on the LocalStorage;
- [ ] Change username input field;
- [x] Change clock display radio inputs;
- [x] Send messages with Ctrl/Cmd + ENTER toggle;
- [x] Have a text/link to reset all the settings back to its defaults.
