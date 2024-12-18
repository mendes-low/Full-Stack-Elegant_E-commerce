import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import './Register.css';

import desktop_img from '../../assets/images/auth/auth-desktop.png';

import authService from '../../services/auth.service';

const Register = () => {

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register({ username, email, password, fullname })
      .then(res => res.status)
      .then(() => {
        navigate('/user')
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='register_container'>
      <img src={desktop_img} className='register_img' alt='chair' />
      <div className='register_form_container'>
        <div className='register_form_title'>
          <h4>Sign Up</h4>
          <p>Already have an account? <Link className='register_sign_up' to='/login'>Sign in</Link></p>
        </div>
        <form className='register_form' onSubmit={handleSubmit}>
          <div className='register_fields'>
            <TextField
              id="standard-flexible"
              label="Fullname"
              type="text"
              variant="standard"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#000000',
                }
              }}
            />
            <TextField
              id="standard"
              label="Username"
              type="text"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#000000',
                }
              }}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Email Address"
              type="email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#000000',
                }
              }}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000000',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000000',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#000000',
                }
              }}
            />
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;