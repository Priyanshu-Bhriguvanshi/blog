import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { RouterProvider ,createBrowserRouter} from 'react-router-dom'
import {Login ,Signup, PostForm,AuthLayout } from "./components"
import {AllPost , Home, Post} from "./Pages"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },{
      path:"/all-post",
      element:<AuthLayout>

        <AllPost/>
      </AuthLayout>
      
    },
    {
      path:"/edit-post/:slug",
      element:<AuthLayout>
        <PostForm/>
      </AuthLayout>
    },
    {
      path:"/edit-post/",
      element:<AuthLayout>
        <PostForm/>
      </AuthLayout>
    },
    {
      path:"/post/:slug",
      element:<AuthLayout>
        <Post/>
      </AuthLayout>
    }
  
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)