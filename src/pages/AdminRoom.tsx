import {useParams} from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import {Button }from '../components/Button'
import {Questions }from '../components/Questions'
import {RoomCode} from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'


type RoomParams = {
    id: string
}

export function AdminRoom(){
    const {user} = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const {questions,title} = useRoom(roomId)
    
    async function handleDeleteQuestion(questionId: string){
        
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt='logo'/>
                    <div>
                        <RoomCode code= {roomId}/>
                        <Button isOutlined >Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    
                {questions.map(question =>{
                    return(
                        <Questions
                        key={question.id}
                        author={question.author}
                        content={question.content}>
                            <button
                            type='button'
                            onClick={()=> handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt='remover pergunta'/>
                            </button>
                        </Questions>
                    )
                })}
                </div>
            </main>
        </div>
    )
}