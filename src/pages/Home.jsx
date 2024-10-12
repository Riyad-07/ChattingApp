import React from 'react'
import LoginUserRoute from '../PrivateRoute/LoginUser'
import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import FriendReq from '../components/FriendReq'
import Friends from '../components/Friends'

const Home = () => {
  return (
    <div className='grid grid-cols-[2fr,6fr] px-3 gap-x-5'>
      <div className='w-full overflow-y-auto h-[600px] bg-[#FBFBFB]'>
        <UserList/>
      </div>
      <div className='grid grid-cols-2 gap-x-5'>
        <div className='p-5 overflow-y-auto h-[600px]'>
          <FriendReq/>
        </div>
        <div className='p-5 overflow-y-auto h-[600px]'>
          <Friends/>
        </div>
      </div>
    </div>
  )
}

export default Home