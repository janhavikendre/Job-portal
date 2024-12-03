import React, { useEffect, useState } from 'react';
import { adminAPI } from '../services/adminApi'; // Assuming this has the necessary methods for delete and update
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
}

const AdminJobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await adminAPI.getJobs();
        setJobs(response.data.admins); 
        setLoading(false);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : 'Error fetching jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  
  const handleDelete = async (id: string) => {
    try {
      const response = await adminAPI.deleteJob(id); 
      console.log(response.data.message);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err: any) {
      console.error(err.response ? err.response.data.message : 'Error deleting job');
    }
  };




  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex">
      
      <div>
        <Sidebar />
      </div>

    
      <div className="w-full lg:w-3/4 p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Job Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <p className="text-gray-500"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-500"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-500"><strong>Salary:</strong> {job.salary}</p>
              <p className="text-gray-500"><strong>Type:</strong> {job.jobType}</p>

              
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md lmr-2 mr-2 hover:bg-blue-600"
                  
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(job._id)} 
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminJobListings;
