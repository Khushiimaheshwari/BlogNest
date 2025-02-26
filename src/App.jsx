import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/Auth'
import { login, logout } from './store/authSlice';
import './App.css'
import Header from './componenets/Header/Header';
import Footer from './componenets/Footer/Footer';
import { Outlet,  useLocation} from 'react-router-dom'
import Login from './componenets/Login';
import Signup from './componenets/Signup';
import Loader from './componenets/Loader';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userdata) => {
      if (userdata) {
        dispatch(login(userdata))
        
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error("Auth error:", error);
    })
    .finally(() => setLoading(false))

  }, []);

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  const [selectedTheme, setSelectedTheme] = useState('Cooking & Food');

  return !loading ? (
    <div 
      className={` w-full ${
        isLoginPage || isSignUpPage ? "h-185 bg-gradient-to-tl from-sky-300 to-sky-100" : "h-full bg-white"
      }`}
    >
      <div className="w-full text-center">
        {isLoginPage ? (
          <main>
            <Login />
          </main>
        ) : isSignUpPage ? (
          <main>
            <Signup />
          </main>
        ) : (
          <>
            <Header />
            <main>
              <Outlet context={{ selectedTheme, setSelectedTheme }}/>
            </main>
            <Footer />
          </>
        )}
      </div>
    </div>
  ) : <Loader/>
}

export default App