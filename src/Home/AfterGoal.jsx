import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Row, Col,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './homepage.css';  // Ensure this path is correct
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';


export default function AfterGoal() {
    const name = Cookies.get('username_cookies');
    const email = Cookies.get('user_email');
    const type = Cookies.get('user_type');
    const goal = Cookies.get('username_goal');
    const navigate = useNavigate();

    const [sub, setSub] = useState(true);
    const [ats, setAts] = useState(true);
    const [todo, setTodo] = useState(true);
    const [manage, setManage] = useState(true);

    const check = () => {
        if (type !== 'Normal') {
            setAts(false);
            setTodo(false);
            setManage(false);
        }
    };


    useEffect(() => {
        check();
    }, [type]);




    return (
        <div>
            <Row>
                <Col md={2}>
                    <div id='sidebar'>
                        <img src="/Images/mainprofile.png" id='profile-img' alt="Profile" />
                        <p className='profile-name'>{name}</p>
                        <p className='profile-name'>{email}</p>
                        <hr />
                        <div className='btns-in-sidebar'>
                        <Link to='/payment-subscription' className='link-in-sidebar'>Subscribe At ₹ 1</Link>
                       <Link to='/ats-resume'className='link-in-sidebar' disabled={ats}>Build ATS friendly resume</Link>
                        <Link to='/to-do-list' className='link-in-sidebar'> TO DO List</Link>
                        <Link to='/manage-exp' className='link-in-sidebar'>Manage & Track Expenses</Link>
                        </div>
                        <div id='links-in-sidebar'>
                            <Link className='link-id-sidebar'>Update Profile</Link>
                            <Link to='/about-us' className='link-id-sidebar'>About Us</Link>
                        </div>
                    </div>
                </Col>
                <Col md={10}>
                    <div id='display-goal'>
                        <h2 id='text-goal'>{goal}</h2>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
