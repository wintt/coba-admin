import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'

const ForgotPassword = (props) => {

    const id  = props.match.params.id
    console.log("getting id ===>", id)
    const history = useHistory();

    const [newPassword, setNewPassword] = useState("")
    const [systemError, setSystemError] = useState("")
    function resetPassword(e){
        e.preventDefault()
        let resetPassword = {newPassword}
        //console.log("newPassword===>", JSON.stringify(resetPassword))
           fetch(`http://13.212.221.23:9040/api/users/${id}/reset_password`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
               'Authorization': "Bearer " + localStorage.getItem('token')
            },
            body:JSON.stringify(resetPassword)
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
                
            }else{
                setSystemError(data.message)
                history.push("../userList")
            }
        })
        .catch(error => {
            //console.error('There was an error!', error);
             setSystemError('There was an error!' + error)
             
        });
    }
    return (
        <div className="main-wrapper">
            <div className="login-form">
                {/* <h1>Login Page</h1> */}
            <Form>
                <FormGroup>
                    <Label className="form-label">New Password</Label>
                    <Input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </FormGroup>
                <div style={{color: "#721c24"}}>{systemError}</div>
                 <Button type="submit" className="custom" onClick={resetPassword}>Submit</Button>
            </Form>
            </div>
        </div>
    )
}

export default ForgotPassword
