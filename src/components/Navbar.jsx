import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Job Portal</h1>
        <div>
            {!user ? (
            <>
                <Link to="/login" style={{ color: 'white', margin: '0 10px' }}>Login</Link>
                <Link to="/register" style={{ color: 'white', margin: '0 10px' }}>Register</Link>
            </>
            ) : (
            <>
                <span style={{ marginRight: '15px' }}>Hi, {user.name} ({user.role})</span>
                
                {user.role === 'candidate' && (
                <>
                    <Link to="/jobs" style={{ color: 'white', margin: '0 10px' }}>Browse Jobs</Link>
                    <Link to="/my-applications" style={{ color: 'white', margin: '0 10px' }}>My Applications</Link>
                    <Link to="/my-favourites" style={{ color: 'white', margin: '0 10px' }}>Saved Jobs</Link>
                </>
                )}

                {user.role === 'admin' && (
                <>
                    <Link to="/admin/jobs" style={{ color: 'white', margin: '0 10px' }}>Manage Jobs</Link>
                    <Link to="/admin/create-job" style={{ color: 'white', margin: '0 10px' }}>Post Job</Link>
                </>
                )}

                <button onClick={logout} style={{ marginLeft: '10px', cursor: 'pointer' }}>Logout</button>
            </>
            )}
        </div>
        </nav>
    );
};

export default Navbar;