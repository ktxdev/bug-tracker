import React from 'react';
import { Outlet } from 'react-router-dom';
import Feedback from './components/Feedback';
import { useAlert } from './utils/AlertContext';

const App = () => {
  const {feedback, handleCloseFeedback} = useAlert();

  return (
    <>
      <Feedback {...feedback} handleClose={handleCloseFeedback} />
      <Outlet />
    </>
  );
}

export default App;
