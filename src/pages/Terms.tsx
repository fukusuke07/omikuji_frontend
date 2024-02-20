import {termAssets} from "components/assets"

import { CenterWashi } from "../components/CenterWashi"

import { Box } from '@mui/material';

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