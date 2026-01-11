import { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';

const MyApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get('/applications/my')
      .then(res => setApps(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Applications</h2>
      {apps.length === 0 ? <p>No applications found.</p> : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.application_id}>
                <td>{app.title}</td>
                <td>{app.location}</td>
                <td>{app.job_type}</td>
                <td>{new Date(app.applied_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyApplications;