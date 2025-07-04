"use client"; 

import { Box,createTheme, alpha, getContrastRatio,ThemeProvider,IconButton} from "@mui/material";
import { useEffect, useState } from "react";

import {Check,Close,MoreVert} from '@mui/icons-material'
import { DataGrid,GridToolbarContainer ,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarExport} from "@mui/x-data-grid";
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

const ShowClasses2 = (props) => {
    const columns = [
      { field: 'id', headerName: 'Class ID', width: 150, sortable: true, headerClassName:'grid-header' },
      { field: 'teacher', headerName: 'Teacher', width: 150, sortable: true,align: 'left',headerAlign: 'left', headerClassName:'grid-header'},
      { field: 'student', headerName: 'Student', width: 150, sortable: true ,align: 'left',headerAlign: 'left', headerClassName:'grid-header'},
      { field: 'teacher_name', headerName: "Teachers's Name", width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.teacher_name ? params.row.teacher_name : '-')},
      { field: 'student_name', headerName: "Student's Name", width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (params.row.student_name ? params.row.student_name : '-')},
      { field: 'session_price', headerName: 'Price Per Session', width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'week_day', headerName: 'Day', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'houre', headerName: 'Houre', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'duration', headerName: 'Duration', width: 100, sortable: true , headerClassName:'grid-header'},
      { field: 'session_left', headerName: "Session's Left", width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'absence_left', headerName: "Absence's Left", width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'teacherـpercentage', headerName: "Teacher's Percentage", width: 150, sortable: true , headerClassName:'grid-header'},
      { field: 'is_finish', headerName: 'Class Status', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
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
    },[])


    const CustomToolbar = () => {
        return(
        <GridToolbarContainer sx={{display:"flex",justifyContent:"left",paddingRight:'18px'}}>
          <GridToolbarDensitySelector/>
          <GridToolbarExport/>
          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton/>
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

export default ShowClasses2