import React, { useEffect, useState } from 'react';

function Posts({ refresh }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, [refresh]);

  return (
    <div className="w-100 px-3">
      {posts.length > 0 ? (
        posts.map(post => (
          <div className='my-4 border rounded p-3' key={post.id}>
            <div className='d-flex align-items-center'>
              <img
                className='dp rounded-circle'
                src={`http://localhost:8080/user/${post.user.id}/photo`}
                alt="Profile"
                width={40}
                height={40}
              />
              <h6 className='username ms-2 mb-0'>{post.user.username}</h6>
            </div>

            <img
              className='my-3 rounded'
              src={`http://localhost:8080${post.profileImage}`}
              alt="Post"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '600px',
                objectFit: 'cover'
              }}
            />

            <div className='my-2'>
              <i className="bi bi-heart me-2"></i>
              <i className="bi bi-chat me-2"></i>
              <i className="bi bi-send"></i>
            </div>

            <div><strong>{post.likes} likes</strong></div>
            <p className='mb-0'>
              <strong>{post.user.username}</strong> {post.caption}
            </p>
          </div>
        ))
      ) : (
        <div>Loading Posts...</div>
      )}
    </div>
  );
}

export default Posts;