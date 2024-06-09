import { useClerk } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const { session } = useClerk();
    const [Email, setEmail] = useState('')
    const [formData, setFormData] = useState({
        username: "",
        fname: "",
        lname: "",
        number: "",
        email:"",
        address:""
    });
    useEffect(()=>{
        async function fetchUser(){
            // The URL to your servlet
            const url = 'http://localhost:8080/Bookcom/user/details';
            const token=await session.getToken()
    
            // Fetch the image using Axios
            axios.get(url,{headers:{Authorization:`Bearer ${token}`}})
              .then(response => {
                setFormData({
                    ...formData,
                    email: response.data.email,
                    fname:response.data.fname,
                    lname:response.data.lname,
                    username:response.data.username,
                    address:response.data.address,
                    number:response.data.number
                });
                    setEmail(response.data.email)
              })
              .catch(error => console.error('Error fetching image:', error));
            }
        fetchUser();
    },[Email])
    

    const handleChange = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8080/Bookcom/user/update';
        const token = await session.getToken();

        // Fetch the image using Axios
        axios.post(url, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => console.error('Error fetching image:', error));
    };

    return (
        <div className="max-w-4xl mx-auto font-sans text-333 p-6">
            <div className="text-center mb-16">
                <h4 className="text-base font-semibold mt-3">Update your account</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                    <div>
                        <label className="text-sm mb-2 block">User name</label>
                        <input name="username" type="text" value={formData.username} onChange={handleChange} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500" placeholder="Enter username" />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">First Name</label>
                        <input name="fname" type="text" value={formData.fname} onChange={handleChange} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500" placeholder="Enter name" />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Last Name</label>
                        <input name="lname" type="text" value={formData.lname} onChange={handleChange} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500" placeholder="Enter last name" />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Email</label>
                        <input name="email" type="text" value={Email} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"  disabled/>
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Address</label>
                        <input name="address" type="text" value={formData.address} onChange={handleChange} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500" placeholder="Enter address" />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Mobile No.</label>
                        <input name="number" type="number" value={formData.number} onChange={handleChange} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500" placeholder="Enter mobile number" />
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit" className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
