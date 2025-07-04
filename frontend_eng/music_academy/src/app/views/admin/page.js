"use client"; 

import { Box,createTheme, alpha, getContrastRatio,
   CircularProgress, Grid2,ThemeProvider
  ,useMediaQuery,Alert}  from "@mui/material";
import { useEffect, useState} from "react";
import api from "@/function/api";
import Nav from "@/app/components/nav";
import ShowUsers from '@/app/components/ShowUsers'
import ShowUser from "@/app/components/ShowUser";
import ShowClasses from "@/app/components/ShowClasses";
import ShowClass from "@/app/components/ShowClass";
import AddClass from "@/app/components/addClass";
import AddUser from "@/app/components/addUser";
import ShowUser2 from '@/app/components/ShowUser2'
import app_config from "@/config/config";
import Footer2 from "@/app/components/Footer2";

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



export default function Home() {
  const [who,setWho] = useState({})
  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [state,setState] = useState('classes')
  const [users,setUsers] = useState([])
  const [teachers,setTeachers] = useState([])
  const [admins,setAdmins] = useState([])
  const [classes,setClasses] = useState([])
  const [editUser,setEditUser] = useState(false)
  const [editClass,setEditClass] = useState(false)
  const [addClass,setAddClass] = useState(false)
  const [addUser,setAddUser] = useState(false)
  const [showUserUsername,setShowUserUsername] = useState('')
  const [showclassId,setShowClassId] = useState('')

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/who',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
            if(result.data.body.data.role != 3){
                window.location.href ='/views/login/'   
            }
            setWho(result.data.body.data)
        }else{
            window.location.href ='/views/login/'
        }
      }else{
        window.location.href ='/views/login/'
      }
      
    }catch(err){
      throw err
    } 
  }

  const fetch_users = async () => {
    try{
      const result = await api('get','/admin/get-users/with-role?role=1',{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setUsers(result.data.body.data)
        
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      
      throw err
    }
  }

  const fetch_teachers = async () => {
    try{
      const result = await api('get','/admin/get-users/with-role?role=2',{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setTeachers(result.data.body.data)
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      throw err
    }
  }

  const fetch_admins= async () => {
    try{
      const result = await api('get','/admin/get-users/with-role?role=3',{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setAdmins(result.data.body.data)
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      throw err
    }
  }

  const fetch_classes = async () => {
    try{
      const result = await api('get','/admin/get_classes?only_not_finished=true&only_finished=true',{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setClasses(result.data.body.data)
        
      }else{
        if(isError){
          setIsError(false)
        }
        setIsError(true)
        setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
        setTimeout(() => setIsError(false), 10000);
      }
    }catch(err){
      
      throw err
    }
  }
  const fetch = async () => {
    try{
      setLoading(true)
      await fetch_data()
      await fetch_users()
      await fetch_teachers()
      await fetch_admins()
      await fetch_classes()
      setLoading(false)
    }catch(err){
      throw err
    }
  }

  const handleOnEditUser = async(e,username) => {
    await fetch()
    setEditUser(true)
    setShowUserUsername(username)
  }

  const handleOnError = async(message) => {
    if(isError){
      setIsError(false)
    }
    setIsError(true)
    setError(message)
    setTimeout(() => setIsError(false), 10000);
  }
  
  const handleOnCloseUser = async() => {
    await fetch()
    setEditUser(false)
  }

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
          setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
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
          setError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
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
    await fetch()
  }

  const handleOnEditClasses = async(e,id) => {
    await fetch()
    setEditClass(true)
    setShowClassId(id)
  }

  const handleOnCloseClass = async() => {
    await fetch()
    setEditClass(false)
  }

  const handleOnCloseAddClass = async() => {
    await fetch()
    setAddClass(false)
  }

  const handleOnCloseAddUser = async() => {
    await fetch()
    setAddUser(false)
  }

  const handleShowSessions = async(id) => {
    const queryString = new URLSearchParams({id:id}).toString();
    const newUrl = `/views/show_sessions?${queryString}`;
    window.location.href = newUrl
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
                <Grid2 item xs={12} sm={8} sx={{width:isMobile?"100%":"87%", height: isMobile? "90vh":"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {
                    state === 'teachers'?
                      <ShowUsers input_users={teachers} key="teachers" onEdit={handleOnEditUser} onAdd={() => setAddUser(true)}/>
                    :(
                      state === 'admins'?
                        <ShowUsers input_users={admins} key="admins" onEdit={handleOnEditUser} onAdd={() => setAddUser(true)}/>
                      :(
                        state==='users'?
                          <ShowUsers input_users={users} key="users" onEdit={handleOnEditUser} onAdd={() => setAddUser(true)}/>
                        :(
                          state ==='classes'?
                            <ShowClasses input_classes={classes} onDelete={onDeleteClasses} onEdit={handleOnEditClasses} onAdd={() => setAddClass(true)} onSession={(e,id) => handleShowSessions(id)}/>
                          :(
                            state ==='account'?
                              <ShowUser2 username={who.username} onError={(message) => handleOnError(message)}/>
                            :null
                          )
                        )
                      )
                    )
                  }
                  
                </Grid2>
                <Nav onChangeState={(input_state) => {
                  setState(input_state)
                }}/>
              </Grid2>
            )
        }
        {
          editUser?
            <ShowUser username={showUserUsername} onError={(message) => handleOnError(message)} onClose={() => handleOnCloseUser()}/>
          :null
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
        {
          addUser?
            <AddUser onClose={() => handleOnCloseAddUser()} onError={(message) => handleOnError(message)}/>
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
      <Footer2/>
    </ThemeProvider>
  );
}
