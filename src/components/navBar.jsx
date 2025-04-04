import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() =>{
    try{
        await axios.post(BASE_URL+"/logout",{}, 
        {withCredentials : true});
          dispatch(removeUser());
          navigate('/login');
    }catch(err){    
        console.log(err)
    }  
}
  return (
    <div className="navbar bg-neutral">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl text-neutral-50">Developer Community</Link>
  </div>
  { user && (
    <div className="flex-none gap-2">
       <div className="text-neutral-50 px-4"> Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
            <span className="badge">Edit</span>
          </Link>
        </li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick = {handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
}

export default NavBar;