import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider, RequireAuth } from './auth/auth';
import Layout from './components/layout';
import './index.css';
import Account from './pages/account';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Tickets from './pages/tickets';
import Users from './pages/users';
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
