
export type PostType = {
  id: number
  message: string
  likesCount: number
} 
export type PhotosType = {
 small: string|null
 large: string|null
}
export type ContactsType = {
  github: null|string
  vk: null|string
  facebook: null|string
  instagram: null|string
  twitter: null|string
  website: null|string
  youtube: null|string
  mainLink: null|string
}
export type ProfileType ={
  userId: number|null
  lookingForAJob: null|string
  lookingForAJobDescription: null|string
  aboutMe?: null|string
  fullName: null|string
  contacts: ContactsType
  photos: PhotosType
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}