import React from 'react';
import { useState, useEffect } from 'react'

import { fontTheme } from '../assets/Themes/FontTheme';
import { useHistory, Link } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';

import { User } from "interfaces/index"

import { styled } from '@mui/material/styles';

interface OwnProps {
  loading: boolean
  user: User | null
  signOut: Function
}

export type Props = OwnProps

export default function ButtonAppBar(props:Props) {
  const history = useHistory();
  const [execSignOut, setExecSignOut] = useState<number>(0)

  useEffect(() => {

    let unmounted = false;
    
    const f = async () => {
      if(!unmounted && execSignOut >0){

       await new Promise((resolve, reject) => {
        props.signOut({
        promise: { resolve, reject }
      });
    }).then(result => {
      history.push("/")
    }).catch(error =>{
      history.push("/")
    })

      }
      return ()=>{ unmounted = true; };
  };
  f();
 }, [execSignOut])

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {

    history.push("/Mypage")
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {

    history.push("/signin")
  }

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {

    history.push("/signup")
  }

  const handleReturnHome =()=>{
    history.push("/")
  }
  const AuthButtons = () => {
 
    if (props.loading == false) {
      if (props.user) {
        return (
        <div>
          <Button
            color="inherit"
            text-transform= "none"
            onClick={handleSignOut}
          >
            マイページ
          </Button>
        </div>
        )
      } else {
        return (
          <div >
            <Button
              color="inherit"
              text-transform= "none"
              onClick={handleSignIn}
            >
              サインイン
            </Button>
            <Button
              color="inherit"
              text-transform= "none"
              onClick={handleSignUp}
            >
              サインアップ
            </Button>
          </div>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={fontTheme}>
        <AppBar position="static" sx={{ color: "#e0f2f1", backgroundColor: "#AF011C" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button  onClick={handleReturnHome} sx={{ 
                color: "#e0f2f1",
                backgroundColor: "#AF011C",
                textAlign:"left",
                fontSize:'36px',
                width:"200px",
                height:"60px",
              }}>運勢闘技場
            </Button>
          </Typography>
          
          <AuthButtons />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}