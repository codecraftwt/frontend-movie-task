import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token){
            navigate('/movies')
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!validateEmail(emailValue)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        if (passwordValue.trim() === '') {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     console.log('Remember Me:', rememberMe);
    //     navigate('/empty-state');
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        try {
            // API request
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
                email,
                password,
            });

            console.log('Login Successful:', response.data);
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            // localStorage.setItem('user', JSON.stringify(user));
            navigate('/movies');

        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials. Please try again.');
        }
    };


    return (

        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h1 className="text-center mb-4 h1">Sign in</h1>

            <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        className={`form-control inputTag ${emailError ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className={`form-control inputTag ${passwordError ? 'is-invalid' : ''}`} // Conditionally add "is-invalid" class
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>


                <div className="mb-3 form-check d-flex">
                    <input
                        type="checkbox"
                        className="form-check-input me-1 checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label remeber" htmlFor="rememberMe">
                        Remember me
                    </label>
                </div>

                <button type="submit" className="btn loginBtn ">
                    Login
                </button>
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
}

export default SignIn;
