"use client";
import { Grid2,Button,createTheme,alpha,getContrastRatio,CardContent,TextField,IconButton} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
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

const AddUser = ({onClose,onError}) => {
    const [user,setUser] = useState({
        username:'',
        password:''
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

    const addUser = async() => {
        setAddLoading(true)
        try{
            const result = await api('post',`/admin/register-user`,user,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                onClose()
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
          setUser({
            ...user,
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
                            <TextField  fullWidth sx={input_style} label='نام کاربری' placeholder='نام کاربری' defaultValue={user.username} onChange={(e) => onChange(e.target.value,'username')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <TextField  fullWidth sx={input_style} label='رمز عبور' placeholder='رمز عبور' defaultValue={user.password} onChange={(e) => onChange(e.target.value,'password')} type="password"/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Button variant='contained' loading={addLoading} sx={{ marginRight: 3.5 }} onClick={(e) => addUser()}>
                                تایید
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
        </CardContent>
    )
}


export default AddUser