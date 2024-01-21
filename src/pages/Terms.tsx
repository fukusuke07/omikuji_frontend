import {termAssets} from "components/assets"

import { CenterWashi } from "../components/CenterWashi"

import { Box } from '@mui/material';

/*const useStyles = makeStyles((theme) => ({
  kujicenter: {
    display:"flex",
    flexDirection:"column",
    justifyContent: "space-around",
    padding: "0 0",
    marginLeft:"auto",
    marginRight:"auto",
    width:"80%",
    minWidth:"348px",
    minHeight:"2400px",
    backgroundImage:`url(${Washi})`
  },
  textbox:{
    marginLeft:"auto",
    marginRight:"auto",
    width:"80%",
    minWidth:"320px",
  },
  titletext:{
    textAlign:"left",
    fontSize:'20px',
    marginTop: "20px",
  },
  bodytext:{
    textAlign:"left",
    fontSize:'10px',
    marginBottom: "20px",
    whiteSpace:"pre-wrap"
  },
}))*/

export default function Terms(){
    
    const mapPolicyRender = () => {
        
        const term = termAssets()

        return (term.policy.privacy.map(item => (
            <div key={item.key}>
        <Box textAlign="left" fontSize='20px' marginTop= "20px">
         {item.title}
        </Box>
        <Box textAlign="left" fontSize='10px' marginBottom= "20px" whiteSpace="pre-wrap" >
            {item.body}
        </Box>
      </div>
          )))
    }

    return (
        <CenterWashi>
          <Box marginLeft="auto" marginRight="auto" width="80%" minWidth="320px">
                {mapPolicyRender()}
          </Box>
        </CenterWashi>
      );
}