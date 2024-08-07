import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './signup/Signup';
import Home from './home/Home';
import Inventory from './pages/inventory';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/inventory' element={<Inventory />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
