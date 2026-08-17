import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [data, setData] = useState({ email:'', password:'' });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!data.email) errs.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Invalid email';
    if (!data.password) errs.password = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await login(data.email, data.password);
      toast.success('Logged in!');
      navigate('/');
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>
        <form onSubmit={submit}>
          <div className="fg">
            <label>Email</label>
            <input type="email" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>
            {errors.email && <span className="err">{errors.email}</span>}
          </div>
          <div className="fg">
            <label>Password</label>
            <input type="password" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>
            {errors.password && <span className="err">{errors.password}</span>}
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p style={{textAlign:'center',marginTop:20}}>No account? <Link to="/register" style={{fontWeight:700,textDecoration:'underline'}}>Sign up</Link></p>
      </div>
    </div>
  );
};
export default Login;