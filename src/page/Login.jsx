import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // login api call
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            'https://stg.dhunjam.in/account/admin/login',
            formData // Pass the formData object directly
          );
        
          const data = await response.data
    
          if (data) {
            console.log(data);
            sessionStorage.setItem('token', data.data.token)
            sessionStorage.setItem('id', data.data.id)
            window.location.href = '/dashboard'
          } else {
            alert('Please check your username and password')
          }
        
        } catch (error) {
          console.error('Login failed', error);
        }
    };
      
  return (
    <div align='center' className='login'>
        <h1 className=''>Venue Admin Login</h1>
        <form className='flex '>
            <div className='login-input'>
                <input 
                    name="username"
                    label="Username"
                    type='text'
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder='Username' /> 
                
                <br/>

                <input 
                    name="password"
                    label="Password"
                    type='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder='Password' /> 
                
                <br/>
            </div>
            
            <button type='submit' onClick={handleLogin} className='button'>Sign in</button>
        </form>
        <div>New Registration ?</div>
    </div>
  )
}

export default Login