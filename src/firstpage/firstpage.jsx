import React from 'react'
import './walk.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Firstpage() {
  return (
    <div id="bg-walk">
      <Row>
        <Col md={5}>
          <div id="welcome">
            <h2 id="welcome-msg"><span style={{fontSize:'50px'}}>Welcome</span> <span style={{ color: '#0074e0' }} >bunny!</span><span id="msg-nextline">Hop into a world of tools and triumphs!</span></h2><br></br>
          </div>
          {/* <h5 id="guess">Guess what click that <span style={{ color: '#0074e0' }}>arrow</span></h5> */}
        </Col>
        <Col md={7}>
          <div id="center-walk">
            <img src="/Images/done.gif" alt="walking" id="walk" />
            <Link to="/login"> <img src="/Images/rightarrow.png" alt="arrow" id="arrow" />
            </Link>
          </div>
        </Col>
      </Row>


    </div>
  )
}
