"use client";
import { Grid2,Box,Button,createTheme,alpha,getContrastRatio,CardContent,LinearProgress,TextField,Select,MenuItem, IconButton,FormControlLabel,Checkbox,Autocomplete} from "@mui/material";
import { Close} from "@mui/icons-material";
import { useEffect,useState } from "react";
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

const AddClass = ({onClose,onError}) => {
    const [editClassLoading,setEditClassLoading] = useState(false)
    const [class_,setClass_] = useState({
        teacher : '',
        student : '',
        session_price : '',
        week_day : '',
        houre : '',
        duration: '',
        session_left: '',
        absence_left: '',
        is_payed : '',
        teacherـpercentage : ''
    })
    const [teachers,setTeachers] = useState([])
    const [users,setUsers] = useState([])
    const [addLoading,setAddLoading] = useState(false)
    const days = ['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه']
    const hours = ['۹','۹:۳۰','۱۰','۱۰:۳۰','۱۱','۱۱:۳۰','۱۲','۱۲:۳۰','۱۳','۱۳:۳۰','۱۴','۱۴:۳۰','۱۵','۱۵:۳۰','۱۶','۱۶:۳۰','۱۷','۱۷:۳۰','۱۸','۱۸:۳۰','۱۹','۱۹:۳۰','۲۰','۲۰:۳۰','۲۱','۲۱:۳۰','۲۲','۲۲:۳۰']
    const durations = ["30"]


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


    const fetch_users = async () => {
        try{
            const result = await api('get',`/admin/get-users/with-role?role=1`,{},localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setUsers(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
        }catch(err){
            throw err
        }
        
    }

    const fetch_teachers = async () => {
        try{
            const result = await api('get',`/admin/get-users/with-role?role=2`,{},localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setTeachers(result.data.body.data)
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
            await fetch_users()
            await fetch_teachers()
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

    const addClass = async() => {
        setAddLoading(true)
        try{
            const result = await api('post',`/admin/add-class`,class_,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                onClose()
                setClass_(result.data.body.data)
            }else{
                onError(result.data.metadata.err_persian)
            }
            setAddLoading(false)
        }catch(err){
            setAddLoading(false)
            onError(app_config.ERROR_MESSAGE)
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
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} >
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>     
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    options={teachers.map(teacher => ({ label: teacher.username, id: teacher.username }))}
                                    sx={input_style}
                                    onChange={(e,val) => onChange(val.id,'teacher')}
                                    renderInput={(params) => <TextField {...params} label="اساتید" />}
                                    />
                                </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Autocomplete
                                        fullWidth
                                        disablePortal
                                        options={users.map(user => ({ label: user.username, id: user.username }))}
                                        sx={input_style}
                                        onChange={(e,val) => onChange(val.id,'student')}
                                        renderInput={(params) => <TextField {...params} label="هنرجوها" />}
                                        />
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
                                label="تعداد جلسات"
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
                                label="تعداد غیبت های مجاز"
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
                            <TextField
                                sx={input_style}
                                label="قیمت هرجلسه"
                                type="number"
                                value={class_.session_price}
                                onChange={(e) => onChange(e.target.value,'session_price')}
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
                            <Button variant='contained' loading={addLoading} sx={{ marginRight: 3.5 }} onClick={(e) => addClass()}>
                                تایید
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            }
        </CardContent>
    )
}


export default AddClass