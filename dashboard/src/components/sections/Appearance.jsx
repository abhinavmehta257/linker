import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from './components/Profile';
import Themes from './components/Themes';

function Appearance() {
  const isProfileLoading = useSelector(state => state.profile.loading);
 
  return (
   <div>
    {
      !isProfileLoading ? <Profile /> : <div className='text-center'>Loading...</div>
    }
    <div className='mt-5 text-left'>
      <Themes></Themes>
    </div>
   </div>
  )
}

export default Appearance