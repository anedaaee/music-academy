"use client";
import { Grid2,Avatar,Input,Box,Button,createTheme,alpha,getContrastRatio,CardContent,LinearProgress,TextField,Select,MenuItem, IconButton,FormControlLabel,Checkbox} from "@mui/material";
import { Info,AccountCircle,Phone,Email,QrCode,LocationOn,Close,CalendarToday,Watch,HourglassBottom,Check ,Percent,Paid} from "@mui/icons-material";
import { useRef,useEffect,useState } from "react";
import app_config from "@/config/config";
import api from "@/function/api";

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

const ShowClass = ({id,onError,onClose}) => {
    const [editClassLoading,setEditClassLoading] = useState(false)
    const [class_,setClass_] = useState({})
    const [editMode,setEditMode] = useState(false)
    const [editLoading,setEditLoading] = useState(false)
    const [deleteLoading,setDeleteLoading] = useState(false)
    const days = ['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه']
    const hours = ['۹','۹:۳۰','۱۰','۱۰:۳۰','۱۱','۱۱:۳۰','۱۲','۱۲:۳۰','۱۳','۱۳:۳۰','۱۴','۱۴:۳۰','۱۵','۱۵:۳۰','۱۶','۱۶:۳۰','۱۷','۱۷:۳۰','۱۸','۱۸:۳۰','۱۹','۱۹:۳۰','۲۰','۲۰:۳۰','۲۱','۲۱:۳۰','۲۲','۲۲:۳۰']
    const durations = [30]


    const input_style = {
        borderRadius: 2,
        boxShadow: 2,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: theme.palette.violet.light, 
            },
            '&:hover fieldset': {
            borderColor: theme.palette.violet.dark,
            },
            '&.Mui-focused fieldset': {
            borderColor: theme.palette.violet.dark,
            },
        },
        color: theme.palette.violet.dark
    }

    const fetch_class = async (id) => {
        
        try{
          
            const result = await api('get',`/admin/get_class?class_id=${id}&only_not_finished=true&only_finished=true`,{},localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setClass_(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
        }catch(err){
            throw err
        }
        
    }

    const fetch = async () => {
        try{
            setEditClassLoading(true)
            await fetch_class(id)
            setEditClassLoading(false)
        }catch(err){
            throw err
        }
    }

    useEffect(() => {
        try{ 
            fetch()
        }catch(err){
            onError(app_config.ERROR_MESSAGE)
        }
    } , [])

    const updateClass = async() => {
        setEditLoading(true)
        try{
            const data ={
                id:class_.id,
                teacher : class_.teacher,
                student : class_.student,
                session_price : class_.session_price,
                week_day : class_.week_day,
                houre : class_.houre,
                duration: class_.duration,
                session_left:class_.session_left,
                absence_left: class_.absence_left,
                is_payed : class_.is_payed==1?true:false,
                teacherـpercentage : class_.teacherـpercentage
            }
            const result = await api('patch',`/admin/update-class`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setClass_(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
            setEditLoading(false)
            setEditMode(false)
        }catch(err){
            setEditLoading(false)
            setEditMode(false)
            onError(app_config.ERROR_MESSAGE)
        }
    }

    const deleteClass = async() => {
        setDeleteLoading(true)
        try{
            const data = {
                id:class_.id,
            }
            const result = await api('delete',`/admin/delete-class`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setClass_(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
            setDeleteLoading(false)
            setEditMode(false)
        }catch(err){
            onError(app_config.ERROR_MESSAGE)
            setDeleteLoading(false)
            setEditMode(false)
        }
    }

    const refactoreClass = async() => {
        setDeleteLoading(true)
        try{
            const data = {
                id:class_.id,
            }
            const result = await api('patch',`/admin/refactore-class`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setClass_(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
            setDeleteLoading(false)
            setEditMode(false)
        }catch(err){
            onError(app_config.ERROR_MESSAGE)
            setDeleteLoading(false)
            setEditMode(false)
        }
    }


    const onChange = (val,key) => {
        try{
          setClass_({
            ...class_,
            [key]:val
          })
        }catch(err){
    
        }
    }
    

    return(
        <CardContent sx={{
            bgcolor:'#fff',
            position:'fixed',
            zIndex:999,
            width:{xs:'80vw',mb:'50vw'},
            height:{xs:'80vh',mb:'50vh'},
            borderRadius:'10px',}}
        >   
            <IconButton onClick={(e) => onClose()} sx={{"&:hover": {
                backgroundColor: theme.palette.violet.light,
                borderRadius:"5px",
                transition: "0.3s"}
            }}>
                <Close/>
            </IconButton>
            {
            editClassLoading?
                <LinearProgress color="primary" size={100} sx={{color: "violet.contrastText",width:"80%",height:'.5%'}}/>
            :   
                editMode?
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} >
                        <Grid2 item size={{xs:12,md:12}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountCircle sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شناسه کلاس: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.id}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>استاد : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>هنرجو : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام استاد : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher_name?class_.teacher_name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام هنرجو : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student_name?class_.student_name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}> 
                            <Select fullWidth sx={input_style}  label='روز' value={class_.week_day} onChange={(e) => onChange(e.target.value,'week_day')}>
                                {
                                    days.map((item) => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Select fullWidth sx={input_style}  label='ساعت' value={class_.houre} onChange={(e) => onChange(e.target.value,'houre')}>
                                {
                                    hours.map((item) => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Select fullWidth sx={input_style}  label='مدت زمان' value={class_.duration} onChange={(e) => onChange(e.target.value,'duration')}>
                                {
                                    durations.map((item) => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                sx={input_style}
                                label="جلسات باقی مانده"
                                type="number"
                                value={class_.session_left}
                                onChange={(e) => onChange(e.target.value,'session_left')}
                                fullWidth
                                />
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <TextField
                                sx={input_style}
                                label="غیبت های باقی مانده"
                                type="number"
                                value={class_.absence_left}
                                onChange={(e) => onChange(e.target.value,'absence_left')}
                                fullWidth
                                />
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <TextField
                                sx={input_style}
                                label="درصد استاد"
                                type="number"
                                value={class_.teacherـpercentage}
                                onChange={(e) => onChange(e.target.value,'teacherـpercentage')}
                                fullWidth
                                />
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={class_.is_payed}
                                    onChange={(e) => onChange(e.target.checked,'is_payed')}
                                    color="#7F00FF"
                                    />
                                }
                                label="پرداخت شده؟"
                                sx={{color:'#7F00FF'}}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Button variant='contained' style={{backgroundColor:'transparent',border:'1px solid red',color:'red'}} sx={{ marginRight: 3.5 }} onClick={(e) => setEditMode(false)}>لغو</Button>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Button variant='contained' loading={editLoading} sx={{ marginRight: 3.5 }} onClick={(e) => updateClass()}>
                                ویرایش
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
                :
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} >
                        <Grid2 item size={{xs:12,md:12}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountCircle sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شناسه کلاس: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.id}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>استاد : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>هنرجو : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام استاد : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacher_name?class_.teacher_name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام هنرجو : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.student_name?class_.student_name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}> 
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarToday sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>روز هفته : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.week_day}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Watch sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>ساعت : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.houre}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HourglassBottom sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>مدت زمان : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.duration}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Check sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>جلسات باقی مانده : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.session_left}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Check sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>غیبت های باقی مانده : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.absence_left}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:6,md:4}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Percent sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>درصد استاد : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.teacherـpercentage}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}} >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Paid sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>آیا پرداخت شده : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{class_.is_payed?'بله':'خیر'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                        {
                            !class_.is_finish?
                            <Button variant='contained' loading={deleteLoading} style={{backgroundColor:'transparent',border:'1px solid red',color:'red'}} sx={{ marginRight: 3.5 }} onClick={(e) => deleteClass()}>اتمام</Button>
                            :
                            <Button variant='contained' loading={deleteLoading} style={{backgroundColor:'transparent',border:'1px solid green',color:'green'}} sx={{ marginRight: 3.5 }} onClick={(e) => refactoreClass()}>بازسازی</Button>
                        }
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Button variant='contained'  sx={{ marginRight: 3.5 }} onClick={(e) => setEditMode(true)}>
                                ویرایش
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            }
        </CardContent>
    )
}


export default ShowClass