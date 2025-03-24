import { Box,createTheme, alpha, getContrastRatio, Grid2,useMediaQuery
    , Typography,IconButton } from "@mui/material";
import { useState } from "react";
import {Class,ClassOutlined,PointOfSale,PointOfSaleOutlined,ManageAccounts,ManageAccountsOutlined} from '@mui/icons-material'



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

const NavForShowClass = ({ onChangeState}) => {

    const [state,setState] = useState('classes')

    const changeState = (state) => {
        setState(state)
        onChangeState(state)
    }
    
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid2 item xs={12} sm={4} sx={{width:isMobile?"100%":"10%"
                    , height: isMobile ? "4vh" : "100vh"
                    , display:"flex"
                    , flexDirection:isMobile?"row":"column"
                    , justifyContent:"center"
                    ,alignItems:"center"}}>
            
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
            <IconButton onClick={() => changeState('salary')} sx={{"&:hover": {
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
                    state=='salary'?
                        <PointOfSale sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    :
                        <PointOfSaleOutlined sx={{color:theme.palette.violet.main,fontSize:40}}/>
                    }
                    {
                    !isMobile?
                        <Typography sx={{color:state=='salary'?theme.palette.violet.main:'#000'}}>درآمد</Typography>
                    :null
                    }
                </Box>
            </IconButton>
        </Grid2>
    )
}

export default NavForShowClass