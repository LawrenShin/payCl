import React, { useMemo, useEffect } from 'react';
import { Card } from 'antd';
import withData from './data';
import { Content, Context } from './components';

const PaymentInfo = (props) => {
    const { loading, data } = props;
    const payment = useMemo(() => (
        !loading && data && data.data ? data.data : null
    ), [loading, data]);

    useEffect(() => {
        if (payment) {
            document.title = `Платеж #${payment.id}`;
        }
    }, [payment]);

    return (
        <Context.Provider value={{ data: payment }}>
            <Card loading={loading}>
                {!loading && <Content />}
            </Card>
        </Context.Provider>
    );
};

export default withData(PaymentInfo);
