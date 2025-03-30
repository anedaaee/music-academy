"use client"; 

import { Box,createTheme, alpha, getContrastRatio,
   CircularProgress, Grid2,ThemeProvider,useMediaQuery
  ,Alert}  from "@mui/material";
import { useEffect, useState} from "react";
import api from "@/function/api";
import ShowClasses2 from "@/app/components/ShowClasses2";
import ShowUserTeacher from "@/app/components/ShowUserTeacher";
import ShowSalaryTeacher from "@/app/components/ShowSalaryTeacher";
import NavForShowClass from "@/app/components/navForShowClass";
import app_config from "@/config/config";


const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.2),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
      text : '#451f6d'
    },
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.2),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
      text : '#451f6d'
    },
  },
});



export default function User() {

  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [teacher,setTeacher] = useState({})
  const [classes,setClasses] = useState([])
  const [state,setState] = useState('account')
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/who',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
            if(result.data.body.data.role != 2){
                window.location.href ='/'   
            }
        }else{
            window.location.href ='/'
        }
      }else{
        window.location.href ='/'
      }
      
    }catch(err){
      throw err
    } 
  }

  const fetch_teacher = async () => {
    try{
      const result = await api('get',`/user/who`,{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setTeacher(result.data.body.data)
        
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result.data.metadata.err_persian)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      
      throw err
    }
  }

  const fetch_classes = async () => {
    try{
      const result = await api('get',`/teacher/get-classes-sessions?only_not_finished=true&only_finished=true`,{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setClasses(result.data.body.data)
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result.data.metadata.err_persian)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      throw err
    }
  }

  const fetch = async () => {
    try{
      await fetch_data()
      await fetch_teacher()
      await fetch_classes()
      setLoading(false)
    }catch(err){
      throw err
    }
  }

  useEffect(() => {
    try{ 
      fetch()
    }catch(err){
      if(isError){
        setIsError(false)
      }
      setIsError(true)
      setError(app_config.ERROR_MESSAGE)
      setTimeout(() => setIsError(false), 10000);
    }finally{
    }
  },[])  
 
 



  const handleOnError = async(message) => {
    if(isError){
      setIsError(false)
    }
    setIsError(true)
    setError(message)
    setTimeout(() => setIsError(false), 10000);
  }

  const handleShowSessions = async(id) => {
    const queryString = new URLSearchParams({id:id}).toString();
    const newUrl = `/views/teacher/show_sessions?${queryString}`;
    window.location.href = newUrl
  }


  return (
    <ThemeProvider theme={theme}>
        <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        
        {
            loading?
            <CircularProgress color="primary"/>
            :
            (
              <Grid2 container spacing={2} direction={isMobile ? "column" : "row-reverse"} sx={{width:"100%",height:"100"}}>
                <Grid2 item xs={12} sm={8} sx={{width:isMobile?"100%":"87%", height: isMobile? "80vh":"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                {
                  state == 'account'?
                  (
                    <ShowUserTeacher onError={(message) => handleOnError(message)}/>
                  ):
                  (
                    state=='classes'?
                      <ShowClasses2 input_classes={classes} onSession={(e,id) => handleShowSessions(id)}/>
                    :(
                      state=='salary'?
                        <ShowSalaryTeacher onError={(message) => handleOnError(message)}/>
                      :null
                    )
                  )
                }
                 </Grid2>

                  <NavForShowClass onChangeState={(input_state) => {
                    setState(input_state)
                  }}/>
              </Grid2>
            )
        }
      </Box>
      {
        isError?
          <Alert severity="error"
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 999,
                width: "auto",
                minWidth: 250
              }}
              >{error}
          </Alert>
        :null
      }
    </ThemeProvider>
  );
}
