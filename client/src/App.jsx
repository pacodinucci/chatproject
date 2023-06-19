import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import send from './assets/send.svg';

const socket = io('/')

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
    setMessage('');
    inputRef.current.focus();
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
      <form className='bg-zinc-900 flex flex-col justify-between h-2/3 w-2/3 overflow-hidden' onSubmit={handleSubmit}>
          <ul className='p-2 flex flex-col justify-start items-start flex-grow-1 overflow-y-auto'>
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
              onChange={(e) => setMessage(e.target.value)} value={message}
              />
            <button className='border-2 rounded-md p-2 h-full'><img className='max-h-9' src={send} alt="" /></button>
          </div>
      </form>
          
        </div>
      )
    }

    export default App
        
        