import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('username', 'prasanna_pg');
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      await axios.post('http://localhost:8080/api/posts/create', formData);
      setCaption('');
      setImage(null);
      alert('Successfully uploaded');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      alert('Failed to create post');
    }
    setLoading(false);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        className="form-control mb-2"
        onChange={e => setImage(e.target.files[0])}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Write a caption..."
        value={caption}
        onChange={e => setCaption(e.target.value)}
        required
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Create Post'}
      </button>
    </form>
  );
}

export default CreatePost;
