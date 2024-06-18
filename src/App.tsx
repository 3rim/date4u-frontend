import { Routes, Route } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import Search from './pages/Search'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className=' '>
        <div className='custom-bg-primary'>
          <h1 className='text-center text-white'>Dating U(nicorns)</h1>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
