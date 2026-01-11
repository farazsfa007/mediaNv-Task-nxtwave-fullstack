import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } catch (err) {
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required /><br /><br />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required /><br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required /><br /><br />
        <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="candidate">Candidate</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;