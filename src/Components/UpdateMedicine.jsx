import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import s1 from '../Styles/UpdateMedicine.module.css'
import { useParams } from 'react-router-dom';
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
export default function UpdateMedicine() {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({
        Id: 0,
        Name: '',
        Time: '',
        Frequency: '',
        Date: ''
    })
    const { id } = useParams();
    const authCtx = useContext(AuthContext);
    const getMedicines = useCallback((id) => {
        axios.get(`http://brainmate.runasp.net/api/V1/medicine/GetAll`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const medicine = res.data.data.find(r => r.id === parseInt(id));
                console.log(medicine)
                if (medicine) {
                    setMedicines(medicine);
                    setNewMedicine(
                        {
                            Id: medicine.id,
                            Name: medicine.name,
                            Time: medicine.time,
                            Date: medicine.date,
                            Frequency: medicine.frequency
                        }
                    )
                }
                console.log(newMedicine)
            })
            .catch(err => console.log(err))
    }, [authCtx.token, id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Id', newMedicine.Id);
        formData.append('Name', newMedicine.Name);
        formData.append('Time', newMedicine.Time);

        formData.append('Date', newMedicine.Date);
        formData.append('Frequency', newMedicine.Frequency);
        axios.put(`http://brainmate.runasp.net/api/V1/medicine/update`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data)

                alert("success")
                getMedicines();
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getMedicines(id)
    }, [getMedicines])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setNewMedicine(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className={s1.theMedicine}>
                <img src={`${process.env.PUBLIC_URL}/medicine.png`} alt="medicine" />
                <div>
                    <form action="" onSubmit={handleSubmit} key={newMedicine.Id}>
                        <h2>Update Your Medicine</h2>
                        <input type="text" name='Name' placeholder='Medicine Name' onChange={handleInputChange} value={newMedicine.Name} />
                        <input type="time" name='Time' placeholder='Enter New Time' onChange={handleInputChange} value={newMedicine.Time} />
                        <input type="text" name='Date' placeholder='Enter New Date' onChange={handleInputChange} value={newMedicine.Date} />
                        <input type="number" name='Frequency' placeholder='Enter New Frequency' onChange={handleInputChange} value={newMedicine.Frequency} />
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
