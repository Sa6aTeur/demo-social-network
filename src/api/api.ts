import axios from "axios";


export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY" : "714b8137-f2f2-4250-bf46-908d801783b7"
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}


export type GetItemsType<T> ={
  items: Array<T>
  totalCount: number
  error?: string
}


export type APIResponseType< D = {}, RC = ResultCodesEnum > = {
  data: D
  messages: Array<string>
  resultCode: RC
}