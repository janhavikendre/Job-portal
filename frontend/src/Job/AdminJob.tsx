import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { adminAPI } from '../services/adminApi';
import { useNavigate } from 'react-router-dom';

function AdminJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
  });
;
  const navigate = useNavigate();
  

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await adminAPI.createJob(formData);
      console.log("Job created successfully:", result);

      // Store token in localStorage (or sessionStorage or state)
      localStorage.setItem("adminToken", result.data.token);  // Assuming the token is in result.data.token
  
      navigate("/AdminJobListings");
  
    
    } catch (error: any) {
      if (error.response) {
        console.error("Job creation error:", error.response.data);
      } else {
        console.error("Job creation error:", error.message);
      }
    }
  };
  

  return (
    
      <div className='relative h-screen w-full bg-white'>
        <div>
        <Sidebar />
        </div>
     
        
        <div className='absolute flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <form onSubmit={handleSubmit} className="space-y-4">
<div>
  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
    Job Title
  </label>
  <input
    type="text"
    id="title"
    name="title"
    value={formData.title}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    required
  />
</div>
<div>
  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
    Job Description
  </label>
  <textarea
    id="description"
    name="description"
    value={formData.description}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    rows={4}
    required
  />
</div>
<div>
  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
    Company
  </label>
  <input
    type="text"
    id="skills"
    name="company"
    value={formData.company}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    placeholder="e.g., React, Node.js, Java"
    required
  />
</div>
<div>
  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
    Location
  </label>
  <input
    type="text"
    id="location"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    placeholder="e.g., Mumbai, Remote"
    required
  />
</div>
<div>
  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
    Salary
  </label>
  <input
    type="text"
    id="salary"
    name="salary"
    value={formData.salary}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    placeholder="e.g., 50000 INR"
    required
  />
</div>
 
<div>
  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
    Job Type
  </label>
  <input
    type="text"
    id="jobType"
    name="jobType"
    value={formData.jobType}
    onChange={handleChange}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    placeholder="e.g., Full-time, Part-time"
    required
  />
</div>
<div>
  <button onClick={() => alert("Job created successfully")}
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Create Job
  </button>
</div>
</form>
        </div>
        </div>
      
  )
}

export default AdminJob