import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
  const requests = useSelector((store)=> store.requests);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchRequests = async()=>{
        try{
           const res = await axios.get(BASE_URL + '/user/requests/received', {withCredentials: true});
           dispatch(addRequests(res.data.data));

        }catch(err){
            console.log(err);
        }
    };

    const reviewRequest = async(status, _id) =>{
      try{
          await axios.post(BASE_URL + "/request/review/" +status+ "/"+_id,{}, 
          {withCredentials : true});
            dispatch(removeRequest(_id));
            navigate('/connections');
      }catch(err){    
          console.log(err)
      }  
    }

    useEffect(()=>{
      fetchRequests();
    },[]);

    if(!requests) return;
    if(requests.length === 0) return <h1 className="flex justify-center text-bold text-2xl my-4">No Requests Found..!</h1>
  return (
      <div className="text-center my-10">
          <h1 className="text-bold text-3xl">Requests</h1>

          {requests.map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;

              return (
                  <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                      <div className='flex justify-between items-center'>
                        <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                        <div className="text-left mx-4"> 
                          <h2 className="font-bold text-xl">
                            { firstName + " " + lastName}
                          </h2>
                          { age && gender && <p>{age + " " + gender}</p>}
                          <p>{about}</p>
                      </div>
                      </div>
                      
                      <div>
                      <button className="btn btn-secondary mx-2"  onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                      <button className="btn btn-primary mx-2"  onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                      </div>
                  </div>
              )

          })}
      </div>
  )
}

export default Requests;