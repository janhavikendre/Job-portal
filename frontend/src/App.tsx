import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Headers from './components/Headers'
import Home from './components/Home'
import AdminSignup from './components/AdminSignup'
import AdminLogin from './components/AdminLogin'
import UserSignup from './components/UserSignup'
import UserLogin from './components/UserLogin'

function App() {

  return (
    <div>
    <BrowserRouter>
    <Headers />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-signup" element={<AdminSignup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/user-login" element={<UserLogin />} />
    </Routes>
  
    </BrowserRouter>
      
    </div>
  )
}

export default App
