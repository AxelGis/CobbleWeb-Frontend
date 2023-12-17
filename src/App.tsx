import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AuthorizedRoute from './components/AuthorizedRoute'
import Home from './pages/Home'
import './App.css'

function App () {
  return (
    <Router>
      <Header />
      <main className="flex justify-center items-center mt-2">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<AuthorizedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
