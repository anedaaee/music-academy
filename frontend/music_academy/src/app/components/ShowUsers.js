"use client"; 

import { Box,createTheme, alpha, getContrastRatio, Avatar,TextField,IconButton,ThemeProvider} from "@mui/material";
import { useEffect, useState } from "react";

import {Check,Close,Edit,Add} from '@mui/icons-material'
import { DataGrid,GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarExport } from "@mui/x-data-grid";
import {faIR} from  "@mui/x-data-grid/locales"

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

const gridTheme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.2),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
      text : '#451f6d'
    },
  },
},faIR)

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
      { field: 'name', headerName: 'نام', width: 200, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header', renderCell: (params) => (params.row.name ? params.row.name : '-')},
      { field: 'last_name', headerName: 'نام خانوادگی', width: 200, sortable: true ,align: 'right',headerAlign: 'right', headerClassName:'grid-header', renderCell: (params) => (params.row.last_name ? params.row.last_name : '-')},
      { field: 'mobile', headerName: 'شماره همراه', width: 200, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.mobile ? params.row.mobile : '-')},
      { field: 'national_id', headerName: 'کد ملی', width: 200, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.national_id ? params.row.national_id : '-')},
      { field: 'email', headerName: 'پست الکترونیک', width: 200, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.email ? params.row.email : '-')},
      { field: 'is_active', headerName: 'وضعیت اکانت', width: 200, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
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
    const [users,setUsers] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        setUsers(props.input_users)
    },[])

    const CustomToolbar = () => {
        return(
        <GridToolbarContainer sx={{display:"flex",justifyContent:"right",paddingRight:'18px'}}>
          <GridToolbarDensitySelector/>
          <GridToolbarExport/>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
          <IconButton onClick={(e) => props.onAdd()} sx={{"&:hover": {
                        backgroundColor: theme.palette.violet.light,
                        borderRadius:"5px",
                        transition: "0.3s"}
                    }}>
                        <Add color="primary"/>
          </IconButton>
        </GridToolbarContainer>
        )
    };

    return(
        <Box sx={{color:"black" ,width:"90%",height:"90%"}}>      
          <ThemeProvider theme={gridTheme}> 
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
                boxShadow: 3,
                borderRadius: 2, 
                }}
            />
          </ThemeProvider>      
        </Box>
    )
}

export default ShowUsers