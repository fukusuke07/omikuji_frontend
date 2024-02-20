import client from "./client"
import { Score } from "interfaces/index"

import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

export const requestFetchScoreApi = async(id:number) => {
  return client
  .get(`scores/${id}`, { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }})
  .then((res) => {

    return {res}
  })
  .catch((error) => {

    return {error}
  })

}

export const requestCreateScoreApi = async(score:Score) => {

  return client.post("scores", score)
  .then((res) => {

    return {res}
  })
  .catch((error) => {

    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    return {error} 
  })
}

export const requestUpdateScoreApi= async(score:Score) => {

  return client.put(`scores/${score.id}`, score, { headers: {
    "access-token": getCookie("_access_token"),
    "client": getCookie("_client"),
    "uid": getCookie("_uid")
  }} )
  .then((res) => {

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