import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider, RequireAuth } from './auth/auth';
import Layout from './components/Layout';
import './index.css';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Tickets from './pages/Tickets';
import Users from './pages/Users';
import AlertProvider from './utils/AlertContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />} >
            <Route path='/' element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<Dashboard />} />
              <Route path='/tickets' element={<Tickets />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/users' element={<Users />} />
              <Route path='/account' element={<Account />} />
            </Route>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>
);
