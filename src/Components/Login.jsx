import React, { useContext, useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Auth/auth-context'
export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const authCtx = useContext(AuthContext)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }
    const navigate = useNavigate();
    let changePath = () => {
        navigate('/home');
    }
    let getUser = (e) => {
        e.preventDefault();
        console.log(user); // Log the user object
        axios.post("http://brainmate.runasp.net/Api/V1/Authentication/SignIn", user,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                const token = res.data.data.token;
                console.log(token)

                authCtx.login(token);
                changePath();
            })
            .catch((err) => {
                if (err.response) {
                    console.log('Error response:', err.response.data);
                } else {
                    console.log('Error:', err.message);
                }
            });
    }
    return (
        <div>
            <div className="background"></div>
            <div className="card">
                <h2>Welcome Back</h2>
                <form className="form" onSubmit={getUser}>
                    <input type="email" placeholder="Username" name="email" value={user.email} onChange={handleInputChange} />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleInputChange} />
                    <button>Sign In</button>
                </form>
                <footer>
                    Need an account? Sign up
                    <a href="register">here</a>
                </footer>
            </div>
        </div>
    );
}
