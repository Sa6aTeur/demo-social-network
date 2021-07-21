import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/redux-store'
import s from './Post.module.css'
import defaultPhoto from '../../../../assets/img/userImg.jpg'
import Avatar from 'antd/lib/avatar/avatar'
import { Comment, Tooltip } from 'antd'
import moment from 'moment';

const Post: React.FC<PropsType> = (props) => {


  


  let photo = useSelector((state: AppStateType) => state.auth.photos.large)
  let login = useSelector((state: AppStateType) => state.auth.login)

  return (
    <div className={s.item}>
      <Comment
        author={<a style={{color: 'black', fontWeight: 'bold'}}>{login}</a>}
        avatar={
          <Avatar
            src={photo===null? defaultPhoto : photo}
            alt={login===null? ' ' : login }
          />}
          content={
            <p style={{color: 'black'}}>
             {props.message}
            </p>
          }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span style={{color: 'black'}}>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      
    </div>
  )
}

export default Post

////Types
type PropsType = {
  message: string
  likesCount: number
}

