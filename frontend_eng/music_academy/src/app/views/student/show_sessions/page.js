"use client"; 

import { Box,createTheme, alpha, getContrastRatio,
   CircularProgress, Grid2,ThemeProvider,IconButton
  ,Alert}  from "@mui/material";
import { Info,AccountCircle,Home,CalendarToday,Watch,HourglassBottom,Check ,Percent,Paid} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState} from "react";
import api from "@/function/api";
import moment from "jalali-moment";
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



export default function ShowSessions() {
  const columns = [
      { field: 'id', headerName: 'Session ID', width: 300, sortable: true, headerClassName:'grid-header' },
      { field: 'status', headerName: 'Status', width: 300, sortable: true,align: 'left',headerAlign: 'left', headerClassName:'grid-header',renderCell: (params) => (params.row.status=='invalid_absence' ? 'Invalid Absence' : params.row.status=='valid_absence'?'Valid Absence':'Present')},
      { field: 'price', headerName: 'Fee', width: 300, sortable: true ,align: 'left',headerAlign: 'left', headerClassName:'grid-header'},
      { field: 'description', headerName: 'Description', width: 300, sortable: true , headerClassName:'grid-header'},
      { field: 'session_date', headerName: 'Date', width: 350, sortable: true , headerClassName:'grid-header', renderCell: (params) => (moment(params.row.session_date).locale('fa').format('YYYY/MM/DD'))},
    ]
  const [id,setId] = useState('')
  const [isError,setIsError] = useState(false)
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(true)
  const [class_,setClass_] = useState({})
  const [sessions,setSessions] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const fetch_data = async () => {
    try{
      if(localStorage.getItem('mahjoubi.music.academy.token')){
        const result = await api('get','/user/who',{},localStorage.getItem('mahjoubi.music.academy.token'))
        if(result.status == 200){
            if(result.data.body.data.role != 1){
                window.location.href ='/views/login/'   
            }
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


  const fetch_class = async (id) => {
    try{
      const result = await api('get',`/user/get_class?class_id=${id}&only_not_finished=true&only_finished=true`,{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setClass_(result.data.body.data)
        
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

  const fetch_sessions = async (id) => {
    try{
      const result = await api('get',`/user/get-class-sessions?class_id=${id}&only_not_finished=true&only_finished=true`,{},localStorage.getItem('mahjoubi.music.academy.token'))
      if(result.status == 200){
        setSessions(result.data.body.data[0].session)
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
      await fetch_data()
      const params = new URLSearchParams(window.location.search);
      const input_id = params.get('id');
      setId(input_id)
      await fetch_class(input_id)
      await fetch_sessions(input_id)
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
 
 

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{backgroundColor:"#f5f5f5"}}>
      <IconButton onClick={(e) => {window.location.href='/views/student'}} sx={{"&:hover": {
            backgroundColor: theme.palette.violet.light,
            borderRadius:"5px",
            transition: "0.3s"}
        }}>
            <Home sx={{color:theme.palette.primary.dark}}/>
        </IconButton>
      </Box>
        <Box
        sx={{
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
              <Grid2 container spacing={2} direction={"column"} sx={{width:"100vw",height: '100%' ,display:'flex',justifyContent:'flex-start',flexDirection:'column',alignItems:'center',marginBottom:'20vh'}}>
                              <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '90%', height: '100%' , display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#eadbfc',padding:'40px',borderRadius:'10px',marginBottom:'5vh'}}>
                                  <Grid2 container spacing={2} sx={{height:"100%",overflow:'auto',}}>
                                      <Grid2 item size={{xs:12,md:12}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' ,overflow:'auto'}}>
                                              <AccountCircle sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Class ID: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.id}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:6}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Info sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Teacher : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:6}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Info sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Student : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:6}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Info sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Teacher&apos;s Name : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher_name?class_.teacher_name:'---'}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:6}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Info sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Student&apos;s Name : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student_name?class_.student_name:'---'}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}}> 
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <CalendarToday sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Day : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.week_day}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Watch sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>Houre : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.houre}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <HourglassBottom sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Duration : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.duration}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Check sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Sessions Left : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.session_left}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}} >
                                          <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                              <Check sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Absence Left : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.absence_left}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:6,md:4}} >
                                          <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                              <Percent sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Teacher&apos;s Percentage : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacherـpercentage}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:12}} >
                                          <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                              <Paid sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Is Payed? <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.is_payed?'Yes':'No'}</span></h3>
                                          </Box>
                                      </Grid2>
                                      <Grid2 item size={{xs:12,md:12}} >
                                          <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                              <Paid sx={{color:theme.palette.violet.light}}/>
                                              <h3 style={{color:theme.palette.primary.light}}>Class Status: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.is_finish?'Finished':'Continue'}</span></h3>
                                          </Box>
                                      </Grid2>
                                  </Grid2>
                              </form>
                <DataGrid
                  rows={sessions}
                  columns={columns}
                  paginationModel={paginationModel}
                  pageSizeOptions={[5, 10, 15]} 
                  pagination
                  disableRowSelectionOnClick
                  onPaginationModelChange={setPaginationModel}
                  getRowId={(row) => row.id}
                  sx={{
                  direction:"ltr",
                  '& .grid-header': {
                      backgroundColor: theme.palette.violet.light, 
                      color: theme.palette.violet.text,
                      fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-cell': {
                      fontSize: 14, 
                      color: theme.palette.violet.text
                  },
                  '& .MuiDataGrid-row:hover': {
                      backgroundColor: '#f1f1f1', 
                  },
                  '& .MuiPaginationItem-root': {
                      color: theme.palette.violet.text
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: theme.palette.violet.text, 
                      color: theme.palette.violet.text,
                  },
                  boxShadow: 3, 
                  borderRadius: 2, 
                  width:"90%"
                  }}
              />
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
      <Footer2/>
    </ThemeProvider>
  );
}
