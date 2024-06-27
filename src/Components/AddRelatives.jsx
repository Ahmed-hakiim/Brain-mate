import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from '../Auth/auth-context';

export default function AddRelatives() {
    const [person, setPerson] = useState({
        Image: null,
        Name: '',
        RelationShip: ''
    });
    const authCtx = useContext(AuthContext);
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Image', person.Image);
        formData.append('Name', person.Name);
        formData.append('RelationShip', person.RelationShip);
        console.log('Person:', person);
        axios.post("http://brainmate.runasp.net/api/V1/relatives/create", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res)
                setPerson(res.data)
            })
            .catch(err => console.log(err))
    };
    return (
        <div>
            <div className='medicineForm'>
                <img src={`${process.env.PUBLIC_URL}/relatives.png`} alt="relatives" />
                <div className="card">
                    <h2>Add A Relative</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Relative Name" name="Name" value={person.Name} onChange={handleInputChange} />
                        <input type="text" placeholder="Relationship" name="RelationShip" value={person.RelationShip} onChange={handleInputChange} />
                        <input
                            type="file"
                            name="Image"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
