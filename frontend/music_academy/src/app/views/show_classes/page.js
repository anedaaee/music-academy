"use client"; 

import { Box,createTheme, alpha, getContrastRatio,
   CircularProgress, Grid2,ThemeProvider,IconButton,Avatar,useMediaQuery
  ,Alert}  from "@mui/material";
import { Info,AccountCircle,Home,Phone,Email,QrCode,LocationOn} from "@mui/icons-material";
import { useEffect, useState} from "react";
import api from "@/function/api";
import ShowClasses from "@/app/components/ShowClasses";
import AddClass from "@/app/components/addClass";
import ShowClass from "@/app/components/ShowClass";
import ShowSalary from "@/app/components/showSalary";
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



export default function ShowClassesPage() {

  const [username,setUsername] = useState('')
  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [teacher,setTeacher] = useState({})
  const [classes,setClasses] = useState([])
  const [editClass,setEditClass] = useState(false)
  const [addClass,setAddClass] = useState(false)
  const [showclassId,setShowClassId] = useState('')
  const [state,setState] = useState('account')
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
      throw err
    } 
  }


  const fetch_teacher = async (username) => {
    try{
      const result = await api('get',`/admin/get-user?username=${username}`,{},localStorage.getItem('mahjoubi.music.academy.token'))
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

  const fetch_classes = async (username) => {
    try{
      const result = await api('get',`/admin/get_classes/teacher?only_not_finished=true&only_finished=true&teacher=${username}`,{},localStorage.getItem('mahjoubi.music.academy.token'))
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
      const params = new URLSearchParams(window.location.search);
      const input_username = params.get('teacher');
      setUsername(input_username)
      await fetch_teacher(input_username)
      await fetch_classes(input_username)
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
 
  const onDeleteClasses = async(id,type) => {
    try{
      if(type=='delete'){
        const result = await api('delete','/admin/delete-class',{id:id},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
          window.location.reload()
        }else{
          if(isError){
            setIsError(false)
          }
          setIsError(true)
          setError(result.data.metadata.err_persian)
          setTimeout(() => setIsError(false), 10000);
        }
      }else if(type=='refactore'){
        
        const result = await api('patch','/admin/refactore-class',{id:id},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
          window.location.reload()
        }else{
          if(isError){
            setIsError(false)
          }
          setIsError(true)
          setError(result.data.metadata.err_persian)
          setTimeout(() => setIsError(false), 10000);
        }
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

  const handleOnEditClasses = async(e,id) => {
    setEditClass(true)
    setShowClassId(id)
    //window.location.reload()
  }

  const handleOnCloseAddClass = async() => {
    setAddClass(false)
    //window.location.reload()
  }

  const handleOnCloseClass = async() => {
    setEditClass(false)
    //window.location.reload()
  }

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
    const newUrl = `/views/show_sessions?${queryString}`;
    window.location.href = newUrl
  }

  function stringToColor(string) {
    let hash = 0;
    let i;
    string = string?string:'Unknown'
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
function stringAvatar(name) {
    name=name?name:'Unknown'
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

  const GetAvatar = ({user}) => {
          const profilePictureData = user.profile?.blob_data?.data;
              if(profilePictureData){
              const blob = new Blob([new Uint8Array(profilePictureData)], { type: 'image/png' });
              const imageUrl = URL.createObjectURL(blob);
              return(
                 
                  <Avatar alt={user.username} src={imageUrl} sx={{ width: 100, height: 100 }} onClick={() => fileInputRef.current.click()}/>
                  
                  
              )
              }else{
              return(
                  <Avatar alt={user.username} {...stringAvatar(user.username)} sx={{ width: 100, height: 100 }} onClick={() => fileInputRef.current.click()}/>
                  
                  
              )
          }
      }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{backgroundColor:"#f5f5f5"}}>
      <IconButton onClick={(e) => {window.location.href='/views/admin'}} sx={{"&:hover": {
            backgroundColor: theme.palette.violet.light,
            borderRadius:"5px",
            transition: "0.3s"}
        }}>
            <Home sx={{color:theme.palette.primary.dark}}/>
        </IconButton>
      </Box>
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
                <Grid2 item xs={12} sm={8} sx={{width:isMobile?"100%":"87%", height: isMobile? "90vh":"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                {
                  state == 'account'?
                  (
                      <form style={{display: 'flex', flexDirection: 'column', flexGrow: 1, width: '80%', height: '100%' , display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'40px',borderRadius:'10px'}}>
                        <Grid2 container spacing={2} >
                            <Grid2 item size={{xs:12,md:12}}>
                                <GetAvatar user={teacher}/>
                            </Grid2> 
                            <Grid2 item size={{xs:12,md:12}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountCircle sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام کاربری : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.username}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Info sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.name?teacher.name:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Info sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام خانوادگی : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.last_name?teacher.last_name:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Phone sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شماره همراه: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.mobile?teacher.mobile:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Phone sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شماره منزل: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.phone?teacher.phone:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Email sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{color:theme.palette.primary.light}}>پست الکترونیک : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.email?teacher.email:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:6}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <QrCode sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{color:theme.palette.primary.light}}>کد ملی : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.national_id?teacher.national_id:'---'}</span></h3>
                                </Box>
                            </Grid2>
                            <Grid2 item size={{xs:12,md:12}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{color:theme.palette.violet.light}}/>
                                    <h3 style={{color:theme.palette.primary.light}}>آدرس : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{teacher.address?teacher.address:'---'}</span></h3>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </form>
                  ):
                  (
                    state=='classes'?
                      <ShowClasses input_classes={classes} onDelete={onDeleteClasses} onEdit={handleOnEditClasses} onAdd={() => setAddClass(true)} onSession={(e,id) => handleShowSessions(id)}/>
                    :(
                      state=='salary'?
                        <ShowSalary teacher={teacher.username} onError={(message) => handleOnError(message)}/>
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
        {
          editClass?
            <ShowClass id={showclassId} onError={(message) => handleOnError(message)} onClose={() => handleOnCloseClass()}/>
          :null
        }
        {
          addClass?
            <AddClass onClose={() => handleOnCloseAddClass()} onError={(message) => handleOnError(message)}/>
          :null
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
