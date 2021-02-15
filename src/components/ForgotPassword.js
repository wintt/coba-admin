import React from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'


const ForgotPassword = () => {
    return (
        <div className="main-wrapper">
            <div className="login-form">
                {/* <h1>Login Page</h1> */}
            <Form>
                <FormGroup>
                    <Label className="form-label">User Name</Label>
                    <Input type="text"/>
                </FormGroup>
                 <Button type="submit" className="custom">Submit</Button>
            </Form>
            </div>
        </div>
    )
}

export default ForgotPassword
