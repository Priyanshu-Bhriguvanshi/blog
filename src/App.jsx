import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authservice from '../src/appwrite/auth.js'
import { login, logout } from "./store/authslice.js"
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    authservice.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })

  }, [dispatch])

  return (loading) ? (<>Loading..</>) : (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">

        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
