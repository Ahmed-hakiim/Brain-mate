import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState([{ name: '', email: '', password: '', confirmPassword: '' }]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(pre => ({
            ...pre,
            [name]: value
        }));
    }
    const navigate = useNavigate()
    let changePath = () => {
        navigate('/login')
    }
    let addUser = (e) => {
        e.preventDefault();
        console.log(user)
        axios.post("http://brainmate.runasp.net/api/v1/User/SignUp", user,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                changePath();
            })
            .catch((err) => {

                console.log(err.response.data)
            })
    }
    return (
        <div>
            <div className="background"></div>
            <div className="card">

                <h2>Join Us Now</h2>
                <form className="form" onSubmit={addUser}>
                    <input type="text" placeholder="Enter your Name" name='name' value={user.name} onChange={handleInputChange} />
                    <input type="email" placeholder="Enter your E-mail" name='email' value={user.email} onChange={handleInputChange} />
                    <input type="password" placeholder="Enter Password" name='password' value={user.password} onChange={handleInputChange} />
                    <input type="password" placeholder="Confirm Password" name='confirmPassword' value={user.confirmPassword} onChange={handleInputChange} />
                    <button>Sign In</button>
                </form>

            </div>
        </div>
    )
}
