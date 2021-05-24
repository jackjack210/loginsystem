import React from 'react'
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

const App = () => {
  return (
    <>
    <Route path="/registration">
      <Registration/>
    </Route>
    <Route path="/login">
      <Login/>
    </Route>  
    </>
  )
}

export default App
