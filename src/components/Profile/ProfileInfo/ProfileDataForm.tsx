import React, { ChangeEvent } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../types/types'
import { required } from '../../../utils/validators/validators'
import Textarea, { createField, Input } from '../../Common/FormControls/FormControls'
import  {savePhoto} from '../../../redux/profile-reducer';
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

const ProfileDataForm: React.FC<InjectedFormProps< ProfileType & PDFPropsType >  > = ({handleSubmit } ) => {


  const dispatch = useDispatch()

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files?.length){
      dispatch(savePhoto(e.target.files[0]))
    }
  }


  return (
      <form onSubmit={handleSubmit}>
         
          <div>
            {<input type={"file"} onChange={onMainPhotoSelected}></input>}
          </div>   
          <div>
            <b>Full name: </b> {createField<ProfileDataFormValuesKeys>("Full name", "fullName", [required], Input)}
          </div>
          <div>
            <b>Looking for a job: </b>{createField<ProfileDataFormValuesKeys>("", "lookingForAJob", [], Input,{type: "checkbox"})}
          </div>
          <div>
            <b>About me: </b>{createField<ProfileDataFormValuesKeys>("About me", "aboutMe", [required], Textarea)}
          </div>
          
          <div><Button onClick={handleSubmit} >SAVE</Button></div>
    </form>
  )
}

const ProfileDataFormWithRedux = reduxForm<ProfileType & PDFPropsType>({form: "edit-profile"})(ProfileDataForm)


export default ProfileDataFormWithRedux

////Types
type PDFPropsType ={
  onSubmit: () => void
  initialValues: ProfileType
  onMainPhotoSelected: () => void
}
///Keys
type PDFValuesType ={
  fullName: string
  lookingForAJob: string
  aboutMe: string
}
type ProfileDataFormValuesKeys = Extract<keyof PDFValuesType, string>