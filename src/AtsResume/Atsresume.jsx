import React from 'react';
import './ats.css';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../Loading/loading';

export default function Atsresume() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])


  return (
    loading ? (<Loading />) : (
      <div>
        <Row>
          <Col md={8}>
            <div id="ats-main-bg-left">
              <div id="ats-bg">
                <h4>
                  Build your <span style={{ color: '#0074e1' }}>ATS (Applicant Tracking System)</span> friendly Resume
                </h4>
              </div>
              <h5 id="why-ats">
                So what is <span style={{ color: '#0074e1' }}>ATS Resume?</span>
              </h5>
              <br />
              <ul>
                <li>
                  An <b>ATS (Applicant Tracking System) resume </b> is a specially designed resume to be easily read and processed <br />
                  by software used by employers to manage job applications.
                </li>
                <br />
                <li>
                  It uses simple <b>formatting, keywords </b> from the <b>job description,</b> and a clear structure to ensure your resume gets <br />
                  noticed by both the software and human recruiters.
                </li>
                <br />
                <li>
                  It avoids <b>complex layouts, graphics, or images </b> that might confuse the software.
                </li>
                <br />
                <li>
                  The <b>goal </b> is to make sure <b>your resume passes through the system smoothly and gets you shortlisted for the job. 🌟</b>
                </li>
                <br />
                <li>
                 <b> Make sure to tailor the resume to the specific job you're applying for by including relevant keywords and skills that match the job description.</b></li><br></br>
                <Link to='/ats-resume/build-pdf-resume' id='build-btn'>Let's Build</Link>
              </ul>

            </div>
          </Col>
          <Col md={4}>
            <img src="/Images/hiats.png" alt="Hi Ats" id="hi-ats-img" />
          </Col>
        </Row>
      </div >)


  );
}
