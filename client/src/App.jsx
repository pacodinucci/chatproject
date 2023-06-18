import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import send from './assets/send.svg';

const socket = io('/')

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage);
    };
  }, [])

  const receiveMessage = message => setMessages(state => [...state, message])
  
  return (
    <div className='h-screen bg-zinc-800 text-white flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold my-2'>Proyecto</h1>
      <form className='bg-zinc-900 flex flex-col justify-between h-2/3 w-1/2' onSubmit={handleSubmit}>
          <ul className='p-2'>
            {messages.map((message, i) => (
              <li className={
                `my-2 p-2 table rounded-md ${message.from === 'Me' ? 
                'bg-sky-700 ml-auto' : 'bg-black'}`
              } key={i}>
                <span className='text-xs text-slate-400 block font-bold'>{message.from}</span>
                <span className='text-md'>{message.body}</span>
                </li>
            ))}
          </ul>
          <div className='flex'>
            <input className='border-2 border-zinc-500 p-2 w-full text-black' type="text" placeholder='Write your message...'
              onChange={(e) => setMessage(e.target.value)}
              />
            <button className='border-2 rounded-md p-2 h-full'><img className='max-h-9' src={send} alt="" /></button>
          </div>
      </form>
          
        </div>
      )
    }

    export default App
        
        