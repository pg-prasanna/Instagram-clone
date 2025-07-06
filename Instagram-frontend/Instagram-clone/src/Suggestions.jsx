import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/profile/1')
      .then((res) => {
        // Only keep the fields you need to avoid recursive followers
        const { id, username, profilePhoto, profilePhotoType } = res.data;
        setProfile({ id, username, profilePhoto, profilePhotoType });
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  useEffect(() => {
    // Fetch followers for profile id 1
    axios
      .get('http://localhost:8080/followers/1')
      .then((res) => setFollowers(res.data))
      .catch((err) => console.error('Error fetching followers:', err));
  }, []);

  useEffect(() => {
    if (profile) {
      axios
        .get('http://localhost:8080/user/suggestions')
        .then((res) => {
          // Remove duplicates by user id and filter out followers
          const followerUsernames = new Set(followers.map(f => f.username));
          const filtered = res.data
            .filter((user, idx, arr) =>
              user.id !== profile.id &&
              arr.findIndex(u => u.id === user.id) === idx &&
              !followerUsernames.has(user.username)
            );
          setSuggestions(filtered);
        })
        .catch((err) => console.error('Error fetching suggestions:', err));
    }
  }, [profile, followers]);

  const handleFollow = (user) => {
    axios
      .post('http://localhost:8080/followers/add', {
        profileId: profile.id,
        username: user.username,
        profilePhoto: user.profilePhoto,
        profilePhotoType: user.profilePhotoType,
      })
      .then((res) => {
        alert(res.data);
        // Remove followed user from suggestions and add to followers
        setSuggestions(prev => prev.filter(u => u.id !== user.id));
        setFollowers(prev => [...prev, user]);
      })
      .catch((err) => console.error('Error following user:', err));
  };

  return (
    <div className="suggestions w-75 m-4">
      {profile && (
        <div className="d-flex align-items-center mb-3">
          {profile.profilePhoto && profile.profilePhotoType ? (
            <img
              src={`data:image/${profile.profilePhotoType};base64,${profile.profilePhoto}`}
              className="rounded-circle"
              width={40}
              height={40}
              alt="profile"
            />
          ) : (
            <div
              className="rounded-circle bg-secondary"
              style={{ width: 40, height: 40 }}
            />
          )}
          <h5 className="ms-2">{profile.username}</h5>
          <small className="ms-auto text-primary" style={{ cursor: 'pointer' }}>
            Switch
          </small>
        </div>
      )}

      <div className="d-flex mb-2">
        <p className="mb-0">Suggested for you</p>
        <b className="ms-auto" style={{ cursor: 'pointer' }}>
          See All
        </b>
      </div>

      {suggestions.map((user) => (
        <div className="d-flex align-items-center my-2" key={user.id}>
          <img
            src={`data:image/${user.profilePhotoType};base64,${user.profilePhoto}`}
            className="rounded-circle"
            width={40}
            height={40}
            alt="suggestion"
          />
          <h6 className="ms-2 mb-0">{user.username}</h6>
          <button
            style={{ cursor: 'pointer' , textDecoration: 'none' }}
            className="btn btn-link text-primary ms-auto"
            onClick={() => handleFollow(user)}
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;






// import { useEffect, useState } from "react";
// import axios from 'axios'

// function Suggestions(){

//     const [profile,SetProfile]=useState('');

//     const [suggestions,SetSuggestions]=useState([]);

//     useEffect(()=>{
//         fetch('http://localhost:3000/profile')
//         .then(response=>response.json())
//         .then(data=>SetProfile(data))
//         .catch(error=>console.log(error))


//         fetch('http://localhost:3000/suggestions')
//         .then(response=>response.json())
//         .then(data=>SetSuggestions(data))
//         .catch(error=>console.log(error))
//     })

//     const handleFollow = async (id,username,profile_pic) => {
//         axios.post( 'http://localhost:3000/followers', { "id":id, "username": username, "profile_pic": profile_pic  })
//         .then(alert(`You followed ${username}`))
//         .catch(error=>console.log(error))
//     }

