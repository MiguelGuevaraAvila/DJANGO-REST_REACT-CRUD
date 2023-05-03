import { useEffect } from 'react';
import { useForm } from  'react-hook-form';
import { createTask, deleteTask, updateTask, getTask} from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import {toast}  from 'react-hot-toast'

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
            await updateTask(params.id, data);
            toast.success('Task updated',{
                position:"bottom-right",
                style:{
                    background:"#fde290",
                    color:"#000",
                }
            });
        }
        else{
            await createTask(data);
            toast.success('Task created successfully',{
                position:"bottom-right",
                style:{
                    background:"#003900",
                    color:"#FFFFFF",
                }
            });
        }
        navigate("/tasks");
    });

    useEffect( () => {
        async function loadTask(){
            if(params.id)
            {
                console.log("obteniendo datos ");
                const {data:{title,description},}= await getTask(params.id);
                setValue('title', title);
                setValue('description', description);
            }
        }
        loadTask();
    },[]);
    return(
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder='title'
                    {...register("title",{required: true})}
                    className='bg-zinc-700 p3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span className='error'>this field is required</span>}
                <textarea 
                    name="description" cols="30" rows="10"
                    placeholder='description'
                    {...register("description",{required: true})}
                    className='bg-zinc-700 p3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description &&  <span className='error'>this field is required</span>}
                <button
                className='bg-teal-700 p-3 rounded-lg block w-full mt-3'
                >Guardar </button>
            </form>

            {params.id && 
            <div className='flex justify-end'>
                <button 
                className='bg-red-500 p-3 rounded-lg block w-48 mt-3'                
                onClick={async () => {
                    const accepted = window.confirm("Are you sure?");
                        if(accepted) {
                            await deleteTask(params.id);
                            toast.success('Removed task',{
                                position:"bottom-right",
                                style:{
                                    background:"#880000",
                                    color:"#FFFFFF",
                                }
                            });
                            navigate("/tasks");
                        }
                }}>delete</button>
            </div>
            }
        </div>
    )
}