import React, { ChangeEvent, useState } from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import defaultUserImg from '../../../assets/img/userImg.jpg'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import {  updateUserStatus,savePhoto,saveProfile} from '../../../redux/profile-reducer';
import { Button } from 'antd'

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const status = useSelector((state: AppStateType) => state.profilePage.status)
  


  if(!profile){
    return <Preloader/>
  }


  const onSubmit = (profile: ProfileType) =>{
    dispatch(saveProfile(profile))
    setEditMode(false)
  }
  

  const onUpdateUserStatus = (status: string) =>{
    dispatch(updateUserStatus)
  }
  
  
  return (
    <div>
      <div className={s.descriptionBlock}>
         <img className ={s.userImg}  src={profile.photos.large || defaultUserImg} /> 
                                  
        
        <ProfileStatus isOwner={props.isOwner} status={status} updateUserStatus={onUpdateUserStatus}/>
        {editMode ?<ProfileDataForm initialValues={profile}  onSubmit={onSubmit} /> 
                  :<ProfileData  profile ={profile} isOwner={props.isOwner} toEditMode={()=>{setEditMode(true)}} />}
        
      </div>
    </div>
  )
}


export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) =>{
  return <div className={s.contact}><b>{contactTitle}: </b> {contactValue}</div>
}


const ProfileData: React.FC<ProfileDataType> = ({profile,isOwner, toEditMode}) => {
  
  return(
    <div>     
          <div>
            <b>Full name: </b>{profile.fullName ? profile.fullName : " ---"}
          </div>
          <div>
            <b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
          </div>
          <div>
            <b>About me: </b>{profile.aboutMe ? profile.aboutMe : "---"}
          </div>
          
          <div>
            <b>Contacts: </b>{Object
                                .keys(profile.contacts)
                                .map((key) =>{
                                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}

            {isOwner && <div><Button type='primary' onClick={toEditMode}>Edit</Button></div>}

      </div>
    </div>
   )
}


export default ProfileInfo

////Types
//ProfileInfo
type ProfileInfoPropsType = {
  isOwner: boolean 
}
//ProfileDataTypes
type ProfileDataType = {
  profile: ProfileType
  isOwner: boolean
  toEditMode: () => void
}
//ContactType
type ContactPropsType ={
  contactTitle: string
  contactValue: string | null
}
