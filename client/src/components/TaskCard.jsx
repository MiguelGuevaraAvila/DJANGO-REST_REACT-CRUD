import { useNavigate } from "react-router-dom"

export function TaskCard({ task }){

    const navigate = useNavigate();

    return(
        <div className="card"
            onClick={()=>{
                navigate(`/tasks/${task.id}`)
            }}
        >
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <hr />
        </div>
    )
}