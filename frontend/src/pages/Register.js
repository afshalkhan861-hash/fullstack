import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [data, setData] = useState({ name:'', email:'', password:'', confirm:'' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!data.name) errs.name = 'Required';
    if (!data.email) errs.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Invalid';
    if (!data.password) errs.password = 'Required';
    else if (data.password.length < 6) errs.password = 'Min 6 chars';
    if (data.password !== data.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await register(data.name, data.email, data.password);
      toast.success('Account created!');
      navigate('/');
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <form onSubmit={submit}>
          <div className="fg"><label>Name</label><input value={data.name} onChange={e=>setData({...data,name:e.target.value})}/>{errors.name && <span className="err">{errors.name}</span>}</div>
          <div className="fg"><label>Email</label><input type="email" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>{errors.email && <span className="err">{errors.email}</span>}</div>
          <div className="fg"><label>Password</label><input type="password" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>{errors.password && <span className="err">{errors.password}</span>}</div>
          <div className="fg"><label>Confirm Password</label><input type="password" value={data.confirm} onChange={e=>setData({...data,confirm:e.target.value})}/>{errors.confirm && <span className="err">{errors.confirm}</span>}</div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p style={{textAlign:'center',marginTop:20}}>Have account? <Link to="/login" style={{fontWeight:700,textDecoration:'underline'}}>Login</Link></p>
      </div>
    </div>
  );
};
export default Register;