import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyState() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(!token){
            navigate('/')
        }
    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h2 className='emptyStateHeading'>Your movie list is empty</h2>
                <button type="submit" className="btn addMovie mt-4" onClick={() => navigate('/create-movie')}>
                    Add a new movie
                </button>
            </div>
        </div>
    );
}

export default EmptyState;
