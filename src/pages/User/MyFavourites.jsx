import { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const MyFavourites = () => {
  const [favs, setFavs] = useState([]);

  const fetchFavs = () => {
    API.get('/favourites/my')
      .then(res => setFavs(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  const removeFav = async (jobId) => {
    try {
      await API.delete(`/favourites/${jobId}`);
      fetchFavs(); 
    } catch (err) {
      alert('Error removing favourite',err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Saved Jobs</h2>
      <ul>
        {favs.map(fav => (
          <li key={fav.favourite_id} style={{ marginBottom: '10px' }}>
            <strong>{fav.title}</strong> - {fav.location}
            <Link to={`/jobs/${fav.job_id}`} style={{ marginLeft: '10px' }}>View</Link>
            <button onClick={() => removeFav(fav.job_id)} style={{ marginLeft: '10px', color: 'red' }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFavourites;