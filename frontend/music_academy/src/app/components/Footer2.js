"use client";
import style from '@/app/assets/styles/footer2.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Phone,AssistantDirection,Instagram, LinkedIn, GitHub} from '@mui/icons-material';
import { Box,Typography,IconButton ,Link} from '@mui/material';
import { useEffect,useState } from 'react';

const Footer2 = () => {

    const [token,setToken] = useState(undefined)
    useEffect(() => {
        setToken(localStorage.getItem('mahjoubi.music.academy.token'))
    } , [])
    return (
        <footer id="footer">
            <div className="footer-top">
            
            <div className="container">
                
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="footer-info">
                                <h3>آموزشگاه موسیقی محجوبی<span>.</span></h3>
                                <p>
                                    <AssistantDirection sx={{marginLeft:"20px"}}/>زنجان خیابان خرمشهر،تقاطع معلم<br/>
                                    <Phone sx={{marginLeft:"20px"}}/> 024 3341 1951<br/>
                                    <Instagram sx={{marginLeft:"20px"}}/> <a style={{color:"#000",textDecoration:"none"}} href='https://www.instagram.com/mahjoubi.music.academy?igsh=MXgyaXgzemxoa3h5eA=='>mahjoubi.music.academy</a><br/>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200.0237645949251!2d48.4999885873569!3d36.66535785821494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff610adb062ed93%3A0xab4ea9398b48690!2z2LLZhtis2KfZhtiMINin2LPYqtin2YYg2LLZhtis2KfZhtiMINin24zYsdin2YY!5e0!3m2!1sfa!2s!4v1743634084648!5m2!1sfa!2s" width="90%" height="300px" style={{border:0,margin:"20px",borderRadius:"20px"}} loading="lazy" ></iframe>
                                </p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 footer-links">
                        <h4>صفحات</h4>
                        <ul>
                        <li><i className="bx bx-chevron-right"></i> <a href="/">خانه</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="/#about">درباره ما</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="/#teachers">اساتید</a></li>
                        {
                            !token?
                                <>
                                    <li><i className="bx bx-chevron-right"></i> <a href="/views/login/">ورود</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="/views/register/">ثبت نام</a></li>
                                </>
                            : <li><i className="bx bx-chevron-right"></i> <a href="/views/login/">پنل کاربری</a></li>
                        }
                        </ul>
                    </div>

                    </div>
                </div>
            </div>
            <div className="footer-bottom" style={{ backgroundColor: '#fff', color: '#000', padding: '20px 0' , width:'100%'}}>
                <div className="container" sx={{width:'100%'}}>
                    <div className="row" style={{ display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" sx={{textAlign:"center"}}>
                            &copy; 2025 Seyyed Ali Nedaaee Oskoee. All Rights Reserved.
                            </Typography>
                        <Box sx={{ display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                            component={Link}
                            href="https://github.com/anedaaee"
                            target="_blank"
                            color="inherit"
                            aria-label="GitHub"
                            sx={{ color: '#000', marginRight: '10px' }}
                        >
                            <GitHub />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://www.linkedin.com/in/anedaaee/"
                            target="_blank"
                            color="inherit"
                            aria-label="LinkedIn"
                            sx={{ color: '#000' }}
                        >
                            <LinkedIn />
                        </IconButton>
                        </Box>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer2