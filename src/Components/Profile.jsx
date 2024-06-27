import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import AuthContext from '../Auth/auth-context';
import axios from 'axios';
import s5 from '../Styles/Profile.module.css'
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const [profile, setProfile] = useState([]);
    const authCtx = useContext(AuthContext);
    const Navigate = useNavigate()
    const getProfile = () => {
        axios.get("http://brainmate.runasp.net/api/v1/patient/profile", {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setProfile(res.data.data)
            })
            .catch(err => console.log(err))
    };
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className={s5.Profilecontainer}>
                <div className={s5.firstProfile}>
                    <img src={profile.image} alt="dsds" />
                    <h2>{profile.name}</h2>
                </div>
                <div className={s5.secondProfile}>
                    <h2>About</h2>
                    <hr />
                    <div className={s5.Profiledata}>
                        <div className={s5.ProfileinData}>
                            <h4>Full Name</h4>
                            <h5>{profile.name}</h5>
                        </div>
                        <hr />
                        <div className={s5.ProfileinData}>
                            <h4>Email</h4>
                            <h5>{profile.email}</h5>
                        </div>
                        <hr />
                        <div className={s5.ProfileinData}>
                            <h4>Phone</h4>
                            <h5>{profile.phoneNumber}</h5>
                        </div>
                        <hr />
                        <div className={s5.ProfileinData}>
                            <h4>Address</h4>
                            <h5>{profile.address}</h5>
                        </div>
                    </div>
                    <hr />
                    <button onClick={() => Navigate(`/profile/${profile.id}`)}>Update Data</button>
                </div>
            </div>
        </div>
    )
}
