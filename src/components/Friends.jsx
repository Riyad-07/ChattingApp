import React from 'react'
import FriendsList from './Layers/FriendsList'

const Friends = () => {
  return (
    <div className='overflow-y-auto shadow-md'>
        <h1 className="text-3xl font-semibold text-[#494949] mb-5">My Friends</h1>
        <FriendsList/>
    </div>
  )
}

export default Friends