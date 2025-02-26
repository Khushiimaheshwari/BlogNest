import React from 'react'
import Container from '../Container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/Auth'

function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    return (
        <header id='navbar' className='flex w-full py-5 px-4 bg-blue-800'>
            <Container>
                <nav className='flex w-full'>
                    <div className='ml-4'>
                        <Link to="/" className="text-white">
                            <img src="Images/Logo.png" width={"42rem"} alt="" />
                        </Link>
                    </div>
                    <ul className='flex ml-auto pr-5'>
                    {!authStatus && (
                        <li>
                            <button
                            onClick={() => navigate("/login")}
                            className='inline-bock px-6 py-2 font-medium text-black bg-blue-100 hover:shadow-white rounded-full hover:scale-110 transition-all duration-200'
                            >Login</button>
                        </li>
                    )}
                    {authStatus && (
                        <li>
                        <LogoutBtn />
                        </li>
                    )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
