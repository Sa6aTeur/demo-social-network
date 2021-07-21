import { APIResponseType, ResultCodesEnum } from './../api/api';
import { UserType } from './../types/types';
import usersReducer, { actions, follow, InitialStateType, unfollow } from './users-reduser'
import { usersAPI } from '../api/users-api';


jest.mock("../api/users-api")
const result: APIResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success
}
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
userAPIMock.follow.mockReturnValue(Promise.resolve(result)) 


let state: InitialStateType 

beforeEach(()=>{
  state = {
    users: [
      {id: 0, name:'Danya1', followed: false, photos: {small: null, large: null}, status: "status1"},
      {id: 1, name:'Danya2', followed: false, photos: {small: null, large: null}, status: "status2"},
      {id: 2, name:'Danya3', followed: true, photos: {small: null, large: null}, status: "status3"},
      {id: 3, name:'Danya4', followed: true, photos: {small: null, large: null}, status: "status4"}
    ] as Array<UserType>,
    totalUsersCount: 30,
    pageSize: 4,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
  }
})



test("follow thunk should be success", async () => {

 const thunk = follow(2)
////Mock
 const dispatchMock = jest.fn()
 const getStateMock = jest.fn()

 await thunk(dispatchMock,getStateMock,{})

//////expects
 expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true,2))
 expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.followSuccess(2))
 expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(false,2))
})


test("unfollow thunk should be success", async () => {
  
  const thunk = unfollow(4)
 ////Mock
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()
 
  await thunk(dispatchMock,getStateMock,{})
 
 //////expects
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true,4))
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.unfollowSuccess(4))
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(false,4))
 })