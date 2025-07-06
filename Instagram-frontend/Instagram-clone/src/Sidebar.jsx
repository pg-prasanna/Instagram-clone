import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoType, setProfilePhotoType] = useState(null);
  const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    fetch('http://localhost:8080/profile/1')
      .then(res => res.json())
      .then(data => {
        setProfilePhoto(data.profilePhoto);
        setProfilePhotoType(data.profilePhotoType);
      })
      .catch(() => {
        setProfilePhoto(null);
        setProfilePhotoType(null);
      });
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

  return (
    <div className={`m-3 position-fixed${darkTheme ? ' dark-sidebar' : ''}`}>
        <div className='d-flex flex-column gap-3 sidebar-text-lg'>
            <img className="logo-text" src="\assets\Instagram_text.png" alt="insta-text" />
            
            <div style={{cursor:"Pointer"}}><i className="bi bi-house-door"></i>Home</div>
            <div style={{cursor:"Pointer"}}><i className="bi bi-search"></i>Search</div>
            <div style={{cursor:"Pointer"}}><i className="bi bi-compass"></i>Explore</div>
            <div style={{cursor:"Pointer"}}><i className="bi bi-play-btn"></i>Reels</div>
            <div style={{cursor:"Pointer"}}><i className="bi bi-chat-dots"></i>Messages</div>
            <div style={{cursor:"Pointer"}}><i className="bi bi-heart"></i>Notifications</div>
            <div style={{cursor:"Pointer"}} onClick={()=>navigate("/create")}><i className="bi bi-plus-square"></i>Create</div>
            <div style={{cursor:"Pointer"}} onClick={()=>navigate("/profile")}>
              {profilePhoto && profilePhotoType ? (
                <img
                  src={`data:image/${profilePhotoType};base64,${profilePhoto}`}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: 28, height: 28, objectFit: 'cover', marginRight: 10, verticalAlign: 'middle' }}
                />
              ) : (
                <i className="bi bi-person-circle"></i>
              )}
              Profile
            </div>
            <div className="mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setDarkTheme(t => !t)}
              >
                {darkTheme ? 'Light Theme' : 'Dark Theme'}
              </button>
            </div>
        </div>

        <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3 sidebar-text-lg'>
                <div><i className="bi bi-threads"></i>Threads</div>
                <div><i className="bi bi-list"></i>More</div>
        </div>
    </div>
  )
}

export default Sidebar