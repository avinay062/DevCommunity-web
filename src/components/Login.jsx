import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("avinay.kumar@gmail.com");
    const [ password, setPassword] = useState("Password@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin= async() =>{
        setError("");
        try{
            const res = await axios.post( BASE_URL+"/login", {
                emailId,
                password
            }, 
            {withCredentials : true});
            dispatch(addUser(res.data));
           return navigate('/');
        }catch(err){
            setError(err?.response?.data || 'Something went Wrong');
            console.log(err)
        }
        
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login !</h2>
                    <div className=''>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email Id</span>
                            </div>
                            <input 
                            type="text" 
                            value = {emailId} 
                            onChange={(e)=> setEmailId(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                        </label>  
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input 
                            type="password" 
                            value = {password} 
                            onChange={(e)=> setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button 
                        className="btn bg-neutral text-neutral-50"
                        onClick = {handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;