import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import Login from './pages/login'
import Register from './pages/register'
import DashBoard from './pages/dashboard'
import Log from './pages/log'

import './styles/common.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/logs" element={<Log/>}/>
      </Routes>
    </BrowserRouter>,
  rootElement);