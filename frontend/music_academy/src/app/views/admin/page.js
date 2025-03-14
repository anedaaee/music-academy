"use client"; 

import { Box, Button, Paper, TextField, Typography,ThemeProvider,createTheme, alpha, getContrastRatio, Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import login_background from '@/app/assets/images/login_background.jpg'
import api from "@/function/api";
import app_config from "@/config/config";
import Link from "next/link";

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});


export default function Home() {

  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/who',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
            if(result.data.body.data.role != 3){
                alert('hi1')
                window.location.href ='/'   
            }
        }else{
            alert('hi3')
            window.location.href ='/'
        }
      }else{
        alert('hi2')
        window.location.href ='/'
      }
      
    }catch(err){

    }
  }

  useEffect(() => {
    try{
      fetch_data()
    }catch(err){

    }finally{
      //setLoading(false)
    }
  },[])

  
  return (
    <ThemeProvider theme={theme}>
        <Box
        sx={{
          height: "100vh",
          display: "flex",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: { xs: 2, sm: 4 },
        }}
      >
        {
            loading?
            <CircularProgress/>
            :
            null
        }
      </Box>
    </ThemeProvider>
  );
}
