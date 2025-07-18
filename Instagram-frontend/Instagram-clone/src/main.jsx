import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ViewStory from './ViewStory.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Profile from './Profile.jsx';
import CreatePost from './CreatePost.jsx';

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'/story/:id/:tot',
      element:<ViewStory/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/create',
      element:<CreatePost />
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
