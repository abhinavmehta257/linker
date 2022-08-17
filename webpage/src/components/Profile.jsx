import React, { useEffect } from 'react'

function Profile({profile}) {
  console.log(profile)
  useEffect(() => {
  }, [])
  return (
    profile ? (
    <div className='profile-section'>
        <img className='profile-image place-content-center' src={profile.profileImage} alt="" />
        <h1 className='profile-title'>{profile.profileTitle}</h1>
        {profile.profileBio ?
        (<h2 className='profile-bio'>{profile.profileBio}</h2>) : 
        ''}
    </div>
    ) : null
  )
}

export default Profile