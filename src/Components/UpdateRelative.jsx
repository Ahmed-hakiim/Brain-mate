import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import AuthContext from '../Auth/auth-context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/UpdateRelative.css';

export default function UpdateRelative() {
    const [relatives, setRelatives] = useState([]);
    const [newRelative, setNewRelative] = useState({
        Id: 0,
        Image: null,
        Name: '',
        RelationShip: ''
    });

    const { id } = useParams();
    const authCtx = useContext(AuthContext);
    let getRelative = useCallback((id) => {
        axios.get(`http://brainmate.runasp.net/api/V1/relatives/GetAll`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const relative = res.data.data.find(r => r.id === parseInt(id));
                console.log(relative)
                if (relative) {
                    setRelatives(relative);
                    setNewRelative(
                        {
                            Id: relative.id,
                            Image: null,
                            Name: relative.name,
                            RelationShip: relative.relationShip
                        }
                    )
                }
                console.log(newRelative)
            })
            .catch(err => console.log(err))
    }, [authCtx.token, id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Id', newRelative.Id);
        formData.append('Image', newRelative.Image);

        formData.append('Name', newRelative.Name);
        formData.append('RelationShip', newRelative.RelationShip);
        axios.put(`http://brainmate.runasp.net/api/V1/relatives/update`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data)

                alert("success")
                getRelative();
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getRelative(id)
    }, [getRelative])
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewRelative((prevPerson) => ({
            ...prevPerson,
            [name]: files ? files[0] : value
        }));
    };


    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className='theRelative'>
                <img src={`${process.env.PUBLIC_URL}/relatives.png`} alt="relatives" />
                <div>
                    <form action="" onSubmit={handleSubmit} key={newRelative.Id}>
                        <img src={!relatives.image ? `${process.env.PUBLIC_URL}/profile-2398783_1280.png` : relatives.image} alt="relative" />
                        <input
                            type="file"
                            name="Image"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        <input type="text" name='Name' value={newRelative.Name} onChange={handleInputChange} placeholder='Enter New Name' />
                        <input type="text" name='RelationShip' value={newRelative.RelationShip} onChange={handleInputChange} placeholder='Enter New Relationship' />
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
