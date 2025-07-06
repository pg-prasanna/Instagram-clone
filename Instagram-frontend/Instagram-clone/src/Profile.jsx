import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
    const [profile, setProfile] = useState(null)
    const [followers, setFollowers] = useState([])
    const [unfollowed, setUnfollowed] = useState(0)
    const [username, setUsername] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [previewPhoto, setPreviewPhoto] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/profile/1')
            .then(res => {
                setProfile(res.data)
                setUsername(res.data.username)
                setPreviewPhoto(
                    res.data.profilePhoto && res.data.profilePhotoType
                        ? `data:image/${res.data.profilePhotoType};base64,${res.data.profilePhoto}`
                        : ''
                )
            })
            .catch(error => console.log(error))

        axios.get('http://localhost:8080/followers/1')
            .then(res => setFollowers(res.data))
            .catch(error => console.log(error))
    }, [unfollowed])

    const handleUsernameChange = (e) => setUsername(e.target.value)

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0]
        setProfilePhoto(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewPhoto(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleUpdateProfile = async () => {
        if (!profile) return;
        const formData = new FormData();
        formData.append('username', username);
        if (profilePhoto) formData.append('profilePhoto', profilePhoto);
        axios.put(`http://localhost:8080/profile/${profile.id}`, formData)
            .then(() => alert('Profile updated!'))
            .catch(error => console.log(error));
    }

    const handleUnFollow = async (followerId) => {
        axios.delete(`http://localhost:8080/followers/${followerId}`)
            .then(() => {
                alert('Unfollowed Successfully')
                setUnfollowed(u => !u)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img className='profile rounded-circle' src={previewPhoto} alt="profile" />
                    <h5 className='mx-3'>{profile.username}</h5>
                    <div className='my-3'>
                        <b>{followers.length}</b> Following
                    </div>
                    <input
                        type="text"
                        value={username}
                        name='username'
                        className='form-control my-2'
                        onChange={handleUsernameChange}
                        placeholder="Username"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className='form-control my-2'
                        onChange={handleProfilePhotoChange}
                    />
                    <button className='btn btn-primary my-2' onClick={handleUpdateProfile}>Update</button>
                </div>
            ) : (<div>Loading Profile</div>)}

            <hr />
            <h5>Following</h5>
            {followers.length > 0 ? (
                [...new Map(followers.map(f => [f.username, f])).values()].map(follower => {
                    const profilePhoto = follower.profilePhoto || follower.profile_photo;
                    const profilePhotoType = follower.profilePhotoType || follower.profile_photo_type;
                    return (
                        <div key={follower.id} className='d-flex my-2 align-items-center'>
                            <img className='dp rounded-circle' src={
                                profilePhoto && profilePhotoType
                                    ? `data:image/${profilePhotoType};base64,${profilePhoto}`
                                    : ''
                            } alt="follower" />
                            <h6 className='username ms-2 mb-0'>{follower.username}</h6>
                            <button className='btn btn-secondary ms-auto' onClick={() => handleUnFollow(follower.id)}>Unfollow</button>
                        </div>
                    )
                })
            ) : (<div>No following</div>)}
        </div>
    )
}

export default Profile