import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import s2 from '../Styles/UpdateMedicine.module.css'
import { useParams } from 'react-router-dom';
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
export default function UpdateTask() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        Id: 0,
        Task: '',
        Time: '',
        Place: ''
    })
    const { id } = useParams();
    const authCtx = useContext(AuthContext);
    const getTasks = useCallback((id) => {
        axios.get(`http://brainmate.runasp.net/api/V1/event/GetAll`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const task = res.data.data.find(r => r.id === parseInt(id));
                console.log(task)
                if (task) {
                    setTasks(task);
                    setNewTask(
                        {
                            Id: task.id,
                            Time: task.time,
                            Task: task.task,
                            Place: task.place
                        }
                    )
                }
                console.log(newTask)
            })
            .catch(err => console.log(err))
    }, [authCtx.token, id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Id', newTask.Id);
        formData.append('Task', newTask.Task);
        formData.append('Time', newTask.Time);

        formData.append('Place', newTask.Place);

        axios.put(`http://brainmate.runasp.net/api/V1/event/update`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data)

                alert("success")
                getTasks();
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getTasks(id)
    }, [getTasks])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className={s2.theMedicine}>
                <img src={`${process.env.PUBLIC_URL}/tasks.png`} alt="task" />
                <div>
                    <form action="" onSubmit={handleSubmit} key={newTask.Id}>
                        <h2>Update Your Task</h2>
                        <input type="text" name='Task' placeholder='Task Name' onChange={handleInputChange} value={newTask.Task} />
                        <input type="time" name='Time' placeholder='Enter New Time' onChange={handleInputChange} value={newTask.Time} />
                        <input type="text" name='Place' placeholder='Enter New Place' onChange={handleInputChange} value={newTask.Place} />

                        <button>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
