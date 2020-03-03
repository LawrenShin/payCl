import React, { useContext } from 'react';
import { JSONViewer } from '@client/components';
import { Context } from '../../components';

const PayData = () => {
    const { data } = useContext(Context);

    return <JSONViewer data={data.payData} />;
};

export default PayData;
