import {ReactNode} from 'react'
import '../styles/questions.scss'

type QuestonsProps = {
    content: string
    author: {
        name:string
        avatar:string
    },
    children?:ReactNode
}
export function Questions({author,content, children}:QuestonsProps){
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}