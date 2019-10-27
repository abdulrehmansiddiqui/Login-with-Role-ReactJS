import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {BrowserRouter , Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className='ui container'>
        <Route path='/' component={Header} />
        <Route path='/Login' component={Login} />
        <Route path='/Logout' component={Logout} />
        <Route path='/Dashboard' component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
