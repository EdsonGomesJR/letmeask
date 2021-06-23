import {Link, useHistory} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom(){

  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');


  async function handleCreateRoom(event : FormEvent){
    event.preventDefault();
   if(newRoom.trim() === '') {
     return;
   }
   
   const roomRef = database.ref('rooms');
   const firebaseRoom = await roomRef.push({
     title: newRoom,
     authorId: user?.id,
   }) 

   history.push(`/rooms/${firebaseRoom.key}`)

  }

  const {user} = useAuth();
  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustrator-purple-img" />
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let me ask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
            type="text"
            placeholder="Nome da Sala"
            onChange={event => setNewRoom(event.target.value)} 
            value={newRoom}/>
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
        
      </main>
    </div>
  )
}