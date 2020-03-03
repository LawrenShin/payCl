import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider } from 'antd';
import { sessionToken } from '@client/store/session';

const Storage = () => {
    const dispatch = useDispatch();
    const clearSession = useCallback(() => {
        dispatch(sessionToken({ accessToken: null, refreshToken: null, expires: 0 }));
    }, []);

    return (
        <div>
            <Divider>Client Storage</Divider>
            <Button onClick={clearSession}>Clear session</Button>
        </div>
    );
};

export default Storage;
