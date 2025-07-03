import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Stories() {

  const [stories,setStories]=useState([]);

  const navigate = useNavigate();

  let tot=0;

  useEffect(()=>{
    fetch('http://localhost:3000/story')
    .then(response=>response.json())
    .then(data=>setStories(data))
    .catch(error=>console.error('Error:', error))
  },[])

  return (
    <div className='story d-flex'>

      <div className='d-none'>
         {tot=stories.length}
      </div>
      {stories.length>0 ? (
        stories.map((story)=>(  
          <div key={story.id} className='mx-1 my-1 ' style={{cursor:"pointer"}} onClick={()=>navigate(`/story/${story.id}/${tot}`)}>

            <div className="gradient-border">
              <div className="inner-circle">
                <img src={story.user.profile_pic} alt="dp" className="story-dp" />
              </div>
            </div>

            <p className='text-truncate' style={{width:"70px"}}>{story.user.username}</p>

          </div>

    
        ))
        ) : (<p>Loading Stories...</p>)}
    </div>
  )
}

export default Stories