import React, { useEffect, useState } from 'react'
import { useParams , Link ,useNavigate} from 'react-router-dom'

function timeAgo(timestamp) {
  if (!timestamp) return '';
  const now = new Date();
  const storyTime = new Date(timestamp);
  const diffMs = now - storyTime;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d`;
}

function ViewStory() {
  const { id ,tot} = useParams()
  const [story, setStory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8080/story/${id}`)
      .then(response => response.json())
      .then(data => {
        setStory(data);
      })
      .catch(error => console.error('Error:', error))
  }, [id])

  if(id>tot || id<=0){
    navigate('/');
  }

  let userOrProfile = story && (story.user || story.profile);
  let profilePhoto = userOrProfile?.profilePhoto || userOrProfile?.profile_pic;
  let profilePhotoType = userOrProfile?.profilePhotoType || "jpeg";
  let username = userOrProfile?.username;
  let timestamp = story?.timestamp;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {story && userOrProfile ? (
        <div style={{ position: 'relative', width: 400, height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Story header overlay */}
          <div
            className="d-flex align-items-center px-3 py-2"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))',
              color: 'white',
              zIndex: 2,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <img
              src={
                profilePhoto
                  ? `data:image/${profilePhotoType};base64,${profilePhoto}`
                  : '/assets/default_profile.png'
              }
              alt="profile"
              className="rounded-circle"
              style={{ width: 38, height: 38, objectFit: 'cover', marginRight: 10, border: '2px solid white' }}
            />
            <span style={{ fontWeight: 500, fontSize: 18 }}>{username}</span>
            <span style={{ marginLeft: 8, fontSize: 15, opacity: 0.8 }}>
              {timeAgo(timestamp)}
            </span>
          </div>
          {/* Navigation and story image */}
          <Link
            to={`/story/${Number(id)-1}/${tot}`}
            style={{
              position: 'absolute',
              left: -40,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="bi bi-arrow-left-circle-fill" style={{ fontSize: 32, color: '#222' }}></i>
          </Link>
          <img className='vh-100'
            src={
              story.image && story.imageType
                ? `data:image/${story.imageType};base64,${story.image}`
                : ''
            }
            alt=""
            style={{
              width: '400px',
              height: '700px',
              objectFit: 'cover',
              borderRadius: '10px',
              display: 'block'
            }} />
          <Link
            to={`/story/${Number(id)+1}/${tot}`}
            style={{
              position: 'absolute',
              right: -40,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: 32, color: '#222' }}></i>
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default ViewStory
