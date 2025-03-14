"use client"; 

import { Box, Button, Paper, TextField, Typography,ThemeProvider,createTheme, alpha, getContrastRatio, Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import login_background from '@/app/assets/images/login_background.jpg'
import api from "../function/api";
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

  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/check-auth',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
          //go to main page
        }
      }
      
    }catch(err){

    }
  }

  useEffect(() => {
    try{
      fetch_data()
    }catch(err){

    }finally{
      setLoading(false)
    }
  },[])

  const login = async (e) => {
    try{
      e.preventDefault()
      const result = await api('post','/auth/login',{
        username:username,
        password:password
      })
      if(result.status == 200){
        localStorage.setItem('mahjoubi.music.academy.token',result.data.body.data.token.token)
      }else{ 
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result.data.metadata.err_persian)
      }
      
    }catch(err){
      if(isError){
        setIsError(false)
      }
      setIsError(true)
      setError(app_config.ERROR_MESSAGE)
      setTimeout(() => setIsError(false), 10000);
    }
  }

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
          backgroundImage:`url(${login_background.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: { xs: 2, sm: 4 },
        }}
      >
      {
        loading?
          <CircularProgress />
        :
          <>
          
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 2, sm: 4 }, 
                height: {xs: "70vh", sm: 350},
                width: { xs: "90%", sm: 350 }, 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                خوش آمدید
              </Typography>

              <TextField fullWidth label="نام کاربری" variant="outlined" sx={{ mb: 2 }}  onChange={(e) => setUsername(e.target.value)} value={username}/>
              <TextField fullWidth label="رمز عبور" variant="outlined" type="password" sx={{ mb: 2 }} onChange={(e) => setPassword(e.target.value)} value={password}/>

              <Button variant="contained" fullWidth sx={{ 
                  mb: 2 , 
                  bgcolor: "violet.main", 
                  color: "violet.contrastText", 
                  '&:hover': { bgcolor: "violet.dark" } 
                  }}
                  onClick={(e) => login(e)}>
                ورود
              </Button>
              <Typography variant="body2" sx={{ mt: 1 }}>
                حساب کاربری ندارید؟ 
                <Link href="/views/register" style={{ color: "blue", textDecoration: "none", fontWeight: "bold", marginRight: 5 }}>
                  ثبت‌نام کنید
                </Link>
              </Typography>
            </Paper>
            {
                isError?
                  <Alert severity="error"
                      sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        zIndex: 9999,
                        width: "auto",
                        minWidth: 250
                      }}
                      >{error}
                  </Alert>
                :null
              }
          </>
        }
      </Box>
    </ThemeProvider>
  );
}
