import { privacyPolicyAssets } from "components/privacyPolicyAssets"

import { CenterWashi } from "../components/CenterWashi"

import { Box } from '@mui/material';

export default function PrivacyPolicy(){

    const mapPolicyRender = () => {
        
        const privacyPolicy = privacyPolicyAssets()

        return (privacyPolicy.policy.privacy.map(item => (
            <div key={item.key}>
        <div style={{
          textAlign:"left",
          fontSize:'20px',
          marginTop: "20px",
        }}>
         {item.title}
        </div>
        <div style={{
          textAlign:"left",
          fontSize:'10px',
          marginBottom: "20px",
          whiteSpace:"pre-wrap"
        }}>
            {item.body}
        </div>
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