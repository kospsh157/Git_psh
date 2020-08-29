import React from 'react';
import {Button, Jumbotron, Nav} from 'react-bootstrap'
import LoginFrame from './components/loginFrame'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
   <>
     <Jumbotron>
      <h2 style={{textAlign:"center", fontFamily:"sans-serif", fontWeight:"bold", color:"#ffc72b"}}> 안녕하세요. 박성호의 이력서 관리 페이지 입니다. </h2>
      <h3 style={{textAlign:"center", fontFamily:"sans-serif", fontWeight:"bold", color:"#ffc72b"}}> 부족하지만 잘 부탁드립니다. </h3>

     </Jumbotron>
     <Nav defaultActiveKey="/home" className ="flex-column">
      <Nav.Link href ="/home"> 자기소개 </Nav.Link>
      <Nav.Link href ="/board"> 게시판 구현 </Nav.Link>
      <Nav.Link href ="/chart"> 차트 API 구현 </Nav.Link>
     </Nav>
    
     <LoginFrame>
       
     </LoginFrame>




   </>

  );
}

export default App;
