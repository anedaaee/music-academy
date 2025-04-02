"use client";
import { Grid2,Button,createTheme,alpha,getContrastRatio,CardContent,TextField,IconButton,Select,MenuItem, InputLabel} from "@mui/material";
import { Close} from "@mui/icons-material";
import { useState } from "react";
import { AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

const AddSession = ({class_id,onClose,onError}) => {
    const [session,setSession] = useState({
        class_id:class_id,
        status:'',
        description:'',
        session_date:''
    })
    const [addLoading,setAddLoading] = useState(false)

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

    const addSession = async() => {
        setAddLoading(true)
        try{
            const result = await api('post',`/admin/add-session`,session,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                onClose()
            }else{
                onError(result?.data?.metadata?.err_persian?result.data.metadata.err_persian:app_config.ERROR_MESSAGE)
            }
            setAddLoading(false)
        }catch(err){
            setAddLoading(false)
            onError(app_config.ERROR_MESSAGE)
        }
    }
    

    const onChange = (val,key) => {
        try{
          setSession({
            ...session,
            [key]:val
          })
        }catch(err){
    
        }
    }

    return(
        <CardContent sx={{
            top:10,
            bgcolor:'#fff',
            position:'fixed',
            zIndex:999,
            overflow:"auto",
            width:'80vw',
            height:'90vh',
            borderRadius:'10px',}}
        >   
            <IconButton onClick={(e) => onClose()} sx={{"&:hover": {
                backgroundColor: theme.palette.violet.light,
                borderRadius:"5px",
                transition: "0.3s"}
            }}>
                <Close/>
            </IconButton> 
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} sx={{height:"100%"}}>
                        <Grid2 item size={{xs:12,md:12}}>
                            <InputLabel id="status-label">وضعیت</InputLabel>
                            <Select fullWidth sx={input_style}  labelId="status-label" value={session.status} onChange={(e) => onChange(e.target.value,'status')}>
                                <MenuItem value={'presence'}>حضور</MenuItem>
                                <MenuItem value={'valid_absence'}>غیبت موجه</MenuItem>
                                <MenuItem value={'invalid_absence'}>غیبت غیرموجه</MenuItem>
                            </Select>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <TextField  fullWidth sx={input_style} label='توضیحات' placeholder='توضیحات' defaultValue={session.description} onChange={(e) => onChange(e.target.value,'description')} multiline/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <div dir="rtl" sx={{width:'100%'}}>
                                <LocalizationProvider fullWidth dateAdapter={AdapterDateFnsJalali}>
                                    <DateTimePicker
                                    fullWidth
                                    label="تاریخ ثبت"
                                    defaultValue={session.session_date!=''?new Date(session.session_date):new Date}
                                    minDate={new Date(1938, 0, 1)}
                                    maxDate={new Date(2075, 11, 31)}
                                    onChange={(val) => onChange(val,'session_date')}
                                    style={input_style}
                                    slotProps={{
                                        desktopPaper: {
                                        dir: 'rtl',
                                        },
                                        mobilePaper: {
                                        dir: 'rtl',
                                        },
                                    }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Button variant='contained' loading={addLoading} sx={{ marginRight: 3.5 }} onClick={(e) => addSession()}>
                                تایید
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
        </CardContent>
    )
}


export default AddSession