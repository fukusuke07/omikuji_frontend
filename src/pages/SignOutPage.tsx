import { useEffect } from 'react'

import { useHistory } from 'react-router-dom';

import { from } from 'rxjs';

import Typography from '@mui/material/Typography';

import { CenterWashi } from "../components/CenterWashi"
import { CenterBox } from "../components/CenterBox"
import { CenterList } from "../components/CenterList";

/*const useStyles = makeStyles((theme) => ({
    kujicenter: {
        marginLeft:"auto",
        marginRight:"auto",
        width:"75%",
        minWidth:"348px",
        minHeight:"100vh",
        backgroundImage:`url(${Washi})`
    },
    errormessagebox:{
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        flexDirection:"column",
        width:"80%",
        minWidth:"320px"
  
      },
    errormessage:{
        marginTop:"30px",
        marginLeft:"auto",
        marginRight:"auto",
        textAlign: "center",
    },
    titletext:{
      fontFamily:'Kouzan',
    　fontSize:'42px',

    },

  }));
*/
  interface OwnProps {
    clearState: Function
  }
  
  type Props = OwnProps
  
  export default function SignOutPage(props:Props){

    const history = useHistory();

    useEffect(() => {

        let unmounted = false;
  
        var timeout:NodeJS.Timeout
  
        const f = async () => {

            await new Promise((resolve) => {
                props.clearState({
                delay: 1500,
                promise: { resolve }
              });
            })

            const subscription = from(
                new Promise(resolve => {
                timeout = setTimeout(() => {
                resolve("")
            }, 2500)
            }).then(()=>{

                history.push("/")
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
        <>
          <CenterWashi>
            <CenterList display="flex">
              <Typography marginTop="30px" marginLeft="auto" marginRight="auto" textAlign= "center">サインアウトしました</Typography>
              <Typography marginTop="30px" marginLeft="auto" marginRight="auto" textAlign= "center">数秒後にホームに移動します</Typography>
            </CenterList>
          </CenterWashi>
        </>
          
  );

  }
