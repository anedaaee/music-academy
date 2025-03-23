"use client";
import { Grid2,Avatar,Input,Box,Button,createTheme,alpha,getContrastRatio,CardContent,LinearProgress,TextField,Select,MenuItem, IconButton} from "@mui/material";
import { Info,AccountCircle,Phone,Email,QrCode,LocationOn,Close } from "@mui/icons-material";
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

const ShowUser = ({username,onError,onClose}) => {
    const [editUserLoading,setEditUserLoading] = useState(false)
    const [user,setUser] = useState({})
    const [editMode,setEditMode] = useState(false)
    const [editLoading,setEditLoading] = useState(false)
    const [deleteLoading,setDeleteLoading] = useState(false)

    const fileInputRef = useRef(null);


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

    const fetch_user = async (username) => {
        
        try{
          
            const result = await api('get',`/admin/get-user?username=${username}`,{},localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setUser(result.data.body.data)
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
            setEditUserLoading(true)
            await fetch_user(username)
            setEditUserLoading(false)
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

    const updateUser = async() => {
        setEditLoading(true)
        try{
            const data = {
                username:user.username,
                role:user.role,
                name:user.name,
                last_name:user.last_name,
                mobile:user.mobile,
                phone:user.phone,
                email:user.email,
                address:user.address,
                national_id:user.national_id
            }
            const result = await api('patch',`/admin/update-user`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setUser(result.data.body.data)
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

    const deleteUser = async() => {
        setDeleteLoading(true)
        try{
            const data = {
                username:user.username,
            }
            const result = await api('delete',`/admin/delete-user`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setUser(result.data.body.data)
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

    const refactoreUser = async() => {
        setDeleteLoading(true)
        try{
            const data = {
                username:user.username,
            }
            const result = await api('patch',`/admin/refactore-user`,data,localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                setUser(result.data.body.data)
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

    const updateProfile = async(e) => {
        
        try{
            const file = e.target.files[0]
            
            
            if(file){
                
                const fileName = file.name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];

                if (!allowedExtensions.includes(fileExtension)) {
                    onError('فرمت فایل انتخابی اشتباه است. باید یکی از svg bmp webp gif png jpeg jpg باشد.')
                    return;
                }
                const formData = new FormData();
                formData.append("image", file);
                
                
                const result = await api('post',`/admin/add-profile?username=${user.username}`,formData,localStorage.getItem('mahjoubi.music.academy.token'),'multipart/form-data')
                if(result.status == 200){
                    setUser(result.data.body.data)
                }else{
                    onError(result.data.metadata.err_persian)
                }
            
            }else{
                onError('فایل انخاب نشده است.')
            }
            

        }catch(err){
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
                <>
                <Input
                    type="file"
                    inputRef={fileInputRef}
                    sx={{ display: "none" }}
                    onChange={(e) => updateProfile(e)}
                />
                <Avatar alt={user.username} src={imageUrl} sx={{ width: 100, height: 100 }} onClick={() => fileInputRef.current.click()}/>
                </>
                
            )
            }else{
            return(
                <>
                <Input
                    type="file"
                    inputRef={fileInputRef}
                    sx={{ display: "none" }}
                    onChange={(e) => updateProfile(e)}
                />
                <Avatar alt={user.username} {...stringAvatar(user.username)} sx={{ width: 100, height: 100 }} onClick={() => fileInputRef.current.click()}/>
                </>
                
            )
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
            editUserLoading?
                <LinearProgress color="primary" size={100} sx={{color: "violet.contrastText",width:"80%",height:'.5%'}}/>
            :   
                editMode?
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} >
                        <Grid2 item size={{xs:12,md:12}}>
                            <GetAvatar user={user}/>
                        </Grid2> 
                        <Grid2 item size={{xs:12,md:12}}>
                            <TextField  fullWidth sx={input_style} label='نام کاربری' placeholder='نام کاربری' defaultValue={user.username} onChange={(e) => onChange(e.target.value,'username')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='نام' placeholder='نام' defaultValue={user.name} onChange={(e) => onChange(e.target.value,'name')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='نام خانوداگی' placeholder='نام خانوداگی' defaultValue={user.last_name} onChange={(e) => onChange(e.target.value,'last_name')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='شماره همراه' placeholder='شماره همراه' defaultValue={user.mobile} onChange={(e) => onChange(e.target.value,'mobile')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='شماره منزل' placeholder='شماره منزل' defaultValue={user.phone} onChange={(e) => onChange(e.target.value,'phone')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='پست الکترونیک' placeholder='پست الکترونیک' defaultValue={user.email} onChange={(e) => onChange(e.target.value,'email')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <TextField  fullWidth sx={input_style} label='کد ملی' placeholder='کد ملی' defaultValue={user.national_id} onChange={(e) => onChange(e.target.value,'national_id')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <TextField  fullWidth sx={input_style} label='آدرس' placeholder='آدرس' defaultValue={user.address} onChange={(e) => onChange(e.target.value,'address')}/>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <Select fullWidth sx={input_style}  label='نقش کاربری' value={user.role} onChange={(e) => onChange(e.target.value,'role')}>
                                <MenuItem value={1}>کاربر</MenuItem>
                                <MenuItem value={2}>استاد</MenuItem>
                                <MenuItem value={3}>مدیر سایت</MenuItem>
                            </Select>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <Button variant='contained' style={{backgroundColor:'transparent',border:'1px solid red',color:'red'}} sx={{ marginRight: 3.5 }} onClick={(e) => setEditMode(false)}>لغو</Button>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <Button variant='contained'  sx={{ marginRight: 3.5 }} loading={editLoading} onClick={(e) => updateUser()}>
                                ثبت
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
                :
                <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%' , display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid2 container spacing={2} >
                        <Grid2 item size={{xs:12,md:12}}>
                            <GetAvatar user={user}/>
                        </Grid2> 
                        <Grid2 item size={{xs:12,md:12}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountCircle sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام کاربری : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.username}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.name?user.name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Info sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>نام خانوادگی : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.last_name?user.last_name:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Phone sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شماره همراه: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.mobile?user.mobile:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Phone sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{marginLeft:'10px',color:theme.palette.primary.light}}>شماره منزل: <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.phone?user.phone:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Email sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>پست الکترونیک : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.email?user.email:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:6}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <QrCode sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>کد ملی : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.national_id?user.national_id:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn sx={{color:theme.palette.violet.light}}/>
                                <h3 style={{color:theme.palette.primary.light}}>آدرس : <span style={{color:'#939393',fontWeight:'lighter',color:theme.palette.primary.dark}}>{user.address?user.address:'---'}</span></h3>
                            </Box>
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
                        {
                            user.is_active?
                            <Button variant='contained' loading={deleteLoading} style={{backgroundColor:'transparent',border:'1px solid red',color:'red'}} sx={{ marginRight: 3.5 }} onClick={(e) => deleteUser()}>حذف</Button>
                            :
                            <Button variant='contained' loading={deleteLoading} style={{backgroundColor:'transparent',border:'1px solid green',color:'green'}} sx={{ marginRight: 3.5 }} onClick={(e) => refactoreUser()}>بازسازی</Button>
                        }
                        </Grid2>
                        <Grid2 item size={{xs:12,md:12}}>
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


export default ShowUser