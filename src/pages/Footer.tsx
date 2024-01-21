import React from "react";
import { useHistory, Link } from "react-router-dom"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';

export default function Footer() {
  const history = useHistory();

  const linkToPrivacyPolicy = async (e: React.MouseEvent<HTMLButtonElement>) => {

    history.push("/PrivacyPolicy")
  }

  const linkToTerms = async (e: React.MouseEvent<HTMLButtonElement>) => {

    history.push("/Terms")
  }

  const linkToRequestForm =()=>{
    //history.push("/")
  }

  const linkToAbout =()=>{
    //history.push("/")
  }

  const linkToOmikuji =()=>{
    history.push("/")
  }

  return <Box style={{
    color: "#e0f2f1",
    backgroundColor: "#121F39",
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center"
  }}>
    <ButtonGroup variant="text" aria-label="text button group">
            <Button
              color="inherit"
              text-transform= "none"
              onClick={linkToTerms}
            >
              利用規約
            </Button>
            <Button
              color="inherit"
              text-transform= "none"
              onClick={linkToPrivacyPolicy}
            >
              プライバシーポリシー
            </Button>
            <Button
              color="inherit"
              text-transform= "none"
              onClick={linkToRequestForm}
            >
              お問合せ
            </Button>
            <Button
              color="inherit"
              text-transform= "none"
              onClick={linkToAbout}
            >
              About
            </Button>
            <Button
              color="inherit"
              text-transform= "none"
              onClick={linkToOmikuji}
            >
              © 2023 運勢闘技場
            </Button>
      </ButtonGroup>
  </Box>;
};
