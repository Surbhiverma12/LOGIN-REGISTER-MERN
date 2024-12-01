import React, { useState }  from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
    const users = {
        name:"",
        email:"",
        password:"",
      };

    const [user, setUser] = useState(users)
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
      }

    const submitForm = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3000/register",user)
        .then((res)=> {
            toast.success(res.data.message,{position: "top-right"}
            )
            navigate("/home")
        })
        .catch((error)=> {
            console.log(error)
        });
    }

  return (
    <div>
           <div className='addUser'>
  <h3>Register</h3>
  <form className='addUserForm' onSubmit={submitForm} >
    <div className='inputGroup'>
        <label htmlFor="name">Name:</label>
        <input type="text" 
        id='name'
        name='name'
        onChange={inputHandler}
        autoComplete='off'
        placeholder='Enter your Name'
        />
    </div>
    <div className='inputGroup'>
        <label htmlFor="email">E-mail:</label>
        <input type="email" 
        id='email'
        name='email'
        onChange={inputHandler}
        autoComplete='off'
        placeholder='Enter your email'
        />
    </div>
    <div className='inputGroup'>
        <label htmlFor="password">Password:</label>
        <input type="password" 
        id='password'
        name='password'
        onChange={inputHandler}
        autoComplete='off'
        placeholder='Enter your password'
        />
    </div>
    <div className='inputGroup'>
    <button type="submit" className="btn btn-primary">Register</button>
    </div>
    </form>
    <p>Already Have an Account?</p>
    <div className='inputGroup'>
    <Link to="/login" type="submit" className="btn reg btn-default border text-decoration-none bg-light">
    Login
    </Link>
    </div>

</div>
    </div>
  )
}

export default Signup