import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import send from './assets/send.svg';

const socket = io('/')

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.trim() === '') return;
    const newMessage = {
      body: message,
      from: 'Yo'
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

  useEffect(() => {
    // Scroll al fondo del contenedor de mensajes
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const receiveMessage = message => setMessages(state => [...state, message]);
  
  return (
    <div className='h-screen bg-blue-950 text-white flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold my-2'>CHAT PROJECT</h1>
      <h2 className='text-xl font-bold my-2'>Proyecto de chat con NodeJS, Express, socket.io, React y Tailwind</h2>
      <form className='bg-green-50 flex flex-col justify-between h-2/3 w-2/3 overflow-hidden' onSubmit={handleSubmit}>
          <ul className='p-2 flex flex-col justify-end items-start flex-grow-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100' ref={messagesRef}>
            {messages.map((message, i) => (
              <li className={
                `my-2 p-2 table rounded-md ${message.from === 'Yo' ? 
                'bg-sky-700 ml-auto' : 'bg-black'}`
              } key={i}>
                <span className='text-xs text-slate-400 block font-bold'>{message.from}</span>
                <span className='text-md'>{message.body}</span>
                </li>
            ))}
          </ul>
          <div className='flex'>
            <input className='border-2 border-zinc-500 p-2 w-full text-black' type="text" placeholder='Escriba un mensaje...'
              onChange={(e) => setMessage(e.target.value)} value={message}
              />
            <button className='border-2 rounded-md p-2 h-full'><img className='max-h-9' src={send} alt="" /></button>
          </div>
      </form>
      <h2 className='text-s font-bold my-2'>Desarrollado por Francisco Di Nucci</h2>
          
        </div>
      )
    }

    export default App
        
        