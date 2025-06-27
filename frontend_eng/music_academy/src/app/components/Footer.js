"use client";
import style from '@/app/assets/styles/footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Phone,AssistantDirection,Instagram, LinkedIn, GitHub,Telegram} from '@mui/icons-material';
import { Box,Typography,IconButton ,Link} from '@mui/material';
import { useEffect,useState } from 'react';

const Footer = () => {
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
                                <h3>Nasim Kashanian English Academy<span>.</span></h3>
                                <p>
                                    <AssistantDirection sx={{marginLeft:"20px"}}/>Zanjan<br/>
                                    <Phone sx={{marginLeft:"20px"}}/> 0919 341 2504<br/>
                                    <IconButton
                                                                component={Link}
                                                                href="https://github.com/anedaaee"
                                                                target="_blank"
                                                                color="inherit"
                                                                aria-label="GitHub"
                                                                sx={{ color: '#000', marginRight: '10px' }}
                                                            >
                                                                <Telegram />
                                                            </IconButton>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d742.6318200590939!2d48.503655907786516!3d36.69767778105643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sam!4v1750885869092!5m2!1sen!2sam" width="300" height="150" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 footer-links">
                        <h4>Pages</h4>
                        <ul>
                        <li><i className="bx bx-chevron-right"></i> <Link href="/">Home</Link></li>
                        <li><i className="bx bx-chevron-right"></i> <Link href="/#about">About Us</Link></li>
                        <li><i className="bx bx-chevron-right"></i> <Link href="/#teachers">Teachers</Link></li>
                        {
                            !token?
                                <>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="/views/login/">Login</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="/views/register/">Register</Link></li>
                                </>
                            : <li><i className="bx bx-chevron-right"></i> <Link href="/views/login/">Data Panel</Link></li>
                        }
                        </ul>
                    </div>

                    </div>
                </div>
            </div>
            <div className="footer-bottom" style={{ backgroundColor: '#dbdbdb', color: '#bca220', padding: '20px 0' , width:'100%'}}>
                <div className="container" sx={{width:'100%'}}>
                    <div className="row" style={{ display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" sx={{textAlign:"center",color:"#55179b"}}>
                            &copy; 2025 Seyyed Ali Nedaaee Oskoee. All Rights Reserved.
                            </Typography>
                        <Box sx={{ display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
                        
                        <IconButton
                            component={Link}
                            href="https://github.com/anedaaee"
                            target="_blank"
                            color="inherit"
                            aria-label="GitHub"
                            sx={{ color: '#55179b', marginRight: '10px' }}
                        >
                            <GitHub />
                        </IconButton>
                        <Link href="https://ali.nedaaee.com/" style={{textDecoration:"none",color:'#55179b'}}> ali.nedaaee.com </Link>
                        <IconButton
                            component={Link}
                            href="https://www.linkedin.com/in/anedaaee/"
                            target="_blank"
                            color="inherit"
                            aria-label="LinkedIn"
                            sx={{ color: '#55179b' }}
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

export default Footer