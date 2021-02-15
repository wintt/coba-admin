import React, {useState, useEffect} from 'react'
import {Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { Link } from 'react-router-dom'

const EditUser = (props) => {
     const id  = props.match.params.id
     console.log("getting id ===>", id)

    const [name, setName] = useState("")
    // const [userName, setuserName] = useState("")
    // const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    // const [role,setRole] = useState("")
 
    let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTMyMTAyODAsInVzZXJJRCI6MSwicm9sZSI6ImFkbWluIn0.DiV3v9J0E6ej1l0TpItyw7zp7w4lT00IZmNd69vn1Kg"
    
    const getData=()=>{fetch(`http://13.212.221.23:9040/api/users/${id}`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
       }
    })
    .then(function(response){
    return response.json();
    })
    .then(function(data) {
    console.log("data===>", data)
    setName(data.name);
    // setuserName(data.username);
    // setPassword(data.password);
    setCountry(data.country);
    setCity(data.city)
    setPhone(data.phone)
    // setRole(data.role)
    });
  }
  useEffect(()=>{
    getData()
  },[])

  async function updateUser (e) {
      e.preventDefault();
      console.warn(name,country,city,phone)
      let data = {name,country,city,phone}
      let result = await fetch(`http://13.212.221.23:9040/api/users/${id}`, {
            method: 'PUT',
            body:JSON.stringify(data),
            headers:{
                "Content-Type": 'application/json',
                "Accept": "application/json",
                'Authorization': token
           },
        })
        result = await result.json()
        console.log("updated data result ===>", result)
        if(result){
            alert("Updated Data")
            window.location.href = "../userList";
        }else{
            
        }
  }

    return (
       <div className="main-wrapper">
            <div className="container">
            <div className="register-form">
                <h1>Update Your Data</h1>
                <Form>
                    <FormGroup>
                        <Label className="form-label">Name</Label>
                        <Input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <Label className="form-label">Country</Label>
                        <Input type="text" className="form-control" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                        <Label className="form-label">City</Label>
                        <Input type="text" className="form-control" value={city} onChange={(e)=>setCity(e.target.value)}/>
                        <Label className="form-label">Phone</Label>
                        <Input type="text" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        <Label className="form-label"></Label>
                    </FormGroup>
                     <Button type="submit" className="btn btn-primary" onClick={updateUser}>Update User</Button>
                     <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
                </Form>
            </div>
        </div>
       </div>
    )
}

 export default EditUser
