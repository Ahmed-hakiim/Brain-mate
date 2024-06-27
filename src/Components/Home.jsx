import React, { useContext } from 'react'
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import AuthContext from '../Auth/auth-context';
export default function Home() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const isloggedIn = authCtx.isLoggedIn;
    const handleLogout = () => {
        authCtx.logout();
        navigate('/login')
    }
    const goToMedicine = () => {
        navigate('/medicine')
    }
    const goToTasks = () => {
        navigate('/tasks')
    }
    const goToRelatives = () => {
        navigate('/relatives')
    }
    return (
        <div className='navContainer'>
            <Navbar />
            {!isloggedIn && (
                <div> You'r not logged in</div>
            )}
            {isloggedIn && (
                <div className='logContainer'>
                    <div className='services'>
                        <div className='section' onClick={goToMedicine}>
                            <img src={`${process.env.PUBLIC_URL}/medicine.png`} alt="medicine" className='icons' />

                            <h2>Medicine</h2>
                        </div>
                        <div className='section' onClick={goToTasks}>
                            <img src={`${process.env.PUBLIC_URL}/tasks.png`} alt="tasks" className='icons' />
                            <h2>Tasks</h2>
                        </div>
                        <div className='section' onClick={goToRelatives}>
                            <img src={`${process.env.PUBLIC_URL}/relatives.png`} alt="relatives" className='icons' />                    <h2>Relatives</h2>
                        </div>
                    </div>
                    <button className='logoutButton' onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    )
}
