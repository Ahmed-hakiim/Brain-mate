import React, { useContext, useState } from 'react'
import AuthContext from '../Auth/auth-context'
import axios from 'axios';

export default function AddTask() {
    const [task, setTask] = useState({ Place: '', Task: '', Time: '' })
    const authCtx = useContext(AuthContext)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setTask(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const formatTime = (time) => {
        // Ensure the time is in HH:mm:ss format
        let [hours, minutes] = time.split(':');
        return `${hours}:${minutes}:00`;
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task:', task);
        const payload = {
            Task: task.Task,
            Time: formatTime(task.Time), // Format time before sending
            Place: task.Place
        };
        console.log(authCtx.token)
        axios.post("http://brainmate.runasp.net/api/V1/event/create", payload, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res)
                setTask(res.data)
            })
            .catch(err => console.log(err))
    };
    return (
        <div>
            <div className='medicineForm'>
                <img src={`${process.env.PUBLIC_URL}/tasks.png`} alt="medicine" style={{ height: '90vh', width: '90vh' }} />
                <div className="card">
                    <h2>Add A Task</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="Place"
                            placeholder="Place"
                            value={task.Place}
                            onChange={handleInputChange}
                        />
                        <input type="text" placeholder="Task Name" name="Task" value={task.Task} onChange={handleInputChange} />
                        <input type="time" placeholder="Time" name="Time" value={task.Time} onChange={handleInputChange} />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
