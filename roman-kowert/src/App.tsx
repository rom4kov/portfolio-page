import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    console.log(response.data.users)
    setArray(response.data.users)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
