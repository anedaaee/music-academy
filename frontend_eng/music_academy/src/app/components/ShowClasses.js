"use client"; 

import { Box,createTheme, alpha, getContrastRatio,IconButton,ThemeProvider} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import {Check,Close,Edit,Delete,Refresh,Add,MoreVert} from '@mui/icons-material'
import { DataGrid,GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarExport} from "@mui/x-data-grid";
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
})

const ShowClasses = (props) => {
    const columns = [
      { field: 'id', headerName: 'Class ID', width: 100, sortable: true, headerClassName:'grid-header' },
      { field: 'teacher', headerName: 'Teacher', width: 150, sortable: true,align: 'left',headerAlign: 'left', headerClassName:'grid-header'},
      { field: 'student', headerName: 'Student', width: 150, sortable: true ,align: 'left',headerAlign: 'left', headerClassName:'grid-header'},
      { field: 'teacher_name', headerName: "Teacher's name", width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.teacher_name ? params.row.teacher_name : '-')},
      { field: 'student_name', headerName: "Student's name", width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.student_name ? params.row.student_name : '-')},
      { field: 'session_price', headerName: 'Price per Session', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'week_day', headerName: 'Day', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'houre', headerName: 'Houre', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'duration', headerName: 'Duration', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'session_left', headerName: 'Session Left', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'absence_left', headerName: 'Absence Left', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'teacherـpercentage', headerName: 'Teacher Percentage', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'is_finish', headerName: 'state', width: 100, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
        params.row.is_finish === 0 ? (
          <Check sx={{ color: 'green' }} />
        ) : (
          <Close sx={{ color: 'red' }} />
        )
      )},
      { field: 'is_payed', headerName: 'Payment Status', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
        params.row.is_payed === 1 ? (
          <Check sx={{ color: 'green' }} />
        ) : (
          <Close sx={{ color: 'red' }} />
        )
      )},
      {
        field: 'action',
        headerName: 'Actions',
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
        headerName: 'Edit',
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
        headerName: 'Sessions',
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
    const [classes,setClasses] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        setClasses(props.input_classes)
    },[props.input_classes])
    const CustomToolbar = () => {

        return(
        <GridToolbarContainer sx={{display:"flex",justifyContent:"left",paddingRight:'18px'}}>
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
        <Box sx={{color:"black" ,width:"90%",height:"90%",overflow:"auto"}}>  
          <ThemeProvider theme={gridTheme}>
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
          </ThemeProvider>
        </Box>
    )
}

export default ShowClasses