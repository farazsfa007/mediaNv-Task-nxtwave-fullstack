import { useEffect, useState, useCallback } from 'react';
import API from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});

  const fetchJobs = useCallback(async () => {
    try {
      const res = await API.get('/jobs'); 
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []); 

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchJobs]); 

  const deleteJob = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      alert('Error deleting job',err);
    }
  };

  const viewApplicants = async (jobId) => {
    if (applicants[jobId]) {
      const newApp = { ...applicants };
      delete newApp[jobId];
      setApplicants(newApp);
      return;
    }

    try {
      const res = await API.get(`/admin/jobs/${jobId}/applications`);
      setApplicants({ ...applicants, [jobId]: res.data });
    } catch (err) {
      alert('Error fetching applicants',err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Jobs</h2>
      {jobs.map(job => (
        <div key={job.job_id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{job.title}</h3>
          <p>{job.location} | {job.job_type}</p>
          <Link to={`/admin/edit-job/${job.job_id}`}><button>Edit</button></Link>
          <button onClick={() => deleteJob(job.job_id)} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>Delete</button>
          <button onClick={() => viewApplicants(job.job_id)} style={{ marginLeft: '10px', background: 'blue', color: 'white' }}>
            {applicants[job.job_id] ? 'Hide Applicants' : 'View Applicants'}
          </button>

          {applicants[job.job_id] && (
            <div style={{ background: '#f9f9f9', padding: '10px', marginTop: '10px' }}>
              <h4>Applicants:</h4>
              {applicants[job.job_id].length === 0 ? <p>No applicants yet.</p> : (
                <ul>
                  {applicants[job.job_id].map(app => (
                    <li key={app.user_id}>{app.name} ({app.email}) - Applied: {new Date(app.applied_at).toLocaleDateString()}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminJobs;