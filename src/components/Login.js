import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login (){
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")

    const [userNameErr, setuserNameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [systemError, setSystemError] = useState("")

    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            history.push("/")
        }
    }, [])

     function userAuth(e) {
        e.preventDefault()
        // console.warn(userName,password)
        const isValid = formValidation()
      
        let loginData = {userName,password}

        if(isValid){
            fetch("http://13.212.221.23:9040/api/login",{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
             
            },
            body:JSON.stringify(loginData)
        }).then(async response => {
            const data = await response.json();
            localStorage.setItem("user-info",JSON.stringify(data))
            
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }else{
               history.push("./userList")
            }
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            setSystemError('There was an error! ' + error)
        });
        // result = await result.json();
        // console.log("result====>", result)
        // if(result){
        //     alert("Login")
        // }
        // localStorage.setItem("user-info",JSON.stringify(result))
        // history.push("./userList")
        }

    }

    const formValidation = () => {
        const userNameErr = {}
        const passwordErr = {}
        let isValid = true

        if(userName.trim().length == 0){
            userNameErr.userNameBlank = "Name can not be blank"
            isValid = false
        }
         if(password.trim().length == 0){
            passwordErr.passwordErrBlank = "Password can not be blank"
            isValid = false
        }

        setuserNameErr(userNameErr)
        setPasswordErr(passwordErr)
        return isValid
    }

    return (
        <div className="main-wrapper">
            <div className="login-form">
                {/* <h1>Login Page</h1> */}
            <Form>
                <FormGroup>
                    <Label className="form-label">User Name</Label>
                    <Input type="text" id="username" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                    {Object.keys(userNameErr).map((key)=>{
                        return <div style={{color: "#721c24"}}>{userNameErr[key]}</div>
                    })}
                    <Label className="form-label">Password</Label>
                    <Input id="password" type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                     {Object.keys(passwordErr).map((key)=>{
                        return <div style={{color: "#721c24"}}>{passwordErr[key]}</div>
                    })}
                </FormGroup>
                <div style={{color: "#721c24"}}>{systemError}</div>
                 <Link to="./forgotPassword">Forgot Password?</Link>
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