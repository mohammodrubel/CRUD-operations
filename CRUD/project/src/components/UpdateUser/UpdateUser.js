
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user,setUser] = useState({})

    const {id} = useParams()

    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
        .then(response => response.json())
        .then(data => setUser(data))
    },[])
    // update 
    const handleOneChange = e => {
        const updateName = (e.target.value)
        const updateUser = {name:updateName,email:user.email}
        setUser(updateUser)
    }

    const handleupdateForm = e =>{
        const url = `http://localhost:5000/users/${id}`
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>  {
            if(data.modifiedCount >0){
                alert('updated successfully')
                setUser({})
            }
        })
        e.preventDefault()
        
    }
    const handleEmailChange = e =>{
        const updateEmail = (e.target.value)
        const updateUser = {name:user.name,email:updateEmail}
        setUser(updateUser)
        
    }
    return (
        <div>
            <h2 style={{textAlign:'center'}}> Update User : {user.name}  {user.email}</h2>
            <form onSubmit={handleupdateForm}>
                <input onChange={handleOneChange} value={user.name || ''} placeholder ="User Name"/>
                <input onChange={handleEmailChange} placeholder ="User Email"value={user.email || ''} />
                <input type="submit" value="Update Data"/>
            </form>
        </div>
    );
};

export default UpdateUser;