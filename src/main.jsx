import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './componenets/Login.jsx'
import AuthLayout from './componenets/AuthLayout.jsx';
import Home from './pages/HomeMain.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import ExplorePage from './pages/Explore.jsx'


const router = createBrowserRouter([
  {path: '/',
  element: <App/>,
  children: [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: (
        <AuthLayout authentication={false} >
          <Login />
        </AuthLayout>
      )
    },
    {
      path: '/signup',
      element: (
        <AuthLayout authentication={false} >
          <SignupPage />
        </AuthLayout>
      )
    },
    {
      path: '/all-posts',
      element: (
        <AuthLayout authentication >
          {" "}
          <AllPosts />
        </AuthLayout>
      )
    },
    {
      path: '/add-posts',
      element: (
        <AuthLayout authentication >
          {" "}
          <AddPost />
        </AuthLayout>
      )
    },
    {
      path: '/edit-post/:slug',
      element: (
        <AuthLayout authentication >
          {" "}
          <EditPost />
        </AuthLayout>
      )
    },
    {
      path: '/post/:Slug',
      element: <Post/>
    },
    {
      path: '/explore-posts',
      element: (
        <AuthLayout authentication >
          {" "}
          <ExplorePage />
        </AuthLayout>
      )
    }
  ]

}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
