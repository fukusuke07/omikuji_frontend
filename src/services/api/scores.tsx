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
  
    console.log(error)
    return {error}
  })

}

export const requestCreateScoreApi = async(score:Score) => {

  /*var competitionScore = Math.floor(Math.random() * 100);
  var loveScore = Math.floor(Math.random() * 100);
  var moneyScore = Math.floor(Math.random() * 100);
  var totalScore = competitionScore+loveScore+moneyScore;

  console.log(id)
  const score: Score ={
    userId: id,
    totalScore: totalScore,
    drawCount: 0,
    competitionScore: competitionScore,
    loveScore: loveScore,
    moneyScore: moneyScore,
    date: ""
  }*/

  console.log("createscore")
  console.log(score)

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

/*const CreateResponseScoreData = (data: any) =>{

  console.log(data)
  console.log(data.score.id)
  const score: Score ={
    id: data.score.id,
    userId: data.score.userId,
    totalScore: data.score.totalScore,
    drawCount: data.score.drawCount + 1,
    competitionScore: data.score.competitionScore,
    loveScore: data.score.loveScore,
    moneyScore: data.score.moneyScore,
    population: data.population,
    ranking: data.ranking,
    date: data.date
  }

  const response: ApiResponseScoreData = {
    score:score,
    status: data.status
  }

  console.log(response)

  console.log("sss")

  return response

}*/

 