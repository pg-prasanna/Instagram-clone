import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

    const [profile,setProfile]=useState(null)

    const [follwers, setFollowers]=useState([])

    const [unfollowed, setUnfollowed]=useState(0)

    useEffect(()=>{
        axios.get('http://localhost:3000/profile')
        .then(data=>setProfile(data.data))
        .catch(error=>console.log(error))

        axios.get('http://localhost:3000/followers')
        .then(data=>setFollowers(data.data))
        .catch(error=>console.log(error))
    },[unfollowed])


    function handleOnChange(event){
        setProfile(prevProfile=>({
            ...prevProfile,
            [event.target.name]:[event.target.value]
        }))
    }

    const handleUpdateProfile=async()=>{
        axios.put('http://localhost:3000/profile', profile)
        .catch(error=>console.log(error))
    }

    const handleUnFollow=async(followerId)=>{
        axios.delete(`http://localhost:3000/followers/${followerId}`)
        .then(alert('Unfollowed Successfully'))
        .then(setUnfollowed(!unfollowed))
       .catch(error=>console.log(error))
    }
    return (
    <div className='m-5'>
        {profile ? (
            <div>
                <img className='profile rounded-circle' src={profile.profile_pic} alt="" />
                <h5 className='mx-3'>{profile.username}</h5>

                <input type="text" 
                    value={profile.username}
                    name='username'
                    className='form-control my-4'
                    onChange={handleOnChange}
                />

                <input type="text" 
                    value={profile.profile_pic}
                    name='profxile_pic'
                    className='form-control'
                    onChange={handleOnChange}
                />

                <button className='btn btn-primary my-4' onClick={handleUpdateProfile}>Update</button>
            </div>
        ):(<div>Loading Profile</div>)}


        {follwers.length>0? (
            follwers.map(follower=>(
                <div key={follower.id} className='d-flex my-2'>
                    <img className='dp rounded-circle' src={follower.profile_pic} alt="" />
                    <h5 className='username'>{follower.username}</h5>
                    <button className='btn btn-secondary ms-auto' onClick={()=>{handleUnFollow(follower.id)}}>Un Follow</button>
                </div>
            ))
        ):(<div>Loading Followers</div>)}
    </div>
    )
}

export default Profile