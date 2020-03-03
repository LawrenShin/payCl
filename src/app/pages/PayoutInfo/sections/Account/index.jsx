import React, { useContext, useMemo } from 'react';
import {
    Typography,
    Divider,
    List,
    Alert,
} from 'antd';
import { JSONViewer } from '@client/components';
import { Amount } from '@client/widgets';
import { tsToString } from '@client/helpers';
import { Context } from '../../components';
import withData from './data';

const { Title, Text } = Typography;

const Account = (props) => {
    const { data: { account } } = useContext(Context);
    const { statuses } = props;
    const list = useMemo(() => (
        [{
            name: 'Баланс',
            content: <Amount value={account.balance} currencyId={account.currency_id} />,
        }, {
            name: 'Флаги',
            content: account.flags,
        }, {
            name: 'Статус',
            content: statuses[account.status],
        }, {
            name: 'Последняя проверка транзакций',
            content: account.last_transaction_check,
        }].filter(({ content }) => content !== null)
    ), [account]);

    return (
        <div>
            {account.deleted_at && (
                <p>
                    <Alert
                        message={`Аккаунт удален –– ${tsToString(account.deleted_at)}`}
                        type="warning"
                        showIcon
                    />
                </p>
            )}
            {account.deactivation_ts && (
                <p>
                    <Alert
                        message={`Аккаунт деактивирован –– ${tsToString(account.deactivation_ts)}`}
                        type="warning"
                        showIcon
                    />
                </p>
            )}
            <Text strong>ID: </Text>
            <Text code copyable>{account.id}</Text>
            <Divider type="vertical" />
            <Text strong>PATH: </Text>
            <Text code copyable>{account.path}</Text>

            <Divider type="horizontal" />

            <List
                dataSource={list}
                renderItem={item => (
                    <p>
                        <Text strong>
                            <span>{item.name}</span>
                            <span>:&nbsp;</span>
                        </Text>
                        <span>{item.content}</span>
                    </p>
                )}
            />

            <Title level={4}>Данные</Title>

            <JSONViewer data={account.data} />

            <Title level={4}>Meta</Title>

            <JSONViewer data={account.accountMeta} />
        </div>
    );
};

export default withData(Account);
