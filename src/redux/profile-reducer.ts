import {  getAuthUserData } from './auth-reducer';
import { profileAPI } from '../api/profile-api';
import { PostType, ProfileType, PhotosType } from './../types/types';
import { InferActionsTypes, BaseThunkType } from './redux-store';


let initialState = {
  posts: [] as Array<PostType>,   
  profile: null as ProfileType|null ,
  status: "",
  newPostText: ''
} 


const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
  switch(action.type){
    case 'SN/PROFILE/ADD_POST': 
      let newPost={
        id: 5,
        message: action.postText,
        likesCount: 0
        }
        return  {
          ...state,
          posts: [...state.posts, newPost],
        }

    case 'SN/PROFILE/SET_USER_PROFILE': 
      return {
        ...state,
        profile: action.profile,
      }
    case 'SN/PROFILE/SET_USER_STATUS': 
      return {
        ...state,
        status: action.status,
      }
   
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': 
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType,
      }
    case 'SN/PROFILE/SAVE_PROFILE_SUCCESS': 
      return {
        ...state,
        profile: {...state.profile, ...action.profile},
      }
    default:
      return state; 
    }
}


///////Actions
export const actions = {
  addPost: (postText: string) => ({
      type: 'SN/PROFILE/ADD_POST',
      postText
  } as const),

  setUserProfile: (profile: ProfileType) => ({
    type : 'SN/PROFILE/SET_USER_PROFILE',
    profile
  } as const),

  setUserStatus: (status: string) => ({
    type : 'SN/PROFILE/SET_USER_STATUS',
    status
  } as const),

  savePhotoSuccess: (photos: PhotosType) => ({
    type : 'SN/PROFILE/SAVE_PHOTO_SUCCESS',
    photos
  } as const),

  saveProfileSuccess: (profile: ProfileType) => ({
    type : 'SN/PROFILE/SAVE_PROFILE_SUCCESS',
    profile
  } as const),
  
}


///Thunks
export const getUserProfile = (userId: number):ThunkType => async (dispatch) =>{
  let data = await profileAPI.getProfile(userId)

  dispatch(actions.setUserProfile(data))    
}
 

export const getUserStatus = (userId: number):ThunkType => async (dispatch) =>{
  let data = await profileAPI.getStatus(userId)
  dispatch(actions.setUserStatus(data))    
}


export const updateUserStatus = (status: string):ThunkType => async (dispatch) =>{
  let data = await profileAPI.updateStatus(status)
  
  if(data.resultCode === 0) {
    dispatch(actions.setUserStatus(status))  
  }  
}


export const savePhoto = (file: File):ThunkType => async (dispatch,getState) =>{
  let data = await profileAPI.savePhoto(file)
  let userId = getState().auth.userId

  if(data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data))
    dispatch(getAuthUserData())

    if(userId != null){
      dispatch(getUserProfile(userId)) 
    }else {
      throw new Error("userId can be null")
    }  
  }  
}


export const saveProfile = (profile :ProfileType):ThunkType => async (dispatch, getState) =>{
  let data = await profileAPI.saveProfile(profile)
  let userId = getState().auth.userId

  if(data.resultCode === 0) {
    if(userId != null){
      dispatch(getUserProfile(userId)) 
    }else {
      throw new Error("userId can be null")
    }
  }  
}

export default profileReducer;


//Types
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType>
type ActionsType = InferActionsTypes<typeof actions>