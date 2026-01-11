import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axiosInstance';

const JobForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', location: '', job_type: 'Full-time' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/jobs/${id}`).then(res => setFormData(res.data)).catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/jobs/${id}`, formData);
        alert('Job Updated');
      } else {
        await API.post('/jobs', formData);
        alert('Job Created');
      }
      navigate('/admin/jobs');
    } catch (err) {
      alert('Error saving job',err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{id ? 'Edit Job' : 'Create Job'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /><br /><br />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required /><br /><br />
        <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required /><br /><br />
        <select value={formData.job_type} onChange={(e) => setFormData({...formData, job_type: e.target.value})}>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select><br /><br />
        <button type="submit">Save Job</button>
      </form>
    </div>
  );
};

export default JobForm;