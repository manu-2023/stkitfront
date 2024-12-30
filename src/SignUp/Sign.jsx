    import React, { useState, useEffect, useDebugValue } from 'react';
    import './Signin.css';
    import { Container, Row, Col } from 'react-bootstrap';
    import { Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { baseurl } from '../Routing';
    import { Toaster, toast } from 'sonner';

    export default function Sign() {
        const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const [useremail, setUseremail] = useState('');
        const [userPassword, setUserpassword] = useState('');
        const [userdob, setUserdob] = useState('');
        const [userotp, setUserOtp] = useState('');
        const [usernumber, setUserNumber] = useState('');
        const [genOtpDisabled, setGenoOtpdisabled] = useState(false);
        const [submitOtpDisabled, setSumbitOtpdisabled] = useState(true);
        const [submission, setSubmission] = useState(true);
        const [emailSubmit, setemailSubmit] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => {
                setLoading(true);
            }, 1000);
        }, []);

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const validDate = (dob) => {
            const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            if (!dateRegex.test(dob)) {
                return false;
            }

            const [year, month, day] = dob.split('-').map(Number);
            const date = new Date(year, month - 1, day);

            return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
        };

        const validatePhoneNumber = (number) => {
            const phoneNumberRegex = /^[6-9]\d{9}$/;
            return phoneNumberRegex.test(number);
        };

        const validPassword = (userPassword)=>{
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(userPassword);
        }
        const validateUserName = (userName) => {
            const nameRegex = /^[a-zA-Z\s]+$/;
            
            if (userName.length <= 3) {
                return false; 
            } 
            if (!nameRegex.test(userName)) 
                { 
                    return false; 
                } 
            return true
        }

        const getOtp = (e) => {
            e.preventDefault();
            if (!validateEmail(useremail)) {
                toast.error('Enter a valid email');
            } else {
                toast('Please Wait..... Sending OTP');
                setGenoOtpdisabled(true);
                setSumbitOtpdisabled(false);
                setemailSubmit(true);
                axios.post(baseurl + '/api/otp/generate-otp', { email: useremail })
                    .then((res) => {
                        toast.success('OTP sent successfully...Please Check Mail');
                    })
                    .catch((err) => {
                        toast.error('Something went wrong, please try again');
                        setGenoOtpdisabled(false);
                        setemailSubmit(false);
                        console.log(err);
                    });
            }
        };

        const checkOtp = () => {
            console.log(userotp);
            if (userotp.length === 6) {
                setSumbitOtpdisabled(true);
                toast('Please wait, verifying...');
                axios.post(baseurl + `/api/otp/verify-otp`, { email: useremail, enterdOTP: userotp })
                    .then((res) => {
                        setSumbitOtpdisabled(true);
                        setSubmission(false);
                        toast.success(res.data.message);
                    })
                    .catch((err) => {
                        if (err.response && err.response.data) {
                            setSumbitOtpdisabled(false);
                            toast.error(err.response.data.error);
                        } else {
                            toast.error('An error occurred, please try later');
                        }
                    });
            } else {
                toast.error('OTP mismatched');
            }
        };

        const submitDetails = (e) => {
            e.preventDefault();
            if (!username || !userdob || !usernumber || !userPassword) {
                toast.error('Please fill in all details');
            } 
            if(!validateUserName(username)){
                toast.error("Name should be Atleast 4 Characters and No digtits and Special Character are allowed")
            }else if (!validDate(userdob)) {
                toast.error('Please enter a valid date of birth');
            } else if (!validatePhoneNumber(usernumber)) {
                toast.error('Please enter a valid phone number');
            }
            else if(!validPassword(userPassword)){
                toast.error('Password must be at least 8 characters long and include at least one letter and one number')

            } 
            else {
                const userdata = {
                    user_name: username,
                    user_dob: userdob,
                    user_password: userPassword,
                    user_number: usernumber,
                    user_email: useremail,
                    
                };
                axios.post(baseurl+'/addNewUser',userdata)
                .then((res)=>{
                    toast.success(res.data.message);
                    navigate('/login')
                    
                })
                .catch((err)=>{
                    toast.error(err.data.message)
                })
                console.log('User data submitted:', userdata);
            }
        };

        return (
            <div>
                {loading ? (
                    <div id="bg-sign">
                        <div style={{ backgroundColor: 'blue' }}></div>
                        <div id="card">
                            <h3 style={{ marginTop: '4%', marginLeft: '3%' }}><i>Get <span style={{ color: '#0074e1' }}>Started</span></i></h3>
                            <form>
                                <Container>
                                    <Row>
                                        <Col md={8}>
                                            <div id="card-input-signup">
                                                <input type="text" className="form form-control" id="textbox-sign"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    placeholder="Name" />

                                                <label id="dob">Date of birth</label>
                                                <input type="text" className="form form-control" id="textbox-date"
                                                    onChange={(e) => setUserdob(e.target.value)}
                                                    value={userdob}
                                                    pattern="\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])"
                                                    placeholder="yyyy-mm-dd " />

                                                <input type="email" className="form form-control" id="textbox-sign"
                                                    onChange={(e) => setUseremail(e.target.value)}
                                                    disabled={emailSubmit}
                                                    placeholder="E-mail" />

                                                <input type="number" className="form form-control" id="textbox-sign"
                                                    onChange={(e) => setUserOtp(e.target.value)}
                                                    placeholder="OTP" />
                                                <input type="tel" className="form form-control" id="textbox-sign"
                                                    onChange={(e) => setUserNumber(e.target.value)}
                                                    pattern="[6-9]{1}[0-9]{9}" placeholder="Contact Number" />
                                                <input type="password" className="form form-control" id="textbox-sign"
                                                    onChange={(e) => setUserpassword(e.target.value)}
                                                    placeholder="Password" />

                                                <button className="btn btn-outline-dark" id="otp-btn" onClick={getOtp} disabled={genOtpDisabled}>
                                                    {genOtpDisabled ? 'Generting OTP' : 'Generate OTP'}
                                                </button>
                                                <button className="btn btn-outline-success" id="submit-otp" onClick={checkOtp} disabled={submitOtpDisabled}>
                                                    Submit OTP
                                                </button>
                                                <button className="btn btn-primary" id="sign-btn" onClick={submitDetails} disabled={submission}>
                                                    {submission ? 'Please complete OTP Process' : 'Sign UP'}
                                                </button>

                                                <h6 id="already">Already have an &nbsp;<span><Link to="/login">
                                                    Account
                                                </Link></span></h6>
                                            </div>
                                        </Col>
                                        <Col md={4} style={{ padding: 0, margin: 0 }} id="col4-sign">
                                            <div id="signup-walking" style={{ color: '#386163' }}>
                                                <img src="Images/VidCycle.gif" id="walksign-img" alt="Walking Animation" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div><img src="/Images/spinner.gif" id="spinner" alt="Loading Spinner" />
                        <br />
                        <h6 id="load">Loading....</h6>
                    </div>
                )}
            </div>
        );
    }
