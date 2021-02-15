import React, {useState} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { useHistory } from 'react-router-dom'

const Register = (props) => {
    const [name, setName] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [role,setRole] = useState("")

    const history = useHistory();

    let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTMyMTAyODAsInVzZXJJRCI6MSwicm9sZSI6ImFkbWluIn0.DiV3v9J0E6ej1l0TpItyw7zp7w4lT00IZmNd69vn1Kg"

    async function signUp (e)
    {
        e.preventDefault();
        // console.warn(name,userName,country,city,phoneNo,role)
        let data = {name,userName,country,city,phone,role,password}
        console.log("JSON.stringify(data)=====>", JSON.stringify(data))
        let result = await fetch("http://13.212.221.23:9040/api/users", {
            method: 'POST',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Authorization': token
           },
            
        })
         result = await result.json()
        if(result){
            console.log("Result Found")
        }else{
            console.log("Result not Found")
        }
       
        // console.log("result", result)
        // localStorage.setItem("user-info", JSON.stringify(result))
    }
    return (
      
            <div className="col-sm-6 offset-sm-3">
                <h1>Create Your Account</h1>
                <Form>
                    <FormGroup>
                        <Label className="form-label">Name</Label>
                        <Input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <Label className="form-label">User Name</Label>
                        <Input type="text" className="form-control" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
                        <Label className="form-label">Password</Label>
                        <Input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Label className="form-label">Country</Label>
                        <Input type="text" className="form-control" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                        <Label className="form-label">City</Label>
                        <Input type="text" className="form-control" value={city} onChange={(e)=>setCity(e.target.value)}/>
                        <Label className="form-label">Phone</Label>
                        <Input type="text" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        <Label className="form-label"></Label>
                        <select className="form-select form-control" value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option>Choose Your Role</option>
                            <option value="admin">admin</option>
                            <option value="coordinator">coordinator</option>
                            <option value="localagent">localagent</option>
                            <option value="requestor">requestor</option>
                            <option value="finance">finance</option>
                        </select>
                    </FormGroup>
                   
                     <Button type="submit" className="btn btn-primary" onClick={signUp}>Submit</Button>
                </Form>
            </div>
    )
}

export default Register;