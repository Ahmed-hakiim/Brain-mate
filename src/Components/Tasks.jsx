import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const authCtx = useContext(AuthContext);
    const Navigate = useNavigate()
    let getTasks = () => {
        axios.get("http://brainmate.runasp.net/api/V1/event/GetAll", {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setTasks(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    let deleteTask = (id) => {
        axios.delete(`http://brainmate.runasp.net/api/V1/event/delete/${id}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res);
                setTasks(prevTask => prevTask.filter(task => task.id !== id));
            })
            .catch((err) => console.log(err))
        getTasks()
    }
    useEffect(() => {
        getTasks()
    }, [])
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className='addmedicine'><button onClick={() => { Navigate('/addTask') }}>Add Task</button></div>
            <div className='medicines'>
                {tasks.map(p => {
                    return (

                        <div className='singleMedicine'>
                            <div className='inneritems' key={p.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-prescription2" viewBox="0 0 16 16">
                                    <path d="M7 6h2v2h2v2H9v2H7v-2H5V8h2z" />
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z" />
                                </svg>
                                <p>{p.task}</p>
                            </div>
                            <div className='inneritems'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm-fill" viewBox="0 0 16 16">
                                    <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
                                </svg>
                                <p>{p.place}</p>
                            </div>
                            <div className='inneritems' style={{ justifyContent: 'space-around' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16" style={{ alignSelf: 'flex-start' }}>
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                </svg>
                                <p className='time'>{p.time}</p>

                            </div>
                            <div className='UD'>
                                <p onClick={() => deleteTask(p.id)}>delete</p>
                                <p onClick={() => Navigate(`/tasks/${p.id}`)}>update</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
