"use client"; 

import { Box,createTheme, alpha, getContrastRatio, Avatar,TextField,IconButton} from "@mui/material";
import { useEffect, useState } from "react";

import {Check,Close,Edit} from '@mui/icons-material'
import { DataGrid,GridToolbarContainer } from "@mui/x-data-grid";


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
  },
});



const ShowUsers = (props) => {
    const columns = [
      {
        field: 'profile_picture',
        headerName: 'تصویر',
        width: 90,
        headerClassName:'grid-header',
        renderCell: (params) => {
          const profilePictureData = params.row.profile?.blob_data?.data;
          if (profilePictureData) {
            const blob = new Blob([new Uint8Array(profilePictureData)], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            return <Avatar src={imageUrl} />;
          }
          return <Avatar sx={{bgcolor:theme.palette.violet.main}}/>;
        },
      },
      { field: 'username', headerName: 'نام کاربری', width: 150, sortable: true, headerClassName:'grid-header' },
      { field: 'name', headerName: 'نام', width: 150, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header', renderCell: (params) => (params.row.name ? params.row.name : '-')},
      { field: 'last_name', headerName: 'نام خانوادگی', width: 150, sortable: true ,align: 'right',headerAlign: 'right', headerClassName:'grid-header', renderCell: (params) => (params.row.last_name ? params.row.last_name : '-')},
      { field: 'mobile', headerName: 'شماره همراه', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.mobile ? params.row.mobile : '-')},
      { field: 'national_id', headerName: 'کد ملی', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.national_id ? params.row.national_id : '-')},
      { field: 'email', headerName: 'پست الکترونیک', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.email ? params.row.email : '-')},
      { field: 'is_active', headerName: 'وضعیت اکانت', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
        params.row.is_active === 1 ? (
          <Check sx={{ color: 'green' }} />
        ) : (
          <Close sx={{ color: 'red' }} />
        )
      )},
      {
        field: 'action',
        headerName: 'ویرایش',
        headerClassName:'grid-header',
        width: 150,
        renderCell: (params) => (
          <IconButton sx={{'&:hover':{
                        bgcolor:theme.palette.violet.light,
                        transition : '.3s'
                    }}}
                    onClick={(e) => props.onEdit(e,params.row.username)}>
            <Edit sx={{color:theme.palette.violet.main}}/>
          </IconButton>
        ),
      },
    ]
    const [baseUsers,setBaseUsers] = useState([])
    const [users,setUsers] = useState([])
    const [searchValue,setSearchValue] = useState('')
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        setUsers(props.input_users)
        setBaseUsers(props.input_users)
    },[])

    const handleSearch = (event) => {
        
        const value = event.target.value;
        setSearchValue(value);
    
        const result = baseUsers.filter((obj) =>
          Object.values(obj).some((val) => val && val.toString().includes(value))
        );
        setUsers(result);
    };
    const CustomToolbar = () => {
        return(
        <GridToolbarContainer sx={{display:"flex",justifyContent:"right",paddingRight:'18px'}}>
          <TextField
            margin="normal"
            label="جست و جو"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={handleSearch}
            color={theme.palette.violet.main}
            sx={{
                width:"30%",
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
            }}
          />
        </GridToolbarContainer>
        )
    };

    return(
        <Box sx={{color:"black" ,width:"90%",height:"90%",overflow:"auto"}}>            
            <DataGrid
                rows={users}
                columns={columns}
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 15]} 
                pagination
                disableRowSelectionOnClick
                onPaginationModelChange={setPaginationModel}
                slots={{ toolbar: CustomToolbar }}
                getRowId={(row) => row.username}
                sx={{
                direction:"ltr",
                '& .grid-header': {
                    backgroundColor: theme.palette.violet.light, // رنگ پس‌زمینه هدر
                    color: theme.palette.violet.text, // رنگ متن هدر
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                    fontSize: 14, // اندازه فونت سلول‌ها
                    color: theme.palette.violet.text
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#f1f1f1', // رنگ پس‌زمینه ردیف‌ها هنگام هاور
                },
                '& .MuiPaginationItem-root': {
                    color: theme.palette.violet.text
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: theme.palette.violet.text, // رنگ انتخاب شده صفحات
                    color: theme.palette.violet.text,
                },
                boxShadow: 3, // سایه اطراف DataGrid
                borderRadius: 2, // حاشیه گرد
                }}
            />
        </Box>
    )
}

export default ShowUsers