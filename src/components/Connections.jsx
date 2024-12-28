import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store)=> store.connections);

    const dispatch = useDispatch();

    const fetchConnections = async()=>{
        try{
           const res = await axios.get(BASE_URL + '/user/connections', {withCredentials: true});
           dispatch(addConnections(res.data.data));

        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
      fetchConnections();
    },[]);

    if(!connections) return;
    if(connections.length === 0) return <h1 className="text-bold text-2xl">No Connections Found..!</h1>
  return (
      <div className="text-center my-10">
          <h1 className="text-bold text-3xl">Connections</h1>

          {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;

              return (
                  <div key={_id}  className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                      <div>
                        <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                      </div>
                      <div className="text-left mx-4"> 
                          <h2 className="font-bold text-xl">
                            { firstName + " " + lastName}
                          </h2>
                          { age && gender && <p>{age + " " + gender}</p>}
                          <p>{about}</p>
                      </div>
                  </div>
              )

          })}
      </div>
  )
}

export default Connections;