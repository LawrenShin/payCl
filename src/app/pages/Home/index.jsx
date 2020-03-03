import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Панель управления';
    }, []);

    return <h1>Home</h1>;
};

export default Home;
