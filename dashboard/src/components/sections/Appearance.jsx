import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CustomizeTheme from './components/CustomizeTheme';
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
      {!isProfileLoading ?  <Themes></Themes> : <div className='text-center'> Loading...</div>}
    </div>
    <div className='mt-5 text-left'>
      {!isProfileLoading ?  <CustomizeTheme/> : <div className='text-center'> Loading...</div>}
    </div>
    
   </div>
  )
}

export default Appearance