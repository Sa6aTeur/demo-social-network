import { UserType } from './../types/types';
import usersReducer, { actions, InitialStateType } from './users-reduser'


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



test("follow success", () => {

  ///// userReducer
  const newState = usersReducer(state, actions.followSuccess(2))

  //////expect
  expect(newState.users[1].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeTruthy()
})


test("unfollow success", () => {

  ///// userReducer
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  //////expect
  expect(newState.users[3].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeTruthy()
})