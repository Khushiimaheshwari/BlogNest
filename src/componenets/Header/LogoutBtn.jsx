import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/Auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseNotification = () => {
        setNotification({ message: "", type: "", onClose: handleCloseNotification });
    };
    const [notification, setNotification] = useState({message: "", type: "", onClose: handleCloseNotification})

    const handleLogout = async () => {
        try{

            // setNotification({ message: "Logging out...", type: "info", onClose: handleCloseNotification });
            setNotification({ message: "", type: "", onClose: handleCloseNotification });

            await authService.logout().then(() => {
                
                setTimeout(() => {
                    setNotification({message: "Logout Successful!", type:"success", onClose: handleCloseNotification})

                    console.log("Logged Out");
                    setTimeout( () => {
                        dispatch(logout())
                        navigate("/", { replace: true });
                        window.location.reload() 
                    }, 2000);
                }, 1000);
            })
        }
        catch (error) {
            console.error("Logout Error:", error);
            setNotification({message: "Logout Failed!", type:"error", onClose: handleCloseNotification})
        }
    };

    return (
        <>
            {notification.message && <Notification message={notification.message} type={notification.type} onClose={notification.onClose} />}

            <button 
                className='inline-block font-medium px-6 py-2 bg-blue-100 hover:shadow-white rounded-full hover:scale-110 transition-all duration-200'
                onClick={handleLogout} >
                Logout
            </button>
        </>
    )
}

export default LogoutBtn
