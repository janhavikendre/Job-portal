import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AdminSignup from './components/AdminSignup'
import AdminLogin from './components/AdminLogin'
import UserSignup from './components/UserSignup'
import UserLogin from './components/UserLogin'
import AdminJob from './Job/AdminJob'
import AdminJobListings from './Job/AdminJobListings'

function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/admin-signup' element={<AdminSignup />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/user-signup' element={<UserSignup />} />
      <Route path='/user-login' element={<UserLogin />} />
      <Route path="/AdminJob" element={ <AdminJob /> } />
      <Route path="/AdminJobListings" element={ <AdminJobListings /> } />
      

      
    </Routes>
  
    </BrowserRouter>
      
    </div>
  )
}

export default App
