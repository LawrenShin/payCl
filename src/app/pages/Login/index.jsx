import React, { useEffect } from 'react';
import { SignIn } from './components';
import { Wrapper } from './styles';

const Login = () => {
    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    return (
        <Wrapper>
            <SignIn />
        </Wrapper>
    );
};

export default Login;
