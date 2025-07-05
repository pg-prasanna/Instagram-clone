import React, { useState } from 'react'
import Stories from './Stories'
import Posts from './Posts'

function Feed() {
  const [refresh, setRefresh] = useState(false);

  const handlePostCreated = () => setRefresh(r => !r);

  return (
    <>
      <Stories/>
      <Posts refresh={refresh} />
    </>
  )
}

export default Feed