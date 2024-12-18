import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import './Login.css';

import desktop_img from '../../assets/images/auth/auth-desktop.png';

import authService from '../../services/auth.service';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login({ username, password })
            .then(res => res.status)
            .then((status) => {
                if (status == 200) {
                    navigate('/');
                } else {
                    setError(true);
                }
            })
    }

    return (
        <div className='login_container'>
            <img src={desktop_img} className='login_img' alt='chair' />
            <div className='login_form_container'>
                <div className='login_form_title'>
                    <h4>Sign In</h4>
                    <p>Don’t have an accout yet? <Link className='login_sign_up' to='/register'>Sign up</Link></p>
                </div>
                <form className='login_form' onSubmit={handleSubmit}>
                    <div className='login_fields'>
                        <TextField
                            id="standard-multiline-flexible"
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
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            variant="standard"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                            helperText={error && "Password must be at least 8 characters long"}
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
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
