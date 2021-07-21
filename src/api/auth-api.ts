import { instance, APIResponseType } from "./api"


export const authAPI = {

  me(){
    return instance.get<APIResponseType<MeDataType>>(`auth/me`).then(res => res.data)
  },


  login(email: string, password: string, rememberMe = false){
    return instance.post<APIResponseType<{userId: number}>>(`auth/login`,{email, password, rememberMe})
    .then(res => res.data)
  },


  logout(){
    return instance.delete(`auth/login`)
  }
}


//Types
type MeDataType ={
  id: number
  email: string
  login: string 
}