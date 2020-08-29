import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginFrame from './components/loginFrame'
import { Button } from 'react-bootstrap'

export default function FirstMain(){

    return (
        <>
            <Container>
               <Row className="align-middle" style={{marginTop:"100px"}}>
                   <Col className="col-6 mx-auto">
                    <h4> 안녕하세요 박성호의 이력서 홈페이지 입니다.</h4>
                    <h4> 아이디는 admin 비밀번호도 admin 입니다. </h4>
                   </Col>
               </Row>


                <Row style={{marginTop:"100px"}}>
                    <Col className="col-6 mx-auto">
                        <LoginFrame></LoginFrame>
                    </Col>
                </Row>
            </Container>

        </>
    )
}