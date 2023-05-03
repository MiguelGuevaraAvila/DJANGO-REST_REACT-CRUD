import { useEffect } from 'react';
import { useForm } from  'react-hook-form';
import { createTask, deleteTask, updateTask, getTask} from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskFormPage(){
    const { 
        register, 
        handleSubmit, 
        formState:{errors},
        setValue 
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    //console.log(params);

    const onSubmit = handleSubmit(async(data) =>{
        if(params.id){
            console.log("actualizando: "+id);
        }
        else{
            console.log("creando");
            await createTask(data);
        }
        navigate("/tasks");
    });

    useEffect( () => {
        async function loadTask(){
            if(params.id)
            {
                console.log("obteniendo datos ");
                const res = await getTask(params.id);
                console.log(res);
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            }
        }
        loadTask();
    },[]);
    return(
        <div className="task">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder='title'
                    {...register("title",{required: true})}
                />
                {errors.title && <span className='error'>this field is required</span>}
                <textarea 
                    name="description" cols="30" rows="10"
                    placeholder='description'
                    {...register("description",{required: true})}
                ></textarea>
                {errors.description &&  <span className='error'>this field is required</span>}
                <button>Enviar</button>
            </form>

            {params.id && <button onClick={async () => {
                const accepted = window.confirm("Are you sure?");
                    if(accepted) {
                        await deleteTask(params.id);
                        navigate("/tasks");
                    }
            }}>delete</button>}

        </div>
    )
}