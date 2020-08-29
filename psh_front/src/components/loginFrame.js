import React from 'react'
import { Form, Button} from 'react-bootstrap'

function LoginFrame(){
    

    return(
        <>
            
            <Form>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="your ID" />

                    <Form.Label>PASS</Form.Label>
                    <Form.Control type='password' placeholder="your PASS"/>
                    
                </Form.Group>
            </Form>
            <Button className="info col-12"> 로그인 </Button>
           
        </>


    )

}


export default LoginFrame