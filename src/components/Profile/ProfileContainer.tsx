import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus,savePhoto,saveProfile, actions} from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';


class ProfileContainer extends React.Component<PropsType> {
  
  refreshProfile(){
    let userId: number | null = +this.props.match.params.userId;
    if(!userId && this.props.isAuth){

      userId= this.props.myId;
      if(!userId){
        this.props.history.push("/login")
      }
    }
    if(userId){
      
      this.props.getUserProfile(userId)
      this.props.getUserStatus(userId)
    }
  }

  componentDidMount(){ 
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType){
    if(this.props.match.params.userId != prevProps.match.params.userId){
      this.refreshProfile()
    }   
  }

  render() {
    return (
      <Profile isOwner={!this.props.match.params.userId} />
    )
  }
}

let mapStateToProps = (state: AppStateType) =>({
  profile: state.profilePage.profile,
  myId: state.auth.userId,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth
});


export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile,getUserStatus,updateUserStatus,savePhoto,saveProfile, ...actions}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

////Types
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => void
}
//WithRouterType
type PathParamsType = {
  userId: string
}
type RouterPropsType = RouteComponentProps<PathParamsType>
///
type PropsType = MapPropsType & DispatchPropsType & RouterPropsType