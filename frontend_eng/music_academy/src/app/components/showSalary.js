"use client"; 

import { Box,createTheme, alpha, getContrastRatio,ThemeProvider} from "@mui/material";
import { useEffect, useState } from "react";

import {Check,Close} from '@mui/icons-material'
import { DataGrid,GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarExport } from "@mui/x-data-grid";
import app_config from "@/config/config";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import api from "@/function/api";
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


const ShowSalary = (props) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100, sortable: true, headerClassName:'grid-header' },
        { field: 'class_id', headerName: 'Class ID', width: 100, sortable: true, headerClassName:'grid-header' },
        { field: 'class_count', headerName: 'Number Of Sessions', width: 150, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
        { field: 'valid_absence_count', headerName: 'Valid Absence', width: 150, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
        { field: 'invalid_absence_count', headerName: 'Invalid Absence', width: 150, sortable: true,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
        { field: 'total_earn', headerName: 'Total Earn', width: 150, sortable: true ,align: 'right',headerAlign: 'right', headerClassName:'grid-header'},
        { field: 'teacherـsalary', headerName: "Teacher's Earn", width: 150, sortable: true , headerClassName:'grid-header'},
        { field: 'academyـsalary', headerName: "Academy Earn", width: 150, sortable: true , headerClassName:'grid-header'},
        { field: 'week_day', headerName: 'Day', width: 100, sortable: true , headerClassName:'grid-header'},
        { field: 'houre', headerName: 'Houre', width: 100, sortable: true , headerClassName:'grid-header'},
        { field: 'is_payed', headerName: 'Is Payed?', width: 150, sortable: true , headerClassName:'grid-header', renderCell: (params) => (
            params.row.is_payed === 1 ? (
            <Check sx={{ color: 'green' }} />
            ) : (
            <Close sx={{ color: 'red' }} />
            )
        )},
    ]
    const [teacher,setTeacher] = useState([])
    const [salary,setSalary] = useState([])
    const [startDate,setStartDate] = useState(new Date(2025, 5, 1))
    const [finishDate,setFinishDate] = useState(new Date())
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

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

    const fetch_salary = async (input_teacher) => {
        try{
            const result = await api('get',`/admin/get-salary-report?teacher=${input_teacher}&start_date=${startDate.toISOString().split('T')[0]}&finish_date=${finishDate.toISOString().split('T')[0]}`,{},localStorage.getItem('mahjoubi.music.academy.token'))
            if(result.status == 200){
                const rows = await result.data.body.data.map((row, index) => ({
                    id: index + 1, 
                    ...row,
                }));
                setSalary(rows)
                
            }else{
                props.onError(result?.data?.metadata?.err_english?result.data.metadata.err_english:app_config.ERROR_MESSAGE)
            }
        }catch(err){
          
          throw err
        }
    }
    const calculateDate = async () => {
        const now = new Date();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(now.getMonth() - 2);
        setStartDate(twoMonthsAgo);
    }
    const fetch = async () => {
        try{
            setTeacher(props.teacher)
            await calculateDate()
            await fetch_salary(props.teacher)
        }catch(err){
            throw err
        }
    }

    useEffect(() => {
        try{
            fetch()
        }catch(err){
            props.onError(app_config.ERROR_MESSAGE)
        }
    },[])
    const onChange = async(date,fun) => {
        fun(date)
        await fetch_salary(teacher)
    }
    const CustomToolbar = () => {
        return(
        <GridToolbarContainer sx={{display:"flex",flexDirection:"row",justifyContent:"left",paddingRight:'18px'}}>
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
                <div style={{display:"flex",padding:'10px',justifyContent:"space-evenly"}}>
                    <div dir="ltr" style={{margin:'10px'}}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDateFnsJalali}>
                            <DatePicker
                            fullWidth
                            label="Start Date"
                            defaultValue={new Date(startDate)}
                            minDate={new Date(1938, 0, 1)}
                            maxDate={new Date(2075, 11, 31)}
                            onChange={(val) => onChange(val,setStartDate)}
                            onSelectedSectionsChange={(val) => onChange(val,setStartDate)}
                            style={input_style}
                            slotProps={{
                                desktopPaper: {
                                dir: 'ltr',
                                },
                                mobilePaper: {
                                dir: 'ltr',
                                },
                            }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div dir="ltr" style={{margin:'10px'}}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDateFnsJalali}>
                            <DatePicker
                            fullWidth
                            label="Finish Date"
                            defaultValue={new Date(finishDate)}
                            minDate={new Date(1938, 0, 1)}
                            maxDate={new Date(2075, 11, 31)}
                            onChange={(val) => onChange(val,setFinishDate)}
                            onSelectedSectionsChange={(val) => onChange(val,setFinishDate)}
                            on
                            style={input_style}
                            slotProps={{
                                desktopPaper: {
                                dir: 'ltr',
                                },
                                mobilePaper: {
                                dir: 'ltr',
                                },
                            }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <DataGrid
                    rows={salary}
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

export default ShowSalary