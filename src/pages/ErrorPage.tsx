import { useEffect } from 'react'

import { useHistory } from 'react-router-dom';

import { Box,Typography } from '@mui/material';

import { from } from 'rxjs';

import Washi from 'assets/images/japanese-paper_00372.png'

  interface OwnProps {
    clearState: Function
  
  }
  
  type Props = OwnProps
  
  export default function ErrorPage(props:Props){

    return (
        <>
        <Box style={{
          marginLeft:"auto",
          marginRight:"auto",
          width:"75%",
          minWidth:"348px",
          minHeight:"100vh",
          backgroundImage:`url(${Washi})`
        }}>
        <Box style={{
          marginLeft:"auto",
          marginRight:"auto",
          display:"flex",
          flexDirection:"column",
          width:"80%",
          minWidth:"320px"
        }}>
        <Typography style={{
          marginTop:"30px",
          marginLeft:"auto",
          marginRight:"auto",
          textAlign: "center",
        }}>
          エラーが発生しました
        </Typography>
        </Box>
        </Box>
        </>
          
  );

  }
