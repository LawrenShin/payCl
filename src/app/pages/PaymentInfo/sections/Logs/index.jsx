import React, { useContext, useMemo } from 'react';
import { Collapse } from 'antd';
import { tsToString } from '@client/helpers';
import { Context } from '../../components';
import { LogPanel } from './components';

const { Panel } = Collapse;

const Logs = () => {
    const { data: { paymentSystemLogs } } = useContext(Context);
    const sortedLogs = useMemo(() => (
        paymentSystemLogs.sort((a, b) => b.created_at - a.created_at)
    ), [paymentSystemLogs]);
    const defaultActiveLogId = useMemo(() => (
        sortedLogs && sortedLogs.length > 0
            ? sortedLogs[0].id.toString()
            : ''
    ), [sortedLogs]);

    return (
        <Collapse defaultActiveKey={[defaultActiveLogId]}>
            {sortedLogs.map(log => (
                <Panel header={tsToString(log.created_at)} key={log.id}>
                    <LogPanel data={log.payment_system_data} />
                </Panel>
            ))}
        </Collapse>
    );
};

export default Logs;
