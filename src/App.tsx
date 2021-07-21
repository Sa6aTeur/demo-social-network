import { Route, withRouter } from 'react-router';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Link} from "react-router-dom";
import {Users} from './components/Users/Users';
import ProfileContainer from './components/Profile/ProfileContainer';
import {LoginPage} from './components/Login/Login';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { compose } from 'redux';
import store, { AppStateType } from './redux/redux-store';
import { Col, Layout, Menu} from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { AppHeader } from './components/Header/Header';
import Profile from './components/Profile/Profile';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))


class App extends React.Component<StatePropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e :PromiseRejectionEvent) => {
    
  }


  componentDidMount(){
    this.props.initializeApp(); 
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }


  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }


  render(){

    if(!this.props.initialazed){
      return <Preloader/>
    }
    
   
    return (
             
      <BrowserRouter >
         <Layout >
         <AppHeader/>
          <Content style={{ padding: '0 50px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                      <Menu.Item key="1"><Link to={"/profile"} >Profile</Link></Menu.Item>
                      {/* <Menu.Item key="2"><Link to={"/dialogs"} >Dialogs</Link></Menu.Item>             */}
                  </SubMenu>

                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Community">
                      <Menu.Item key="3"><Link to={"/users"} >Users</Link></Menu.Item>
                      <Menu.Item key="4"><Link to={"/chat"} >Group Chat</Link></Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>

                {/* <Route path="/dialogs" render={ () =>  <React.Suspense fallback={<div>Loading...</div>}>
                Component for testing React.lazy ->  <Dialogs />      
                                                       </React.Suspense> }/>   */}
                                                
                <Route path="/chat" render={ () =>  <React.Suspense fallback={<div>Loading...</div>}>
                {/* Component for testing React.lazy ->*/}  <ChatPage/>      
                                                       </React.Suspense> }/> 
                                                       
                <Route path="/profile/:userId?" render={ () => <ProfileContainer />}/>

                <Route path="/users" render={ () => <Users/>}/>

                <Route path="/login" render={ () => <LoginPage/>}/>
                
                {/* <Route path="*" render={ () => <div> 404 NOT FOUND</div>}/> */}

              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by SaBaTeuR</Footer>
        </Layout>,
      </BrowserRouter>
          
    );
  }
  
}



const mapStateToProps = (state: AppStateType) => ({
  initialazed: state.app.initialazed
})


let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps,{initializeApp})
  )(App)

const MainApp: React.FC = () =>{
  return (
    <BrowserRouter>
      <Provider store={store}>
                <AppContainer />
              </Provider> 
    </BrowserRouter>
  )           
}

export default MainApp;

//Types
type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
