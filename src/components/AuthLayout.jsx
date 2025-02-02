import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    return loading ? <div>Loading...</div> : <div>{children}</div>;
};

export default AuthLayout;
