import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'

const ChangePassword = (props) => {

    const id  = props.match.params.id
    console.log("getting id ===>", id)
    const history = useHistory();
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [systemError, setSystemError] = useState("")

    let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTMyMTAyODAsInVzZXJJRCI6MSwicm9sZSI6ImFkbWluIn0.DiV3v9J0E6ej1l0TpItyw7zp7w4lT00IZmNd69vn1Kg"


    function changePassword(e){
        e.preventDefault()
        let resetPassword = {currentPassword,newPassword}
        //console.log("newPassword===>", JSON.stringify(resetPassword))
           fetch(`http://13.212.221.23:9040/api/users/${id}/password`,{ 
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Authorization': token
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
                    <Label className="form-label">Current Password</Label>
                    <Input type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}/>
                    <Label className="form-label">New Password</Label>
                    <Input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </FormGroup>
                <div style={{color: "#721c24"}}>{systemError}</div>
                 <Button type="submit" className="custom" onClick={changePassword}>Submit</Button>
            </Form>
            </div>
        </div>
    )
}

export default ChangePassword
