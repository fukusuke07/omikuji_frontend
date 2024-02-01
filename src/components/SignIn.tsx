import React, { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"

import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { createTheme } from '@mui/system';
import AlertMessage from "../components/AlertMessage"

import { SignInData, User, Score } from "../interfaces/index"

const defaultTheme = createTheme()

interface OwnProps {
  user: User | null,
  score: Score | null,
  loading: boolean
  fetchUser: Function
  fetchScore: Function
  signIn: Function
}

type Props = OwnProps

// サインイン用ページ
export default function SignIn(props:Props) {
  const history = useHistory()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessages, setErrorMessages] = useState<string[]>()
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const [signInData, setSignInData] = useState<SignInData>()

  const isScoreInvalid = (date: string) => {
    var dd = new Date()
    var YYYY = dd.getFullYear()
    var MM = ('00' + (dd.getMonth() + 1)).slice(-2)
    var DD = ('00' + dd.getDate()).slice(-2);

    var today  = YYYY + "/" + MM + "/" + DD

    return today == date

}

const ReDrawAttention = () => {

  if (props.loading == false && props.score && props.score.drawCount as number > 0) {
      return (
      <div>
        <Typography variant="subtitle1" textAlign= "center" color= "red">※サインイン後、自動で再計測されます</Typography>
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

    console.log(signInData)
    
    const f = async () => {
      if(!unmounted && signInData != undefined){

        if(!props.user){
          setSignInData(undefined)
          await new Promise<{ quote: User | null }>((resolve, reject) => {
              props.signIn({
              delay: 100,
              signInData: signInData,
              promise: { resolve, reject }
            });
          }).catch(error =>{
            console.log(error[0])
            if(error[0] == 'ConnectionError'){
              history.push("/Error")
            }else{
              setSignInData(undefined)
              setErrorMessages(error)
              setAlertMessageOpen(true)
            }
            
          })

        }

        if(props.user){

          await new Promise((resolve, reject) => {
            props.fetchScore({
            delay: 1500,
            promise: { resolve, reject }
          });
          }).then(result => {
            
            if(props.score && isScoreInvalid(props.score.date)){
              history.push("/Measure")
            }else{
              history.push("/")
            }
          }).catch(error => {
            history.push("/Error");
          })

        }

      }
      
  };
  f();
  return ()=>{ unmounted = true; };
 }, [signInData])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignInData = {
      email: email,
      password: password
    }

    setSignInData(data)
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
          <CardHeader title="サインイン" sx={{textAlign:"center"}}/>
          <ReDrawAttention />
          <CardContent>
            <TextField
              aria-label = "email"
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              type="email"
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
              placeholder="6文字以上"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Box style={{
              paddingTop: defaultTheme.spacing(2),
              textAlign: "right",
              flexGrow: 1,
              textTransform: "none"
            }} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!email || !password ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </Box>
            <Box textAlign="center" paddingTop="2rem">
              <Typography variant="body2">
                まだアカウントをお持ちでない方は
                <Link to="/signup" style={{
                  textDecoration: "none"
                  }}>
                  こちら
                </Link>
                 から作成してください。
              </Typography>
            </Box>
          </CardContent>
        </Card>
        </div>
        <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message={errorMessages as string[]}
      />
      </form>
      
    </>
  )
}
