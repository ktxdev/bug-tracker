import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider, RequireAuth } from './auth/auth';
import Layout from './components/layout';
import './index.css';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import AlertProvider from './utils/AlertContext';

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<RequireAuth><Layout /></RequireAuth>} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
