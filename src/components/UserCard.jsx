import React from 'react'

const UserCard = ({ user }) => {
    console.log(user)
    const { firstName, lastName, age , gender, about, photoUrl, skills} = user;
  return (
    <div className="card card-compact bg-base-200 w-96 shadow-xl">
  <figure>
    <img
      src= {photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
   { age && gender && <p>{age + " " + gender}</p> }
   { about && <p>{about}</p>}
   { skills && <p>{skills}</p>}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Intrested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard;