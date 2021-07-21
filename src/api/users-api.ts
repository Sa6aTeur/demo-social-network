import { FilterType } from "../redux/users-reduser";
import { UserType } from "./../types/types"
import { instance, GetItemsType, APIResponseType } from "./api"


export const usersAPI = {

  getUsers(currentPage= 1, pageSize= 3 , filter: FilterType ){
    return instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}` + 
     (filter.term===null ? '' : `&friend=${filter.friend}`)).then(res => res.data);
  },


  follow(userId: number){
    return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
  },


  unfollow(userId: number){
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
  },

}

