import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'


const UserList = (props) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(()=> {
      (async ()=> {
            const response = await fetch('http://13.212.221.23:9040/api/users',{
                method:"GET",
                headers:{
                   'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
            const data = await response.json();
            console.log("response data====>",data)
            setData(data.splice(0,10));
            setIsLoading(false);
       })();

    },[]);
    return (
         <div className="container">
             <div class="users-list">
                  <h1>User List</h1>
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
                                    <Link to={"./edit/" + item.id} className="btn btn-secondary">Edit</Link>
                                    <Button type='button' style={{marginLeft:"20px"}}className="btn btn-danger" onClick={async ()=> {
                                        const result = await axios.delete(`http://13.212.221.23:9040/api/users/${item.id}` ,{
                                            headers:{
                                              'Authorization': "Bearer " + localStorage.getItem('token')
                                            }                                           
                                        })
                                         console.log('result==>', result)
                                         if(result.statusText == "OK") {
                                             alert("Successfully Deleted")
                                            window.location.reload();
                                         }
                                    }}>Delete</Button>
                                    <Link to={"./forgotPassword/" + item.id} style={{paddingRight:"20px", paddingLeft:"20px"}}>Forgot Password?</Link>
                                    <Link to={"./changePassword/" + item.id}>Change Password?</Link>
                                </td>
                            </tr>
                         )
                     })
                 } 
             </table>
            }
           
             </div>
        </div>
    )
}

 export default UserList
