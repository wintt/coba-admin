import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'

function Login (){
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/")
        }
    }, [])

    async function userAuth(e){
        e.preventDefault()
        console.warn(userName,password)
        let loginData = {userName,password}

        

        let result = await fetch("http://13.212.221.23:9040/api/login",{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
             
            },
            body:JSON.stringify(loginData)
        });
        result = await result.json();
        console.log("result====>", result)
        if(result){
            alert("Login")
        }
        localStorage.setItem("user-info",JSON.stringify(result))
        history.push("/")
    }


    return (
        <div className="col-sm-6 offset-sm-3">
            <h1>Login Page</h1>
            <Form>
                <FormGroup>
                    <Label className="form-label">User Name</Label>
                    <Input type="text" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                    <Label className="form-label">Password</Label>
                    <Input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                 <Button type="submit"  onClick={userAuth}>Submit</Button>
            </Form>
        </div>
    )

}

export default Login