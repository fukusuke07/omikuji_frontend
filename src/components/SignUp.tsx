import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { Observable } from 'rxjs';

import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { createTheme } from '@mui/system';
import AlertMessage from "components/AlertMessage"
import { SignUpData, User, Score } from "interfaces/index"

const defaultTheme = createTheme()
/*const useStyles = makeStyles((theme) => ({
  center:{
    display:"flex",
        flexDirection:"column",
        justifyContent: "space-around",
        padding: "0 0",
        marginLeft:"auto",
        marginRight:"auto",
        width:"500px",
        height:"600px",
  },
  submitBtn: {
    paddingTop: defaultTheme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  attention: {
    textAlign: "center",
    color: "red"
  },
  card: {
    padding: defaultTheme.spacing(2),
    maxWidth: 400,
    marginTop:-60,
    marginLeft:"auto",
    marginRight:"auto",
  },
}))*/

interface OwnProps {
  user: User | null
  score: Score | null
  loading: boolean
  fetchUser: Function
  signUp: Function
}

type Props = OwnProps

// サインアップ用ページ
export default function SignUp(props:Props){
  const histroy = useHistory()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<string[]>()

  const [signUpData, setSignUpData] = useState<SignUpData>()

  const isScoreInvalid = (date: string) => {
    var dd = new Date()
    var YYYY = dd.getFullYear()
    var MM = ('00' + (dd.getMonth() + 1)).slice(-2)
    var DD = ('00' + dd.getDate()).slice(-2);

    var today  = YYYY + "/" + MM + "/" + DD
    return today == date

}

const ReDrawAttention = () => {
  // 認証完了後はサインアウト用のボタンを表示
  // 未認証時は認証用のボタンを表示

  if (props.loading == false && props.score && props.score.drawCount as number > 0) {
      return (
      <div>
        <Typography variant="subtitle1" textAlign= "center" color= "red">※サインアップ後、自動で再計測されます</Typography>
      </div>
      )
    }else{
      return(
        <></>
      )   
    }
}

  useEffect(() => {

    let unmounted = false;

    const f = async () => {
      if(!unmounted && signUpData != undefined){

        if(!props.user){

          await new Promise<{ quote: User | null }>((resolve, reject) => {
            props.signUp({
            delay: 1500,
            signUpData: signUpData,
            promise: { resolve, reject }
          });
        }).then(result => {
          if(props.score && isScoreInvalid(props.score.date)){
            histroy.push("/Measure")
          }else{
            histroy.push("/")
          }
        }).catch(error =>{
          if(error[0] == 'ConnectionError'){
            histroy.push("/Error")
          }else{
            setSignUpData(undefined)
            setErrorMessages(error)
            setAlertMessageOpen(true)
          }
        })
        }
      }
      
  };
  f();
  return ()=>{ unmounted = true; };
 }, [signUpData])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    setSignUpData(data)
  }

  return (
    <>
      <form noValidate autoComplete="off">
      <div style={{
          display:"flex",
          flexDirection:"column",
          justifyContent: "space-around",
          padding: "0 0",
          marginLeft:"auto",
          marginRight:"auto",
          width:"500px",
          height:"600px",
        }}>
        <Card style={{
          padding: defaultTheme.spacing(2),
          maxWidth: 400,
          marginTop:-60,
          marginLeft:"auto",
          marginRight:"auto",
        }}>
          <CardHeader title="サインアップ" sx={{textAlign:"center"}}/>
          <ReDrawAttention/>
          <CardContent>
            <TextField
              aria-label = "name"
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              aria-label = "email"
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              aria-label = "password"
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              aria-label = "passwordConfirmation"
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <div style={{
              paddingTop: defaultTheme.spacing(2),
              textAlign: "right",
              flexGrow: 1,
              textTransform: "none"
            }}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message={errorMessages as string[]}
      />
    </>
  )
}

