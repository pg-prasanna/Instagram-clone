import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <div className='my-5' key={post.id}>

              {/* User Info */}
              <div className='d-flex align-items-center'>
                <img
                  className='dp rounded-circle'
                  src={`http://localhost:8080/user/${post.user.id}/photo`}
                  alt="Profile"
                  width={40}
                  height={40}
                />
                <h5 className='username ms-2'>{post.user.username}</h5>
              </div>

              {/* Post Image */}
              <img
                className='image my-2'
                src={`http://localhost:8080${post.profileImage}`} // full photo endpoint
                alt="Post"
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
              />

              {/* Icons */}
              <div className='my-2'>
                <i className="bi bi-heart me-2"></i>
                <i className="bi bi-chat me-2"></i>
                <i className="bi bi-send"></i>
              </div>

              {/* Likes and Caption */}
              <div><b>{post.likes} likes</b></div>
              <p><b>{post.user.username}</b> {post.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts...</div>
      )}
    </div>
  );
}

export default Posts;






// import React, { useEffect, useState } from 'react'

// function Posts() {

//   const [posts,setPosts]=useState([]);

//   useEffect(()=>{
//     fetch('http://localhost:3000/posts')
//     .then(response=>response.json())
//     .then(data=>setPosts(data))
//     .catch(error=>console.error('Error:', error))
//   },[])

//   return (
//     <div className='d-flex justify-content-center'>
//         {posts.length>0 ? (
//           <div>
//             {
//               posts.map((post)=>(
//                 <div className='my-5' key={post.id}>

//                   <div className='d-flex'>
//                     <img className='dp rounded-circle' src={post.user.profile_pic} alt="" />
//                     <h5 className='username'>{post.user.username}</h5>
//                   </div>

//                   <img className='image' src={post.image} alt="" />

//                   <div>
//                     <i className="bi bi-heart"></i>
//                     <i className="bi bi-chat"></i>
//                     <i className="bi bi-send"></i>
//                   </div>

//                   <div>
//                     <b>{post.likes}</b> 
//                   </div>

//                   <p>{post.caption}</p>
//                 </div>
//               ))
//             }
//           </div>
//         ) :( <div>Loading Posts...</div> )}
//     </div>
//   )
// }

// export default Posts