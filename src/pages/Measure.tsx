import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom';

import { from } from 'rxjs';

import { Box,Typography, CardMedia } from '@mui/material';

import { CenterWashi } from "../components/CenterWashi"
import { CenterBox } from "../components/CenterBox"

import Miko from 'assets/images/jinja_miko.png';
import Fukusuke from 'assets/images/fukusukeningyou.png';
import Binbougami from 'assets/images/youkai_binbougami.png';

import Washi from 'assets/images/japanese-paper_00372.png'

import { User, Score } from "interfaces/index"
import Avatar from '@mui/material/Avatar';

interface OwnProps {
  score: Score | null 
  user: User | null
  createScore: Function 
  updateScore: Function

}

type Props = OwnProps

  export default function Measure(props:Props)
 {
    const history = useHistory();

    const [userDetailOpen, setUserDetailOpen] = useState<boolean>(false)
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
    const [loadingImg, setLoadingImg] = useState<string>("")

    const GetLoadingImg = () =>{
      var random = Math.floor(Math.random() * 3)

      var buf;

      if(random < 1){
        buf = Miko;
      }else if(random < 2){
        buf = Fukusuke;
      }else {
        buf = Binbougami;
      }

      setLoadingImg(buf)

    }

    useEffect(() => {

      let unmounted = false;

      var timeout:NodeJS.Timeout

      const f = async () => {

          GetLoadingImg()
          const subscription = from(
              new Promise(resolve => {
              timeout = setTimeout(() => {
              resolve("")
          }, 3000)
          }).then(()=>{
            console.log("caliculate")
            if(!props.score){
              new Promise<{ quote: Score | null }>((resolve, reject) => {
                props.createScore({
                delay: 1500,
                promise: { resolve, reject }
              })
            }).then(result => {
              history.push("/Result")
            }).catch(error =>{
              history.push("/Error");
            })
            }else{
              new Promise<{ quote: Score | null }>((resolve, reject) => {
                props.updateScore({
                delay: 1500,
                promise: { resolve, reject }
              });
            }).then(result => {
              history.push("/Result")
            }).catch(error =>{
              history.push("/Error");
            })
            }
          })
          ).subscribe()
    };
    f();
    return ()=>{ 
      unmounted = true
      clearTimeout(timeout)
    };
   }, [])

    return (
      <CenterWashi>
      <CenterBox marginTop= "40px" >
      <Typography style={{
        fontFamily:'Kouzan',
        fontSize:'42px',
      }}>
        今日の運勢は…
        </Typography>
        </CenterBox>
        <CenterBox marginTop= "60px" >
        <Box component="img" src={loadingImg} alt="omikuji" sx={{
          width:"200px" ,
          display: "block",
          marginLeft:"auto",
          marginRight:"auto",
          animation: "spin 3s linear infinite",
          "@keyframes spin": {
          "0%": {
            transform: "rotate(360deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      }}>
        </Box>
        </CenterBox>
        </CenterWashi>

);
  }