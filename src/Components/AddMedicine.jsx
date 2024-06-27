import React, { useContext, useState } from 'react'
import '../Styles/AddMedicine.css'
import axios from 'axios';
import AuthContext from '../Auth/auth-context';
export default function AddMedicine() {
    const [medicine, setMedicine] = useState({ Name: '', Time: '', Date: '', Frequency: 0 });
    const authCtx = useContext(AuthContext);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setMedicine(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const formatTime = (time) => {
        // Ensure the time is in HH:mm:ss format
        let [hours, minutes] = time.split(':');
        return `${hours}:${minutes}:00`;
    };
    const addMedicine = async (e) => {
        e.preventDefault();
        if (!medicine.Name) {
            alert('Medicine Name is required');
            return;
        }
        console.log(medicine);
        console.log("Medicine state before request:", JSON.stringify(medicine));
        console.log("Token is :", authCtx.token)
        const payload = {
            Name: medicine.Name,
            Time: formatTime(medicine.Time),
            Date: medicine.Date,
            Frequency: medicine.Frequency
        }
        try {

            console.log("Sending request with data:", JSON.stringify(medicine));
            const response = await axios.post("http://brainmate.runasp.net/api/V1/medicine/create", payload, {

                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${authCtx.token}`
                }
            });
            console.log("Response data:", response.data);
            setMedicine(
                response.data
            );
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.log('Response Error:', error.response.data);
            } else if (error.request) {
                console.log('Request Error:', error.request);
            } else {
                console.log('Other Error:', error.message);
            }
        }
    }

    return (
        <div>
            <div className='medicineForm'>
                <img src={`${process.env.PUBLIC_URL}/medicineform.png`} alt="medicine" />
                <div className="card">
                    <h2>Add Your Medicines</h2>
                    <form className="form" onSubmit={addMedicine}>
                        <input type="text" placeholder="Medicine Name" name="Name" value={medicine.Name} onChange={handleInputChange} />
                        <input type="time" placeholder="Enter Time" name="Time" value={medicine.Time} onChange={handleInputChange} />
                        <input type="text" placeholder="Enter Date" name="Date" value={medicine.Date} onChange={handleInputChange} />
                        <input type="number" placeholder="Medicine Frequency" name="Frequency" value={medicine.Frequency} onChange={handleInputChange} />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
