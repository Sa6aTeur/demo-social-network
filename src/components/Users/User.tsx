import React from 'react'
import s from './user.module.css'
import userImg from '../../assets/img/userImg.jpg'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching } from '../../redux/users-selectors';
import { follow, unfollow } from '../../redux/users-reduser';
import Avatar from 'antd/lib/avatar/avatar';



export const User: React.FC<PropsType> =({user}) => {
  
  const isFetching = useSelector(getIsFetching)
  const followingInProgress = useSelector(getFollowingInProgress)
  const dispatch = useDispatch()
  
  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }


  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (   
      <div key ={user.id} className={s.mainWrap}  >
        <Row>
           <Col className={s.avatarWrap} >
              <div>
                <NavLink to={'/profile/' + user.id}>
                  <Avatar className={s.avatar} shape="square" size={80} src={user.photos.small != null ? user.photos.small : userImg}  />  
                </NavLink>       
              </div>
              
              {user.followed 
                ? isFetching ||            
                  <Button className={s.button} 
                          loading={followingInProgress.some(id=>id===user.id)} 
                          size={'small'} type={'primary'} 
                          disabled={followingInProgress.some(id=>id===user.id)} 
                          onClick={() =>{onUnfollow(user.id) }}>UNFOLLOW</Button>

                : isFetching || 
                  <Button className={s.button} 
                          loading={followingInProgress.some(id=>id===user.id)} 
                          size={'small'} type={'primary'} 
                          disabled={followingInProgress.some(id=>id===user.id)} 
                          onClick={() =>{onFollow(user.id)}}>FOLLOW</Button>
              }
           </Col>

           <Col>
            <NavLink to={'/profile/' + user.id}>
              <div><p className={s.name}> {user.name} </p></div>
              <p className={s.status} style={{fontWeight: 'bold', color: 'gray'}}>{user.status}</p>
            </NavLink>

           </Col>

        </Row>   
              
      </div>
  )
}

export default User

//Types
type PropsType = {
  user: UserType,
}

