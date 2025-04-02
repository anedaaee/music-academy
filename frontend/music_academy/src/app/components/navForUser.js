import { Box,createTheme, alpha, getContrastRatio, Grid2,useMediaQuery
    , Typography,IconButton, 
    Avatar} from "@mui/material";
import { useState } from "react";
import {Class,ClassOutlined,ManageAccounts,ManageAccountsOutlined,Logout,LogoutOutlined} from '@mui/icons-material'



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

const NavForUser = ({ onChangeState}) => {

    const [state,setState] = useState('account')

    const changeState = (state) => {
        setState(state)
        onChangeState(state)
    }
    
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid2 item xs={12} sm={4} sx={{width:isMobile?"100%":"10%"
                    , height: isMobile ? "auto" : "100vh"
                    , display:"flex"
                    , flexDirection:isMobile?"row":"column"
                    , justifyContent:"center"
                    ,alignItems:"flex-start"
                    ,position:isMobile?"fixed":"static"
                    ,zIndex:isMobile?"800":"100"
                    ,bottom: isMobile ? 0 : "auto"
                    ,backgroundColor: isMobile ? "white" : "transparent"
                    }}>
            <Box sx={{display:isMobile?'none':'block',position:'fixed',top:'10px'}}>
                <Avatar alt={'mahjoubiIcon'} src="/icon.jpg" sx={{ width: 100, height: 100 }}/>
                <Typography sx={{color:'#000',fontFamily: 'Amiri',fontSize:'20px',marginTop:'5px'}}>آموزشگاه موسیقی</Typography>
                <Typography sx={{color:'#000',fontFamily: 'Amiri',fontSize:'20px'}}>محجوبی</Typography>
            </Box>
            <IconButton onClick={() => changeState('account')} sx={{"&:hover": {
                backgroundColor: theme.palette.violet.light,
                borderRadius:"5px",
                transition: "0.3s" }
            }}> 
                <Box sx={{display:"flex",
                        justifyContent:"center"
                        ,alignItems:"center"
                        ,padding:"10px"}}>
                    {
                    state=="account"?
                        <ManageAccounts sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    :
                        <ManageAccountsOutlined sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    }
                    {
                    !isMobile?
                        <Typography sx={{color:state=='account'?theme.palette.violet.main:'#000',margin:"10px"}}>پروفایل</Typography>
                    :null
                    }
                </Box>
            </IconButton>
            <IconButton onClick={() => changeState('classes')} sx={{"&:hover": {
                backgroundColor: theme.palette.violet.light,
                borderRadius:"5px",
                transition: "0.3s" }
            }}>  
                <Box sx={{
                        display:"flex"
                        ,justifyContent:"center"
                        ,alignItems:"center"
                        ,padding:"10px"}}>
                    {
                    state=='classes'?
                        <Class sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    :
                        <ClassOutlined sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    }
                    {
                    !isMobile?
                        <Typography sx={{color:state=='classes'?theme.palette.violet.main:'#000'}}>کلاس ها</Typography>
                    :null
                    }
                </Box>
            </IconButton>
            <IconButton onClick={() => {
                changeState('logout')
                localStorage.removeItem('mahjoubi.music.academy.token')
                window.location.href='/views/login/'
            }} sx={{"&:hover": {
                backgroundColor: theme.palette.violet.light,
                borderRadius:"5px",
                transition: "0.3s" }
            }}> 
                <Box sx={{display:"flex",
                        justifyContent:"center"
                        ,alignItems:"center"
                        ,padding:"10px"}}>
                    {
                    state=="logout"?
                        <Logout sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    :
                        <LogoutOutlined sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    }
                    {
                    !isMobile?
                        <Typography sx={{color:state=='logout'?theme.palette.violet.main:'#000',margin:"10px"}}>خروج</Typography>
                    :null
                    }
                </Box>
                        </IconButton>
        </Grid2>
    )
}

export default NavForUser