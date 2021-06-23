import { FormEvent } from 'react'
import {useHistory} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

export function Home(){

    const history = useHistory()
    const {user, signInWithGoogle} = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === '') return
    
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) return alert('sala não existe')

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt='ulustração simbolizando perguntas e respostas'/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>               
            </aside>
            <main className='main-content'>
                <img src={logoImg} alt='letmeask'/>
                <button className='create-room' onClick={handleCreateRoom}>
                    <img src={googleIconImg} alt='logo do google'/>
                    Crie sua sala com o Google
                </button>
                <div className='separator'>ou entre em uma sala</div>
                <form onSubmit={handleJoinRoom}>
                    <input 
                    type='text'
                    placeholder='digite o código da sala'
                    onChange={e => setRoomCode(e.target.value)}
                    value={roomCode}
                    />
                    <Button type='submit'>
                        Entrar na sala
                    </Button>
                </form>
            </main>
        </div>
    )
}