"use client"; 

import { Box,createTheme, alpha, getContrastRatio,TextField,IconButton} from "@mui/material";
import { useEffect, useState } from "react";

import {Check,Close,Edit,Delete,Refresh,Add,MoreVert} from '@mui/icons-material'
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



const ShowClasses = (props) => {
    const columns = [
      { field: 'id', headerName: 'شناسه کلاس', width: 50, sortable: true, headerClassName:'grid-header' },
      { field: 'teacher', headerName: 'استاد', width: 150, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
      { field: 'student', headerName: 'هنرجو', width: 150, sortable: true ,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
      { field: 'teacher_name', headerName: 'نام استاد', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.teacher_name ? params.row.teacher_name : '-')},
      { field: 'student_name', headerName: 'نام هنرجو', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.student_name ? params.row.student_name : '-')},
      { field: 'session_price', headerName: 'قیمت هر جلسه', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'week_day', headerName: 'روز', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'houre', headerName: 'ساعت', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'duration', headerName: 'مدت زمان', width: 50, sortable: true , headerClassName:'grid-header'},
      { field: 'session_left', headerName: 'جلسات باقی مانده', width: 50, sortable: true , headerClassName:'grid-header'},
      { field: 'absence_left', headerName: 'غیبت های باقی مانده', width: 50, sortable: true , headerClassName:'grid-header'},
      { field: 'teacherـpercentage', headerName: 'درصد استاد', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'is_finish', headerName: 'وضعیت کلاس', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
        params.row.is_finish === 0 ? (
          <Check sx={{ color: 'green' }} />
        ) : (
          <Close sx={{ color: 'red' }} />
        )
      )},
      { field: 'is_payed', headerName: 'وضعیت پرداخت', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
        params.row.is_payed === 1 ? (
          <Check sx={{ color: 'green' }} />
        ) : (
          <Close sx={{ color: 'red' }} />
        )
      )},
      {
        field: 'action',
        headerName: 'عملیات',
        headerClassName:'grid-header',
        width: 150,
        renderCell: (params) => (
          <IconButton sx={{'&:hover':{
                        bgcolor:theme.palette.violet.light,
                        transition : '.3s'
                    }}}
                    onClick={(e) => props.onDelete(params.row.id,params.row.is_finish?'refactore':'delete')}>
            {
                params.row.is_finish?
                    <Refresh sx={{color:'green'}}/>
                :
                    <Delete sx={{color:'red'}}/>
            }
          </IconButton>
        ),
      },
      {
        field: 'edit',
        headerName: 'ویرایش',
        headerClassName:'grid-header',
        width: 150,
        renderCell: (params) => (
            <IconButton sx={{'&:hover':{
                            bgcolor:theme.palette.violet.light,
                            transition : '.3s'
                        }}}
                        onClick={(e) => props.onEdit(e,params.row.id)}>
                <Edit sx={{color:theme.palette.violet.main}}/>
            </IconButton>
        ),
      },
      {
        field: 'sessions',
        headerName: 'جلسات',
        headerClassName:'grid-header',
        width: 150,
        renderCell: (params) => (
            <IconButton sx={{'&:hover':{
                            bgcolor:theme.palette.violet.light,
                            transition : '.3s'
                        }}}
                        onClick={(e) => props.onSession(e,params.row.id)}>
                <MoreVert sx={{color:theme.palette.violet.main}}/>
            </IconButton>
        ),
      },
    ]
    const [basesClasses,setBaseClasses] = useState([])
    const [classes,setClasses] = useState([])
    const [searchValue,setSearchValue] = useState('')
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        setClasses(props.input_classes)
        setBaseClasses(props.input_classes)
    },[])

    const handleSearch = (event) => {
        
        const value = event.target.value;
        setSearchValue(value);
    
        const result = basesClasses.filter((obj) =>
          Object.values(obj).some((val) => val && val.toString().includes(value))
        );
        setClasses(result);
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
          <IconButton onClick={(e) => props.onAdd()} sx={{"&:hover": {
              backgroundColor: theme.palette.violet.light,
              borderRadius:"5px",
              transition: "0.3s"}
          }}>
              <Add/>
          </IconButton>
        </GridToolbarContainer>
        )
    };

    return(
        <Box sx={{color:"black" ,width:"90%",height:"90%",overflow:"auto"}}>            
            <DataGrid
                rows={classes}
                columns={columns}
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 15]} 
                pagination
                disableRowSelectionOnClick
                onPaginationModelChange={setPaginationModel}
                slots={{ toolbar: CustomToolbar }}
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
                }}
            />
        </Box>
    )
}

export default ShowClasses