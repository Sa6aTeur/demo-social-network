import React, { useEffect } from 'react'
import Preloader from '../Common/Preloader/Preloader';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsers, getUsersFilter, getFollowingInProgress, getIsFetching } from '../../redux/users-selectors';
import { useSelector,useDispatch } from 'react-redux';
import { requestUsers,FilterType,follow,unfollow } from '../../redux/users-reduser';
import { useHistory } from 'react-router';
import * as  queryString  from 'querystring';

export const Users: React.FC = (props) => {
  
  ////UseSelectors
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  

  const dispatch = useDispatch()
  const history = useHistory()


  ////CallBack
  const onCurrentPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }


  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1,pageSize, filter))
  }

  ////

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1))

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = {...actualFilter , term: parsed.term as string }

    switch(parsed.friend){
      case "null": 
        actualFilter = {...actualFilter , friend: null}
        break
      case "true": 
        actualFilter = {...actualFilter , friend: true}
        break
      case "false": 
        actualFilter = {...actualFilter , friend: false}
        break  
    }

    dispatch(requestUsers(actualPage,pageSize, actualFilter))

  }, [])


  useEffect(() => {

    const query: QueryParamsType = {}
    if(!!filter.term) query.term = filter.term
    if(filter.friend !== null) query.friend = String(filter.friend)
    if(currentPage !== 1) query.page =  String(currentPage) 

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)   
    })
  }, [filter,currentPage])

  
  return (  
      <div>

      <div>{isFetching ? <Preloader/> : null} </div>
      
      <UsersSearchForm onFilterChanged={onFilterChanged}  />

      {
        users.map(u => <User user={u} key={u.id} />)
      }
      <div style={{paddingTop: '10px', textAlign: 'center'}}>
        <Paginator currentPage={currentPage} 
                   onCurrentPageChanged={onCurrentPageChanged} 
                   totalItemsCount={totalUsersCount} 
                   pageSize={pageSize} />
      </div>
      
    </div>  
  )
}


////Types 

type QueryParamsType = {term?: string, page?: string, friend?: string}