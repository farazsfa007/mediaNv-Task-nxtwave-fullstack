import { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await API.get(`/jobs?search=${search}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Jobs</h2>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button onClick={fetchJobs} style={{ marginLeft: '10px' }}>Search</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {jobs.map(job => (
          <div key={job.job_id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.job_type}</p>
            <Link to={`/jobs/${job.job_id}`}>
              <button style={{ background: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;