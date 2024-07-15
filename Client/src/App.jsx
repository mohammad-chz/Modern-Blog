import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterCom from './components/FooterCom'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRouter from './components/OnlyAdminPrivateRouter'
import CreatePost from './pages/CreatePost'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/projects' element={<Projects />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRouter />}>
          <Route path='/create/post' element={<CreatePost />} />
        </Route>
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}

export default App