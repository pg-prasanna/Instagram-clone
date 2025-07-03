import React from 'react'
import Stories from './Stories'
import Posts from './Posts'

function Feed() {
  return (
    <>
        <Stories/>
        {/* <CreatePost/> */}
        <Posts/>
    </>
  )
}

export default Feed