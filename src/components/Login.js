import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
        <div className="main-wrapper">
            <div className="login-form">
                {/* <h1>Login Page</h1> */}
            <Form>
                <FormGroup>
                    <Label className="form-label">User Name</Label>
                    <Input type="text" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                    <Label className="form-label">Password</Label>
                    <Input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                 <Link to="./forgotPassword">Forget Password?</Link>
                 <Button type="submit" onClick={userAuth} className="custom">Login</Button>
                 <div className="signup-link">
                    Not a Member <a href="./register"> Signup</a>
                </div>
            </Form>
            </div>
        </div>
    )

}

export default Login