import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
