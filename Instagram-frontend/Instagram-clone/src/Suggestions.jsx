import { useEffect, useState } from "react";
import axios from 'axios'

function Suggestions(){

    const [profile,SetProfile]=useState('');

    const [suggestions,SetSuggestions]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/profile')
        .then(response=>response.json())
        .then(data=>SetProfile(data))
        .catch(error=>console.log(error))


        fetch('http://localhost:3000/suggestions')
        .then(response=>response.json())
        .then(data=>SetSuggestions(data))
        .catch(error=>console.log(error))
    })

    const handleFollow = async (id,username,profile_pic) => {
        axios.post( 'http://localhost:3000/followers', { "id":id, "username": username, "profile_pic": profile_pic  })
        .then(alert(`You followed ${username}`))
        .catch(error=>console.log(error))
    }



    return (
        <div>
            <div className="suggestions w-75 m-4">
                {profile ? 
                    <div className='d-flex'>
                        <img className='dp rounded-circle' src={profile.profile_pic} alt="" />
                        <h5 className="username">{profile.username}</h5>
                        <small className="ms-auto text-primary">Switch</small>
                    </div> :
                <p>Loading</p>}


                <div className="d-flex">
                    <p>Suggested for you</p>
                    <b className="ms-auto">See All</b>
                </div>

                {suggestions.length>0 ? (
                        <div>
                            {
                            suggestions.map((suggestion)=>(
                                <div key={suggestion.id}>
                                    <div className='d-flex'>
                                        <img className='dp rounded-circle' src={suggestion.profile_pic} alt="" />
                                        <h5 className='username'>{suggestion.username}</h5>
                                        <a style={{textDecoration:"none",cursor:"pointer"}} className="text-primary ms-auto" onClick={()=>{handleFollow(suggestion.id,suggestion.username,suggestion.profile_pic)}}>Follow</a>
                                    </div>
                                </div>
                            ))
                            }
                        </div>) :( <div>Loading...</div> )}
            </div>
        </div>
    )
}

export default Suggestions;