import React from 'react'
import { ProfileType } from '../../types/types'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div >
      
      <ProfileInfo isOwner={props.isOwner} />

      <MyPosts />

  </div>
  )
}

export default Profile


////Types
type ProfilePropsType = {
  isOwner: boolean
}
