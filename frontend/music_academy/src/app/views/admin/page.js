"use client"; 

import { Box,createTheme, alpha, getContrastRatio, CircularProgress, Grid2,ThemeProvider
  ,Paper,useMediaQuery,Theme, Typography,IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import api from "@/function/api";
import {Class,ClassOutlined,People,PeopleOutline,School,SchoolOutlined,ManageAccounts,ManageAccountsOutlined} from '@mui/icons-material'
import Nav from "@/app/components/nav";

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.2),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});



export default function Home() {

  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const [state,setState] = useState('classes')

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/who',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
            if(result.data.body.data.role != 3){
                window.location.href ='/'   
            }
        }else{
            window.location.href ='/'
        }
      }else{
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
          width: "100vw",
          display: "flex",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {
            loading?
            <CircularProgress/>
            :
            (
              <Grid2 container spacing={2} direction={isMobile ? "column" : "row-reverse"} sx={{width:"100%",height:"100",justifyContent:"right"}}>
                <Grid2 item xs={12} sm={8} sx={{width:isMobile?"100":"87%", height: isMobile? "94.5vh":"100vh" ,bgcolor: "lightblue"}}>
                  <Box sx={{ }}>صفحه</Box>
                </Grid2>
                <Nav onChangeState={(state) => setState(state)}/>
              </Grid2>
            )
        }
      </Box>
    </ThemeProvider>
  );
}
