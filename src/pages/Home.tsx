import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom';

import Button from "@mui/material/Button"

import Omikuji from 'assets/images/omikuji.png';

import { User, Score } from "interfaces/index"

import AlertMessage from "components/AlertMessage"

import { CenterWashi } from "../components/CenterWashi"
import { CenterBox } from "../components/CenterBox"

import { Box, Typography, ThemeProvider, CssBaseline } from '@mui/material';

import { fontTheme } from '../assets/Themes/FontTheme';

interface OwnProps {
  user: User | null 
  score: Score | null
  fetchScore: Function

}

type Props = OwnProps

  export default function Home( props: Props )
 {
    const [errorMessages, setErrorMessages] = useState<string[]>()
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

    const [drawOmikuji, setDrawOmikuji] = useState<number>(0)

    const history = useHistory();

    const isScoreInvalid = (date: string) => {
      var dd = new Date()
      var YYYY = dd.getFullYear()
      var MM = ('00' + (dd.getMonth() + 1)).slice(-2)
      var DD = ('00' + dd.getDate()).slice(-2);
  
      var today  = YYYY + "/" + MM + "/" + DD
  
      return today == date
  
  }


    useEffect(() =>{
      if(props.score && isScoreInvalid(props.score.date)){
        history.push("/Result");
    }else{
      console.log("out")
    }
  
    }, [props.score])

    useEffect(() => {

      let unmounted = false;
      const f = async () => {
        if(!unmounted && drawOmikuji > 0){

          await new Promise<{ quote: Score | null }>((resolve, reject) => {
          props.fetchScore({
          delay: 1500,
          promise: { resolve, reject }
        });
      }).then(result => {
        if(result.quote == null){
          history.push("/Measure");
        }else{
          history.push("/Result");
        }
      }).catch(error => {
        history.push("/Error");
      })
        }
    };
    f();
    return ()=>{ unmounted = true; };
   }, [drawOmikuji])

    const onClick = () =>{

      setDrawOmikuji(drawOmikuji+1)

    }

    return (
      <>
      
        <CenterWashi >
          <CenterBox>
            <ThemeProvider theme={fontTheme}>
              <Typography fontSize='42px'>運勢を競いましょう…</Typography>
            </ThemeProvider>
          </CenterBox>
          <CenterBox marginTop= "40px" >
            <img src={Omikuji} alt="omikuji" width="240px" height="300px" style={{
              display: "block",
              marginLeft:"auto",
              marginRight:"auto",
            }} />
          </CenterBox>
          <CenterBox marginTop= "60px" >
            <Button onClick={onClick} sx={{
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
            }}>
              おみくじスタート
            </Button>
          </CenterBox>
        </CenterWashi>
        <AlertMessage // エラーが発生した場合はアラートを表示
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message={errorMessages as string[]}
        />
      
      </>
        
);

  }