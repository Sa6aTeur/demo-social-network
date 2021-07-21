import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from'./header.module.css'
import { Redirect } from 'react-router';
import { Button, Col,  Menu, Row} from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {logout} from '../../redux/auth-reducer';
import defaultUserImg from '../../assets/img/userImg.jpg'
import { getUserProfile } from '../../redux/profile-reducer';


export const AppHeader: React.FC = (props) => {
 
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const login = useSelector((state: AppStateType) => state.auth.login)
  let photo = useSelector((state: AppStateType) => state.auth.photos.large)


  const dispatch = useDispatch()

  const onLogoutClick = () => {
    debugger
    dispatch(logout());
    <Redirect to="/login"/>
  }

  return ( 
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {/* <Menu.Item key="1"><Link to={"/users"} >Users</Link></Menu.Item>                 */}
          </Menu>
        </Col>
         
        <Col span={4}>
          <div className={s.loginBlock}>
            {isAuth ? <div> 
                      <Avatar style={{ backgroundColor: '#87d068', marginRight: 3 }} src={photo || defaultUserImg}  /> 
                      <strong>{login}</strong>
                      <Button type="primary" onClick={onLogoutClick} >Logout</Button>
                      </div>
              : <Button type="primary" onClick={onLogoutClick} ><Link to={'/login'}>LOGIN</Link></Button>}    
          </div>
        </Col>      

      </Row>
    </Header>
  )
}


////Types
export type MapPropsType = {
  isAuth: boolean
  login: string | null
}

export type DispatchrPropsType = {
  logout: () => void
}