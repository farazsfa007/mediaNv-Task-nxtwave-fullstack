import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/axiosInstance';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data)).catch(err => console.error(err));
  }, [id]);

  const applyJob = async () => {
    try {
      await API.post(`/applications/${id}`);
      alert('Applied Successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying');
    }
  };

  const saveJob = async () => {
    try {
      await API.post(`/favourites/${id}`);
      alert('Job Saved to Favourites!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving job');
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{job.title}</h1>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.job_type}</p>
      <p>{job.description}</p>
      
      <button onClick={applyJob} style={{ padding: '10px 20px', background: 'blue', color: 'white', marginRight: '10px' }}>Apply Now</button>
      <button onClick={saveJob} style={{ padding: '10px 20px', background: 'orange', color: 'white' }}>Save Job</button>
    </div>
  );
};

export default JobDetails;