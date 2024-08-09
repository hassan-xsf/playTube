
import { Outlet } from 'react-router'
import { SideBar, Navbar } from './components/index'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/userSlice'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ; (async () => {
      try {
        const response = await axios.get("/api/v1/users/currentuser")
        if (response && response.data) {
          dispatch(login(response.data.data))
        }
        else {
          dispatch(logout())
        }
      }
      catch (e) {
        console.log("Error: " + e?.response?.data?.message || "Something went wrong")
        dispatch(logout())
      }
      finally {
        setLoading(false)
      }
    })()
  }, [])
  return (
    <>
      {
        loading ||
        <>
          <Navbar />
          <SideBar />
          <Outlet />
        </>
      }
    </>
  )
}

export default App
