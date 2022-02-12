import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import DashBoard from './pages/dashboard'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    </BrowserRouter>
  )}

export default App;
