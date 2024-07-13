import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [Values, setValues] = useState({
        email: '',
        password: '',
        name: ''
    })
    const navigate = useNavigate();
    const [Errors, setErrors] = useState({})
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.defaultPrevented();
        setErrors(Validation(Values));
        const err = Validation(Values);
        if (err.name === '' && err.email === '' && err.password === ''){
            axios.post('http://localhost:8081/signup', Values)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                console.log(err)
            }
            )
        }
        
    }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h1 className='text-center'>Signup</h1>
            <form action = "" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor = "Name"><strong>Name:</strong></label>
                    <input type = "text" id = "Name" onChange={handleInput} name = "Name" required className='form-control rounded-0'/>
                    {Errors.name && <p className='text-danger'>{Errors.name}</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor = "Email"><strong>Email:</strong></label>
                    <input type = "email" id = "Email" onChange = {handleInput} name = "Email" required className='form-control rounded-0'/>
                    {Errors.email && <p className='text-danger'>{Errors.email}</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor = "password"><strong>Password:</strong></label>
                    <input type = "password" id = "password" onChange={handleInput} name = "password" required className='form-control rounded-0'/>
                    {Errors.password && <p className='text-danger'>{Errors.password}</p>}
                </div >
                <button className=' button btn btn-success w-50 align-items-center justify-content-center' type = "submit"><strong>Sign up</strong></button>
                <Link to="/" className='btn btn-default border w-50 bg-light' type = "submit">Login</Link>
                <p>password should be between 6-20 characters</p>
            </form>
        </div> 
    </div>
  )
}

export default Signup