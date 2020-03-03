import React, { useMemo, useEffect } from 'react';
import { Card } from 'antd';
import withData from './data';
import { Content, Context } from './components';

const PayoutInfo = (props) => {
    const { loading, data } = props;
    const payout = useMemo(() => (
        !loading && data && data.data ? data.data : null
    ), [loading, data]);

    useEffect(() => {
        if (payout) {
            document.title = `Выплата #${payout.id}`;
        }
    }, [payout]);

    return (
        <Context.Provider value={{ data: payout }}>
            <Card loading={loading}>
                {!loading && <Content />}
            </Card>
        </Context.Provider>
    );
};

export default withData(PayoutInfo);
