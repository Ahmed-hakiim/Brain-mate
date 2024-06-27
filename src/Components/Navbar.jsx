import React, { useContext } from 'react'
import '../Styles/Navbar.css'
import AuthContext from '../Auth/auth-context';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const isloggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate();
    const goToProfile = () => {
        navigate('/profile')
    }
    return (
        <>
            {isloggedIn && (

                <div className='navbar'>
                    <h2 onClick={() => { navigate('/home') }}>Brain mate</h2>
                    <svg onClick={goToProfile} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '40px', height: '40px', marginTop: '2vh', backgroundColor: 'white', borderRadius: '50px', padding: '5px', cursor: 'pointer' }}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                </div>
            )}
        </>
    )
}
