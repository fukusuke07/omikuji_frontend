import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Box, styled } from '@mui/material';
import Washi from 'assets/images/japanese-paper_00372.png'

export const CenterWashi = styled(Box)(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    padding: "40px 0px 60px 0px",
    marginLeft:"auto",
    marginRight:"auto",
    width:"75%",
    minWidth:"348px",
    minHeight: "100vh",
    backgroundImage:`url(${Washi})`
}));
