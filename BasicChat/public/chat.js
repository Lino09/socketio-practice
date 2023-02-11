
    const socket = io('http://localhost:9000');
    const adminSocket = io('http://localhost:9000/admin');

    const clientId = prompt('Whats your username?')
    const form = document.querySelector('#form');
    const msgToServer = document.querySelector('#msg-to-server');
    const chat = document.querySelector('#chat');

    const makeChild = (text, user) => {
      const msg = document.createElement('li')
      msg.classList = "odd:bg-indigo-100 even:bg-green-100 px-4 py-2";
      msg.innerText = `${user}: ${text}`
      return msg
    }

    form.onsubmit = (e) => {
      e.preventDefault()
      const message = msgToServer.value;
      if(!message) return
      socket.emit('chatMsgFromClient', {data: message, client: clientId})
      msgToServer.value = ''
    };

    socket.on('setMessage', messageFromServer =>{
      chat.appendChild(makeChild(messageFromServer.data, messageFromServer.user))
      if(chat.children.length === 1) chat.classList.add('border')
      msgToServer.focus()
    })

    adminSocket.on('adminMsg', ({data}) =>{
      console.log(data)
    })

    socket.on('baseMsg', ({data}) =>{
        console.log(data)
    })