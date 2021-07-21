import { APIResponseType } from './../api/api';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { UserType } from './../types/types';
import { updateObjectInArray } from '../utils/object-helpers'
import { Dispatch } from 'redux';
import { usersAPI } from '../api/users-api';


let initialState = {
users: [] as Array<UserType>,
totalUsersCount: 30,
pageSize: 4,
currentPage: 1,
isFetching: true,
followingInProgress: [] as Array<number>, //Array of users id,
filter: {
  term: '',
  friend: null as null|boolean
}
}


const usersReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch(action.type){
    case 'SN/USERS/FOLLOW': 
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id" , {followed: true})   
      }
      
    case 'SN/USERS/UNFOLLOW': 
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id" , {followed: false})
      }

    case 'SN/USERS/SET_USERS': 
    return {...state, users: action.users}

    case 'SN/USERS/SET_CURRENT_PAGE': 
    return {...state, currentPage: action.currentPage}

    case 'SN/USERS/SET_FILTER': 
    return {...state, filter: action.payload}
    
    case 'SN/USERS/SET_TOTAL_COUNT': 
    return {...state, totalUsersCount: action.totalCount}

    case 'SN/USERS/TOGGLE_IS_FETCHING': 
    return {...state, isFetching: action.isFetching}

    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': 
    return {...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId ] 
                                                             : state.followingInProgress.filter(id => id !== action.userId )}
    default:
      return state; 
    }
}


//ACTIONS
export const actions = {

  followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId} as const),
 
  unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),

  setUsers: (users: Array<UserType>) => ({type:  'SN/USERS/SET_USERS', users} as const),

  setCurrentPage: (pageNumber: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage: pageNumber} as const),

  setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),

  setTotalCount: (totalCount: number) => ({type: 'SN/USERS/SET_TOTAL_COUNT', totalCount} as const),

  toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),

  toggleFollowingProgress: (isFetching: boolean,userId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',  isFetching,  userId} as const),

}


///THUNKS CREATORS
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch) =>{
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));

    let data = await usersAPI.getUsers(currentPage,pageSize,filter)  

    dispatch(actions.toggleIsFetching(false));  
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalCount(data.totalCount))
  }
} 


const _followUnfollowFlow = async (dispatch: DispatchType, 
                                   userId: number, 
                                   apiMethod: (userId: number) => Promise<APIResponseType>, 
                                   actionCreator: (userId: number)=> ActionsTypes ) =>{
  debugger                                  
  dispatch(actions.toggleFollowingProgress(true,userId));
  let response = await apiMethod(userId)

  if(response.resultCode===0){
    dispatch(actionCreator(userId))
  } 
  dispatch(actions.toggleFollowingProgress(false,userId));
}


export const follow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType) =>{
    await _followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),actions.followSuccess)  
  }
} 


export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType) =>{
    await _followUnfollowFlow(dispatch,userId,usersAPI.unfollow.bind(usersAPI),actions.unfollowSuccess)  
  }
}


export default usersReducer;


//Types 
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>