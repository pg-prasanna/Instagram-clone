import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Stories() {
  const [stories, setStories] = useState([]);
  const [profile, setProfile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let tot = 0;

  useEffect(() => {
    fetch('http://localhost:8080/story')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error:', error))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/profile/1')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
  }, [])

  const handleAddStoryClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = null;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    await fetch('http://localhost:8080/story/create/profile/1', {
      method: 'POST',
      body: formData,
    });
    // Refresh stories after upload
    fetch('http://localhost:8080/story')
      .then(response => response.json())
      .then(data => setStories(data));
  };

  return (
    <div className='story d-flex'>
      {/* Add Story Button */}
      <div className='mx-1 my-1' style={{ cursor: "pointer" }} onClick={handleAddStoryClick}>
        <div className="gradient-border" style={{ border: '2px dashed #0d6efd' }}>
          <div className="inner-circle" style={{ background: '#f8f9fa' }}>
            {profile && profile.profilePhoto && profile.profilePhotoType ? (
              <img
                src={`data:image/${profile.profilePhotoType};base64,${profile.profilePhoto}`}
                alt="add-story"
                className="story-dp"
                style={{ opacity: 0.7 }}
              />
            ) : (
              <div className="story-dp d-flex align-items-center justify-content-center" style={{ background: '#e9ecef', color: '#0d6efd', fontSize: 32 }}>
                +
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <p className='text-truncate' style={{ width: "70px", color: "#0d6efd", fontWeight: 500 }}>Add Story</p>
      </div>
      {/* Existing Stories */}
      <div className='d-none'>
        {tot = stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story) => {
          // Support both user and profile
          const userOrProfile = story.user || story.profile;
          const profilePic = userOrProfile?.profilePhoto || userOrProfile?.profile_pic;
          const profilePhotoType = userOrProfile?.profilePhotoType || "jpeg";
          return (
            <div key={story.id} className='mx-1 my-1 ' style={{ cursor: "pointer" }} onClick={() => navigate(`/story/${story.id}/${tot}`)}>
              <div className="gradient-border">
                <div className="inner-circle">
                  <img
                    src={
                      profilePic
                        ? `data:image/${profilePhotoType};base64,${profilePic}`
                        : '/assets/default_profile.png'
                    }
                    alt="dp"
                    className="story-dp"
                  />
                </div>
              </div>
              <p className='text-truncate' style={{ width: "70px" }}>
                {userOrProfile?.username}
              </p>
            </div>
          )
        })
      ) : (<p>Loading Stories...</p>)}
    </div>
  )
}

export default Stories