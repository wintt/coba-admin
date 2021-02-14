import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'

const UserList = (props) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTMyMTAyODAsInVzZXJJRCI6MSwicm9sZSI6ImFkbWluIn0.DiV3v9J0E6ej1l0TpItyw7zp7w4lT00IZmNd69vn1Kg"
    useEffect(()=> {
      (async ()=> {
            const response = await fetch('http://13.212.221.23:9040/api/users',{
                method:"GET",
                headers:{
                    'Authorization': token
                }
            })
            console.log("response====>",response)
            const data = await response.json();
            setData(data.splice(0,10));
            setIsLoading(false);
       })();

    },[]);
    return (
         <div className="container">
            <h1>User List</h1>
            {
              console.log("data=====>", data)
            }
            {
             isLoading ? <div>Loading</div> : 
            <table className="table table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                     <th scope="col">Role</th>
                    <th scope="col">Phone</th>
                    <th scope="col">City</th>
                    <th scope="col">Country</th>
                    <th scope="col">Update</th>
                </tr>
            </thead>
                 {  
                     data.map((item)=> {
                         return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.role}</td>
                                <td>{item.phone}</td>
                                <td>{item.city}</td>
                                <td>{item.country}</td>
                                <td>
                                    <Button type='button' className="btn btn-secondary">Update</Button>
                                    <Button type='button' className="btn btn-danger">Cancel</Button>
                                </td>
                            </tr>
                         )
                     })
                 } 
             </table>
            }
           
        </div>
    )
}

 export default UserList
