import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../Styles/Relatives.css'
import AuthContext from '../Auth/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Relatives() {
    const [relatives, setRelatives] = useState([]);
    const authCtx = useContext(AuthContext);
    const Navigate = useNavigate();
    const addRelative = () => {
        Navigate('/addRelative')
    }
    let getRelatives = () => {
        axios.get("http://brainmate.runasp.net/api/V1/relatives/GetAll", {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setRelatives(res.data.data)
            })
            .catch(err => console.log(err))
    }
    let deleteRelative = (id) => {
        axios.delete(`http://brainmate.runasp.net/api/V1/relatives/delete/${id}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authCtx.token}`
            }
        })
            .then((res) => {
                console.log(res);
                setRelatives(prevRelatives => prevRelatives.filter(relative => relative.id !== id));
            })
            .catch((err) => console.log(err))
        getRelatives()
    }
    useEffect(() => {
        getRelatives()
    }, [])
    return (
        <div>
            <div className='naving'>
                <Navbar />
            </div>
            <div className='addmedicine'><button onClick={() => { Navigate('/addRelative') }}>Add Relative</button></div>
            <div className='relatives-container'>
                {relatives.map(p => {
                    return (

                        <div className='relativeCard' key={p.id}>
                            <div className='relativeImage'><img src={p.image} alt="" /></div>
                            <div className='relativeName'>{p.name}</div>
                            <div className='relativeRelationShip'>
                                <div>{p.relationShip}</div>
                                <div className='relDetails' onClick={() => deleteRelative(p.id)}>delete</div>
                                <div className='relDetails' onClick={() => Navigate(`/relatives/${p.id}`)}>Update</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
