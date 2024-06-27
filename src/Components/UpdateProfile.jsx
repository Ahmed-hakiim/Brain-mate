import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../Styles/UpdateProfile.css'
import { useParams } from 'react-router-dom';
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
export default function UpdateProfile() {
    const [profile, setProfile] = useState([]);
    const [newProfile, setNewProfile] = useState({
        Id: 0,
        Name: '',
        PhoneNumber: '',
        Address: '',
        Image: null
    })
    const { id } = useParams();
    const authCtx = useContext(AuthContext);
    const getProfile = useCallback((id) => {
        axios.get(`http://brainmate.runasp.net/api/v1/patient/profile`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                const profile = res.data.data.find(r => r.id === parseInt(id));
                console.log(profile)
                if (profile) {
                    setProfile(profile);
                    setNewProfile(
                        {
                            Id: profile.id,
                            Image: null,
                            Name: profile.name,
                            Address: profile.address,
                            PhoneNumber: profile.phoneNumber
                        }
                    )
                }
                console.log(newProfile)
            })
            .catch(err => console.log(err))
    }, [authCtx.token, id]);
    useEffect(() => {
        getProfile(id)
    }, [getProfile])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Id', newProfile.Id);
        formData.append('Image', newProfile.Image);

        formData.append('Name', newProfile.Name);
        formData.append('Address', newProfile.Address);
        formData.append('PhoneNumber', newProfile.PhoneNumber);
        axios.put(`http://brainmate.runasp.net/api/v1/user/update`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data)

                alert("success")
                getProfile();
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewProfile((prevPerson) => ({
            ...prevPerson,
            [name]: files ? files[0] : value
        }));
    };
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div>
                <form action="" className='UpForm' onSubmit={handleSubmit}>
                    <div className='profilePic'>
                        <img src={!profile.image ? `${process.env.PUBLIC_URL}/profile-2398783_1280.png` : profile.image} alt="dsds   " />
                        <input
                            type="file"
                            name="Image"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='inputDataUpdate'>
                        <h2>Udpate your Information</h2>
                        <hr />
                        <input type="text" placeholder='Enter Name' name='Name' value={newProfile.Name} onChange={handleInputChange} />
                        <input type="text" placeholder='Enter Phone Number' name='PhoneNumber' value={newProfile.PhoneNumber} onChange={handleInputChange} />
                        <input type="text" placeholder='Enter Address' name='Address' value={newProfile.Address} onChange={handleInputChange} />
                        <button className='UpdProfile'>Update</button>
                    </div>
                </form>
            </div >
        </div >
    )
}
