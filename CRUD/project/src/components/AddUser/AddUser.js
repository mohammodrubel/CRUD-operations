
import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef()
    const emailRef = useRef()
        

    const handleAddUser = e=>{
        const name = nameRef.current.value
        const email = emailRef.current.value
        const newUser = {name,email}

        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                alert('successfully added the Data')
                e.target.reset();
            }
        })
        e.preventDefault()
    }
    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleAddUser}>
                <input placeholder="User Name" ref={nameRef}/>
                <input placeholder="User Email" ref={emailRef}/>
                <input type="submit" value="add"/>
            </form>
        </div>
    );
};

export default AddUser;


// CRUD এবং প্রজেক্ট এর নোডমডিউল গুলি ইন্সটোল করে নিতে হবে , রিয়েক্ট এর ফাইল CRUD এর মদ্ধে আছে 