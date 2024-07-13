import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
    const [Values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [Errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState([]);
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(Values));
        const err = Validation(Values);
        if (err.email === '' && err.password === ''){
            axios.post('http://localhost:8081/login', Values)
            .then(res => {
                if(res.data.Errors) {
                    setBackendError(res.data.Errors);
                }
                else {
                    setBackendError([]);
                }
                if (res.data === 'Success'){
                    navigate('/home');
                }
                else{
                    alert(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            }
            )
        }
        
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action = "" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor = "Email"><strong>Email:</strong></label>
                    <input type = "email" id = "Email" onChange = {handleInput} name = "Email" required className='form-control rounded-0'/>
                    {Errors.email && <p className='text-danger'>{Errors.email}</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor = "password"><strong>Password:</strong></label>
                    <input type = "password" id = "password" onChange = {handleInput} name = "password" required className='form-control rounded-0'/>
                    {Errors.password && <p className='text-danger'>{Errors.password}</p>}
                </div>
                <button className='btn btn-success w-50' type = "submit"><strong>Login</strong></button>
                <Link to="/signup" className='btn btn-default border w-50 bg-light' type = "submit">Signup</Link>
            </form>
        </div> 
    </div>
  )
}

export default Login