import React, { useState, useEffect } from 'react';
import '../Css/Profile.css';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }

                console.log('Token:', token); // Log token for verification
                setCurrentUser({ accessToken: token });

                // Dynamically import jwt-decode
                const jwtDecodeModule = await import('jwt-decode');
                const jwtDecode = jwtDecodeModule.jwtDecode; // Import named export

                // Decode the token
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);

            } catch (err) {
                // Log detailed error
                console.error('Error details:', err);
                setError(err.message || 'Error retrieving user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []); // Runs only once on component mount

    if (loading) {
        return <div className='profile-container'>Loading user data...</div>;
    }

    if (error) {
        return <div className='profile-container'>{error}</div>;
    }

    return (
        <div className='container-pro'>
            <div className='profile-container'>

           
            <header className='jumbotron'>
                <h5>
                    PROFILE
                </h5>
            </header>

            <div className='profile-content'>
            <div class="info-table">
    <table>
        <tbody>
            <tr>
                <th>Token</th>
                <td>
                    {currentUser?.accessToken 
                        ? `${currentUser.accessToken.substring(0, 20)} ... ${currentUser.accessToken.slice(-20)}`
                        : 'N/A'
                    }
                </td>
            </tr>
            <tr>
                <th>ID</th>
                <td>{decodedToken?.sub || 'N/A'}</td>
            </tr>
            <tr>
                <th>Username</th>
                <td>{decodedToken?.name || 'N/A'}</td>
            </tr>
            <tr>
                <th>Roles</th>
                <td>{decodedToken?.authorities || 'N/A'}</td>
            </tr>
        </tbody>
    </table>
</div>

            </div>
        </div>
        </div>
    );
};

export default Profile;
