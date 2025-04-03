"use client"; 

import { Alert, alpha, AppBar, Avatar, Box, CircularProgress, Container, createTheme, Drawer, getContrastRatio, IconButton, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "@mui/icons-material";
import Footer from "./components/Footer";
import api from "../function/api";
import app_config from "@/config/config";
import style from '@/app/assets/styles/member.css'

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    main: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});


export default function Home() {


  const [isError,setIsError] = useState(false)
  const [teachers,setTeachers] = useState([])
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [token,setToken] = useState(undefined)
  const navList = !token ? [{title:"درباره ما",link:'/#about'}
    , {title:"اساتید",link:'/#teachers'}
    , {title:"ورود",link:'/views/login/'}
    , {title:"ثبت نام",link:'/views/register/'}
  ]
  :[{title:"درباره ما",link:'/#about'}
    , {title:"اساتید",link:'/#teachers'}
    , {title:"پنل کاربری",link:'/views/login/'}
  ]

  const fetch_data = async () => {
    try{
      setToken(localStorage.getItem('mahjoubi.music.academy.token'))
      const result = await api('get','/auth/get-teachers',{},undefined)
      if(result.status == 201){
        setTeachers(result.data.body.data)
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result?.data?.metadata?.err_persian?result.data.metadata.err_persian:app_config.ERROR_MESSAGE)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      throw err
    }
  }

  const blobToUrl = (teacher) => {
    if(teacher?.profile?.blob_data.data){
      const blob = new Blob([new Uint8Array(teacher.profile.blob_data.data)], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    }else{
      return '/unknown.jpg'
    }
  };

  useEffect(() => {
    try{
      fetch_data()
      setLoading(false)
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

  return (
    <ThemeProvider theme={theme}>
      {

      loading?
        <CircularProgress />
      :
      <div style={{backgroundColor:"#000"}}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Container maxWidth={false}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)} sx={{ color: "#bca220" }}>
                <Menu />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 ,fontFamily: 'Amiri',fontSize:'20px',marginRight:"20px",color: "#bca220"}}>
                آموزشگاه موسیقی محجوبی
              </Typography>
              <Avatar alt="Logo" src="/icon.jpg" sx={{left:'0'}} />
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer anchor="rigth" open={open} onClose={() => setOpen(!open)} PaperProps={{sx:{height:"auto"}}}>
          <Box sx={{ width: 250,backgroundColor: "black"}} role="presentation" onClick={() => setOpen(!open)}>
            <List >
              {navList.map((text) => (
                <ListItem key={text.title} disablePadding>
                  <ListItemButton href={text.link}>
                    <ListItemText primary={text.title} sx={{textAlign:'right', flexGrow: 1 ,fontFamily: 'Amiri',fontSize:'20px',marginRight:"20px",color: "#bca220"}}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="img"
          src="/home.jpg"
          alt="home-page-photo"
          sx={{
            width: "100%",  
            height: "80vh", 
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
          }}
        />
         <section id="about" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"40px"}}>
          <div style={{backgroundColor:"#151515",width:"90%",borderRadius:"10px"}}>
            <div style={{display:'flex'}}>
              <div style={{width:"50%", margin:"10%"}}>
                <h3 style={{fontFamily: 'Amiri',fontSize:'20px',color: "#bca220"}}>آموزشگاه موسیقی محجوبی</h3>
                <p style={{fontFamily: 'Amiri',fontSize:'20px',color: "#bca220"}}>
                  آموزشگاه موسیقی محجوبی در سال x توسط استاد مجید محجوبی شروع به فعالیت کرد
                </p>
              </div>
              <div style={{width:"50%"}}>
                <Box
                  component="img"
                  src="/mahjoubi.jpg"
                  alt="mahjoubi"
                  sx={{
                    margin:"10%",
                    width: "70%",  
                    height: "50vh",
                    borderTopLeftRadius : "10%", 
                    borderTopRightRadius : "30%", 
                    borderBottomLeftRadius : "30%", 
                    borderBottomRightRadius : "10%", 
                    backgroundRepeat: "no-repeat",
                    objectFit: "cover",
                    backgroundSize: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="teachers">
          <div className='member-container'>  
          {
            teachers.map((teacher) => {
              return(
                <div key={teacher.username} className='member'>
                  <img src={blobToUrl(teacher)} alt='seyed mojtaba jalali'/>
                  <h1>{teacher.name}{' '}{teacher.last_name}</h1>
                  <h3>{teacher.mobile}</h3>
                  <h3>{teacher.email}</h3>
                </div>    
              )
            })
          }
          </div>
        </section>
        <Footer/>
      </div>
      }
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
