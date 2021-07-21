import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { AppStateType } from '../redux/redux-store'


let mapStateToPropsForRedirect = (state: AppStateType) =>({
  isAuth: state.auth.isAuth
})


function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>)  {

  const RedirectComponent: React.FC< MapPropsType> = (props) => {
    if(!props.isAuth){
      return  <Redirect to='/login' />
    }
    return <WrappedComponent {...props as unknown as WCP }/>   
  }
  
  let ConnectedRedirectComponent = connect<MapPropsType,{},WCP,AppStateType>(
    mapStateToPropsForRedirect)
  (RedirectComponent)

  return ConnectedRedirectComponent
}


export default withAuthRedirect

// Types
type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>
