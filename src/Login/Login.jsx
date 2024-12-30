import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { baseurl } from '../Routing';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';



export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            setLoading(true);
            getCookies();

        }, 2000)
    }, [])

    const getCookies = () => {
        const tokens = Cookies.get('authtoken');
        if (tokens == null) {
            toast.warning('Please log in or sign up.');
        }
        else {
            axios.post(`${baseurl}/student-login`, {}, { headers: { 'Authorization': `Bearer ${tokens}` } })
                .then((res) => {
                    if (1) {
                        const usernamejwt = res.data.user_data.name;
                        const goaljwt = res.data.user_data.goal;
                        const mail = res.data.user_data.email;
                        console.log(mail);
                        Cookies.set('user_email',mail,{expires : 5}); 
                        Cookies.set('username_cookies', usernamejwt, { expires: 5 });
                        Cookies.set('username_goal', goaljwt, { expires: 5 });
                        toast.success('Succesfully Logged In');
                        navigate('/home-page');

                    }
                    else {
                        toast.error('Session expired! Please log in or sign up.');
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data);
                })
        }
    }
    const checkDetails = () => {
        if (!user_email || !user_password) {
            toast.error('Please fill both details correctly')
        }
        else {
            const data = { user_email, user_password };
            console.log(data)
            axios.post(baseurl + '/student-login', data)
                .then((res) => {
                    const token = res.data.token;
                    // const goal = res.data.goal;  
                    if (token) {
                        Cookies.set('authtoken', token, {
                            expires: 5, // Token will expire in 5 days
                            secure: true,
                            sameSite: 'Strict',
                        });
                        const usernamejwt = res.data.user_data.name;
                        Cookies.set('username_cookies', usernamejwt, { expires: 5 });

                        const goaljwt = res.data.user_data.goal;
                        Cookies.set('username_goal', goaljwt, { expires: 5 });


                        const mail = res.data.user_data.email;
                        Cookies.set('user_email',mail,{expires : 5});
                        

                        const user_type = res.data.user_data.usertype;
                        Cookies.set('user_type',user_type,{expires : 5}); 

                        toast.success(res.data.message);
                        navigate('/home-page');
                    }
                })
                .catch((err) => {
                    const errorMessage = err?.response?.data || 'An unknown error occurred';
                    toast.error(errorMessage);
                })
        }
    }

    function togglePasswordVisibility() {
        setPasswordVisible(prevState => !prevState);
    }

    return (

        <div>
            {loading ? (<div style={{ margin: '0', padding: '0', width: '100%', height: '100vh' }}>

                <Row style={{ margin: '0', width: '100%' }}>
                    <Col md={7} style={{ padding: '0' }}>

                        <div id='intro'>
                            <div id="hand">
                                <Link to="/about-us"><img src="/Images/hand.png" alt="hand" id="hand" /><p id="about">About Us</p></Link>
                            </div>
                            <h2 id="introtext">
                                Designed for OWN Purpose !
                            </h2><br />
                        </div>
                        <div>
                        </div>
                    </Col>
                    <Col md={5} style={{ padding: '0' }}>
                        <div id="bgg">
                            <div id="logincard">
                                <h2 style={{ fontSize: 'bolder' }} id='login-text'>Welcome Back</h2>
                                <h6 id="text-secure">Securely Access your account</h6>
                                <input type="email" className='form form-control' id="textbox-login"
                                    onChange={(e) => { setUser_email(e.target.value) }}
                                    placeholder='Enter your Email' required />
                                <input type={passwordVisible ? "text" : "password"} className='form form-control'
                                    id="password" placeholder='Enter your password'
                                    onChange={(e) => { setUser_password(e.target.value) }}
                                    required />
                                <img
                                    src={passwordVisible ? "/Images/visibility.png" : "/Images/vis.png"}
                                    id="logo-vis"
                                    onClick={togglePasswordVisibility}
                                />
                                <Link to="/forgot-password"><h6 id="forgot">Forgotten Password?</h6></Link>
                                <button className="btn-submit" onClick={checkDetails}>Login</button>
                                <button type="submit" className="btn-submit-google">
                                    <img
                                        src="/Images/g-trs.png"
                                        alt="Google G"
                                        id="pass-icon"
                                        style={{ width: '20px', height: '20px', marginBottom: "1%" }} />  &nbsp;
                                    Sign Up
                                </button>
                                <div id="sign">
                                    <h6> Dont have an account ?<span style={{ color: '#0074e1' }}>   <Link to="/sign-up"> Create Account</Link></span></h6>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>) : (<div><img src="/Images/spinner.gif" id="spinner" />
                <br></br>
                <h6 id="load">Loading....</h6></div>)}
        </div>
    );
}
