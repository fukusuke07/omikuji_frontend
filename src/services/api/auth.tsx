import client from "./client"
import { User, ApiResponseUserData } from "#/interfaces/index"
import { AxiosResponse } from "axios"
import { getCookie, setCookie, removeCookie } from "typescript-cookie"

import { SignUpData, SignInData, UpdateUserFormData } from "interfaces/index"


import user from "./user.json";

type USER = typeof user

export const getCurrentUser = async() => {

  return client.get("users", { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }})
  .then((res) => {

    return  {res}
  })
  .catch((error) => {

    return  {error} 
  })
}

// サインイン（ログイン）
export const signInApi = async(data: SignInData)  => {
  return client.post("auth/sign_in", data)
  .then((res) => {
    setCookie("_access_token", res.headers["access-token"])
    setCookie("_client", res.headers["client"] as string)
    setCookie("_uid", res.headers["uid"] as string)
    return  { res }
  })
  .catch((error) => {
    console.log(error)
    return { error } 
  })
}

// サインアップ（新規アカウント作成）
export const signUpApi = async(data: SignUpData) => {
  return client.post("auth", data)
  .then((res) => {
    setCookie("_access_token", res.headers["access-token"])
    setCookie("_client", res.headers["client"] as string)
    setCookie("_uid", res.headers["uid"] as string)
    return {res}
  })
  .catch((error) => {
    return {error} 
  })
}

// サインアウト（ログアウト）
export const signOutApi = async() => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }})
  .then((res) => {
    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    return {res}
  })
  .catch((error) => {
    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    return  {error} 
  })
}

export const updateUserApi = async(data:UpdateUserFormData) => {
  return client.patch("auth", data, { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }})
  .then((res) => {
    setCookie("_access_token", res.headers["access-token"])
    setCookie("_client", res.headers["client"] as string)
    setCookie("_uid", res.headers["uid"] as string)
    return {res}
  })
  .catch((error) => {
    return  {error} 
  })
}

export const deleteUserApi = async() => {
  return client.delete("auth", { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }})
  .then((res) => {
    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    return {res}
  })
  .catch((error) => {
    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    return  {error} 
  })
}

// 認証済みのユーザーを取得

/*const CreateResponseUserData = (res: any) =>{

  console.log(res)
  const user: User ={
    id: res.data.user.id,
    uid: res.data.user.uid,
    provider: res.data.user.provider,
    email: res.data.user.email,
    name: res.data.user.name,
    allowPasswordChange: false
  }

  const response: ApiResponseUserData ={
    user:user,
    status: res.data.status
  }

  return response
}*/