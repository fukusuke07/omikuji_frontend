import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom';

import { fontTheme } from '../assets/Themes/FontTheme';
import { createTheme } from "@mui/material/";

import Button from "@mui/material/Button"

import Daikichi from 'assets/images/omikuji_daikichi.png';
import Kichi from 'assets/images/omikuji_kichi.png';
import Chukichi from 'assets/images/omikuji_chuukichi.png';
import Syokichi from 'assets/images/omikuji_syoukichi.png';
import Suekichi from 'assets/images/omikuji_suekichi.png';
import Kyou from 'assets/images/omikuji_kyou.png';
import Daikyou from 'assets/images/omikuji_daikyou.png';

import { CenterWashi } from "../components/CenterWashi"
import { CenterBox } from "../components/CenterBox"
import { CenterList } from "../components/CenterList";

import { Score, User } from "interfaces/index"

import { Box, Typography, ThemeProvider } from '@mui/material';

interface OwnProps {
  score: Score | null ,
  user: User | null,
  loading: boolean

}

type Props = OwnProps

  export default function Show(props:Props)
 {
    const [OmikujiResult, setResult] = useState("");

    const history = useHistory();

    const onClickBeforeSignIn = () =>{

      if(!props.score){
        history.push("/");
      }else{
        history.push("/signin");
      }

    }

    const onClickAfterSignIn = () =>{

      if(!props.score){
        history.push("/");
      }else{
        history.push("/Measure");
      }

    }

    const ReDrawButtons = () => {
   
      if (props.loading == false && props.score && props.score.drawCount as number < 2) {
        if (props.user) {
          return (
          <div>
            <Button 
              aria-label='after_signin_button'
              onClick={onClickAfterSignIn}
              sx={{
                display: "inline-block",
                textDecoration: "none",
                borderRadius: "4px",
                color: "#ffffff",
                backgroundImage: "linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%)",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                borderBottom: "solid 3px #c58668",
              
                fontSize: "30px",
        
                "&:hover": {
                    webkitTransform: "translateY(4px)",
                    transform: "translateY(4px)",
                    boxShadow:" 0px 0px 1px rgba(0, 0, 0, 0.2)",
                    borderBottom: "none",
                }
              }} >
                一度だけ引き直す
            </Button>
          </div>
          )
        } else {
          return (
            <div>
              <Button
                aria-label='before_signin_button'
                onClick={onClickBeforeSignIn}
                sx={{
                  display: "inline-block",
                  textDecoration: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                  backgroundImage: "linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%)",
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                  borderBottom: "solid 3px #c58668",
                
                  fontSize: "30px",
          
                  "&:hover": {
                      webkitTransform: "translateY(4px)",
                      transform: "translateY(4px)",
                      boxShadow:" 0px 0px 1px rgba(0, 0, 0, 0.2)",
                      borderBottom: "none",
                  }
                }} >
                  ログインして引き直す
              </Button>
            </div>
          )
        }
      } else {
        return <></>
      }
    }

    //データ取得し、なかったらHome

    const GetOmikujiImg = () =>{
      props.score?.totalScore as number;

      var buf;

      if(props.score?.totalScore as number < 40){
        buf = Daikyou;
      }else if(props.score?.totalScore as number < 80){
        buf = Kyou;
      }else if(props.score?.totalScore as number < 120){
        buf = Suekichi;
      }else if(props.score?.totalScore as number < 160){
        buf = Syokichi;
      }else if(props.score?.totalScore as number < 200){
        buf = Chukichi;
      }else if(props.score?.totalScore as number < 240){
        buf = Kichi;
      }else{
        buf = Daikichi;
      }

      setResult(buf)

    }

    useEffect(() => {
      GetOmikujiImg()
    }, )

    useEffect(() => {
      GetOmikujiImg()
    }, )

    const GetResultText = (num:number)=>{

      var text:string = ""

      if(num<21){
        text = "うーん..."
      }else if(num<41){
        text = "いまいち"
      }else if(num<61){
        text = "まあまあ"
      }else if(num<81){
        text = "いい感じ"
      }else{
        text = "さいこー！"
      }

      return text

    }

    return (
        <CenterWashi>
          <ThemeProvider theme={fontTheme}>
          <CenterBox>
            <Typography fontSize='42px'>今日の運勢は…</Typography>
          </CenterBox>
          <CenterBox marginTop= "20px">
            <img src={OmikujiResult} height="500px" style={{display: "block", marginLeft:"auto", marginRight:"auto"}}/>
          </CenterBox>
          <CenterList marginTop= "30px">
            <Box display="flex" flexDirection="column" marginTop= "10px">
              <Box display="flex" flexDirection="row" justifyContent= "space-between">
                <Typography textAlign="left" fontSize='36px'>・勝負運</Typography>
                <Typography textAlign="right" fontSize='36px'>{GetResultText(props.score?.competitionScore as number)}</Typography>
              </Box>
              <Typography textAlign="right" color="#af011c" fontSize='36px'>{props.score?.competitionScore}/100点</Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginTop= "10px">
              <Box display="flex" flexDirection="row" justifyContent= "space-between">
                <Typography textAlign="left" fontSize='36px'>・恋愛運</Typography>
                <Typography textAlign="right" fontSize='36px'>{GetResultText(props.score?.loveScore as number)}</Typography>
              </Box>
              <Typography textAlign="right" color="#af011c" fontSize='36px'>{props.score?.loveScore}/100点</Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginTop= "10px">
              <Box display="flex" flexDirection="row" justifyContent= "space-between">
                <Typography textAlign="left" fontSize='36px'>・金運</Typography>
                <Typography textAlign="right" fontSize='36px'>{GetResultText(props.score?.loveScore as number)}</Typography>
              </Box>
              <Typography textAlign="right" color="#af011c" fontSize='36px'>{props.score?.moneyScore}/100点</Typography>
            </Box>
          </CenterList>
          <CenterList justifyContent="space-between" marginTop= "10px" >
              <Typography textAlign="left" fontSize='45px'>合計…</Typography>
              <Typography textAlign="right" color= "#af011c" fontSize='45px'>{props.score?.totalScore}/300点</Typography>
          </CenterList>
          <CenterBox marginTop= "10px" >
              <Typography textAlign="left" fontSize='48px'>順位…</Typography>
              <Typography textAlign="right" color= "#af011c" fontSize='48px'>{props.score?.ranking}位/{props.score?.population}人</Typography>
          </CenterBox>
          </ThemeProvider>
          <CenterBox marginTop= "30px">
            <ReDrawButtons/>
          </CenterBox>
        </CenterWashi>
);

  }