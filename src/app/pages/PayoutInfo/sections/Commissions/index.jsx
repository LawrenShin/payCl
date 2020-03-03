import React, { useContext, useMemo } from 'react';
import { Table, Typography } from 'antd';
import { Amount } from '@client/widgets';
import { tsToString } from '@client/helpers';
import { Context } from '../../components';
import withData from './data';
import { Small } from './styled';

const { Text } = Typography;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: id => <Text type="secondary">{id}</Text>,
    },
    {
        title: 'Тип',
        dataIndex: 'typeName',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.typeName.localeCompare(b.typeName),
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        render: (value, item) => <Amount value={value} currencyId={item.currency_id} />,
    },
    {
        title: 'PCT ID',
        dataIndex: 'payment_channel_tax_id',
    },
    {
        title: 'Аккаунт ID',
        dataIndex: 'account_id',
    },
    {
        title: 'Создана',
        dataIndex: 'created_at',
        render: value => (
            tsToString(value).split(', ').map(part => (
                <Small>
                    <Text type="secondary">{part}</Text>
                </Small>
            ))
        ),
    },
    {
        title: 'Обновлена',
        dataIndex: 'updated_at',
        render: value => (
            tsToString(value).split(', ').map(part => (
                <Small>
                    <Text type="secondary">{part}</Text>
                </Small>
            ))
        ),
    },
    {
        title: 'Удалена',
        dataIndex: 'deleted_at',
        render: value => (
            value
                ? tsToString(value).split(', ').map(part => (
                    <Small>
                        <Text type="secondary">{part}</Text>
                    </Small>
                ))
                : ''
        ),
    },
];

const Commissions = (props) => {
    const { data: { taxes } } = useContext(Context);
    const { taxTypes } = props;
    const dataSource = useMemo(() => (
        taxes.map(tax => ({
            ...tax,
            typeName: taxTypes[tax.type],
        }))
    ), [taxes, taxTypes]);
    const totalValue = useMemo(() => (
        dataSource.reduce((sum, { amount }) => sum + parseFloat(amount), 0)
    ), [dataSource]);

    return (
        <Table
            size="small"
            dataSource={dataSource}
            rowKey={({ id }) => id}
            columns={columns}
            pagination={false}
            footer={() => (
                <React.Fragment>
                    <Text strong>Общая комиссия: </Text>
                    <Amount value={totalValue} currencyId={dataSource[0].currency_id} />
                </React.Fragment>
            )}
        />
    );
};

export default withData(Commissions);
