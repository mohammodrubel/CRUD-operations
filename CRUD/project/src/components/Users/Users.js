
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';


const Users = () => {
    const [users,setUsers] = useState([])

    // GET DATA FROM DATABASE 

    useEffect (()=>{
        fetch('http://localhost:5000/users')
        .then(Response => Response.json())
        .then(data => setUsers(data))
    },[])

    // DELETE DATA FROM DATABASE
    const handleDeleteDataFromDatabase = id =>{
       const confirmDelete = window.confirm('are you sure you want to delete from database? ')
       if(confirmDelete){
        const url = `http://localhost:5000/users/${id}`
        fetch(url,{
            method:'DELETE',
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert('data Delete from Database successfully')
                const remainingUsers = users.filter(user =>user._id !== id)
                setUsers(remainingUsers)
            }
        })
       }
    }

    return (
        <div>
            <h2>This is Users </h2>
            <ul> 
                {
                    users.map(user => <li key={user._id}>{user.name}  {user.email} <button onClick={()=>
                    handleDeleteDataFromDatabase(user._id)}> delete </button> <Link to={`/users/update/${user._id}`}><button>update</button></Link> </li>)
                }
            </ul>
        </div>
    );
};

export default Users;