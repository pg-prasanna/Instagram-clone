import React, { useEffect, useState } from 'react'
import { useParams , Link ,useNavigate} from 'react-router-dom'

function ViewStory() {
  const { id ,tot} = useParams()

  const [story, setStory] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then(response => response.json())
      .then(data => {
        // console.log('Fetched data:', data); // 🔍 Add this
        setStory(data);
      })
      .catch(error => console.error('Error:', error))
  }, [id])

  if(id>tot || id<=0){
    navigate('/');
  }

  return (
    <div>
      {story && story.user ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
          <img className='vh-100' src={story.image} alt="" style={{
            width: '400px',
            height: '700px',
            objectFit: 'cover',
            borderRadius: '10px'
          }} />
          <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default ViewStory
