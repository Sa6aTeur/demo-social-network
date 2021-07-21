import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodesEnum } from '../api/api';
import { stopSubmit } from "redux-form";
import { authAPI } from '../api/auth-api';
import { Redirect } from 'react-router';
import { profileAPI } from '../api/profile-api';
import { PhotosType } from '../types/types';



let initialState = {
  isFetching: false,
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  photos: {} as PhotosType
  }   

const authReducer = (state = initialState, action: ActionsType): InitialStateType  => {
  
  switch(action.type){
    case 'SN/AUTH/SET_AUTH_USER':
      return{
        ...state,
        ...action.payload,
            
      }

    case 'SN/AUTH/SET_AUTH_USER_PHOTO':
      return{
        ...state,
        photos: action.payload.photos
            
      }

    default:
      return state; 
    }
}
  

// ACTIONS CREATORS
export const actions = {
  setAuthUserData: (userId: number|null,email: string|null,login: string|null,isAuth: boolean) => (
    {type: 'SN/AUTH/SET_AUTH_USER',
     payload:{userId,email,login, isAuth}} as const),

  setAuthUserPhoto: (photos: PhotosType) => (
    {
    type: 'SN/AUTH/SET_AUTH_USER_PHOTO',
    payload:{photos}} as const) 
}


// THUNKS CREATORS
export const getAuthUserData = (): ThunkType => async (dispatch) =>{
  let response = await authAPI.me()
  if(response.resultCode === ResultCodesEnum.Success){   
     
    let{id,login,email} = response.data;
    let isAuth = true;
    dispatch(actions.setAuthUserData(id,email,login,isAuth)); 

    let userPhoto = (await profileAPI.getProfile(id)).photos
    dispatch(actions.setAuthUserPhoto(userPhoto))
  }    
  
}


export const login = (email: string,password: string,rememberMe: boolean): ThunkType => async (dispatch) =>{  
  let response = await authAPI.login(email,password,rememberMe)

  if(response.resultCode === ResultCodesEnum.Success){    
    dispatch(getAuthUserData())       
  }else {
    let message = response.messages.length > 0 ? response.messages[0] 
                                                    : "Some error"
    dispatch(stopSubmit("login",{_error: message}))  
  }

}


export const logout = (): ThunkType => async (dispatch: any) =>{
  let response = await authAPI.logout()
    
  if(response.data.resultCode === ResultCodesEnum.Success){    
    let isAuth = false;
    dispatch(actions.setAuthUserData(null,null,null,isAuth));    
  }
}

export default authReducer;

//Types
export type InitialStateType =  typeof initialState 
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>