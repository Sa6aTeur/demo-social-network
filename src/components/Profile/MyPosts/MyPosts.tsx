import React from 'react'
import Post from './Posts/Post'
import s from './MyPosts.module.css'
import { InjectedFormProps, reduxForm, submit } from 'redux-form';
import { maxLenghtCreator } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../Common/FormControls/FormControls';
import { PostType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { actions } from '../../../redux/profile-reducer';
import { Button } from 'antd';


const maxLenght = maxLenghtCreator(25);


const MyPosts: React.FC = () => {

  const postsElements = useSelector((state: AppStateType) => state.profilePage.posts).map((p,index) => <Post key={index} message={p.message} likesCount={p.likesCount}/>)
  

  const dispatch = useDispatch()


  const onAddPost = (values: AddPostValuesType) =>{
    dispatch(actions.addPost(values.postText));
  }

  return (  
    <div className={s.postBlock}>
      <h3>MY POSTS</h3>  
      <ReduxAddPostForm onSubmit={onAddPost}/>    
      <div>
        {postsElements}
      </div>
    </div>  
  )
}


const AddPostForm: React.FC<InjectedFormProps<AddPostPropsType & AddPostValuesType >> = (props) =>{
  return(
    <form >

      {createField<AddPostValuesKeys>("Your Post","postText",[maxLenght],Textarea)}

      <Button onClick={props.handleSubmit} type={'primary'} className={s.submitButton}>Add post</Button>
      
    </form>
  )
}


const ReduxAddPostForm = reduxForm<AddPostValuesType>({form: "addPost"})(AddPostForm)

export default MyPosts


//Types
///AddPostFormTypes
type AddPostPropsType ={
}
type AddPostValuesType ={
  postText: string
}
type AddPostValuesKeys = Extract<keyof AddPostValuesType, string>
