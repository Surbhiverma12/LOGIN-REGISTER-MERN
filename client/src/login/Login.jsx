import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


const Login = () => {

    const users = {
        email:"",
        password:"",
      };

    const [user, setUser] = useState(users)
    const navigate = useNavigate()

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
      }

    const submitForm = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3000/login",user)
        .then((res)=> {
            console.log(res)
            if(res.status == 200) {
            toast.success(res.data.message,{position: "top-right"})
            navigate('/home')
            }
        })
        .catch((error)=> {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message, { position: "top-right" });
          } else {
            toast.error("Something went wrong! Please try again.", { position: "top-right" });
          }
        });
    }

  return (
    <div>
         <div>
           <div className='addUser'>
  <h3>Login</h3>
  <form className='addUserForm' onSubmit={submitForm} >
   
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
    <button type="submit" className="btn btn-primary">Login</button>
    </div>
    </form>
    <p>Don't Have an Account?</p>
    <div className='inputGroup'>
    <Link to="/register" type="submit" className="btn reg btn-default border text-decoration-none bg-light">
    Rgister
    </Link>
    </div>

</div>
    </div>
    </div>
  )
}

export default Login