import React, { useContext } from 'react';
import { Alert, Divider, Typography } from 'antd';
import { PaymentMethod, PaymentSystem, Amount } from '@client/widgets';
import { tsToString } from '@client/helpers';
import { Context } from '../../components';
import withData from './data';

const { Title, Text } = Typography;

const PaymentChannel = (props) => {
    const { data: { paymentChannel } } = useContext(Context);
    const { statuses } = props;

    return (
        <div>
            <Title level={3}>
                <PaymentSystem id={paymentChannel.payment_system_id} />
                <Divider type="vertical" />
                <PaymentMethod id={paymentChannel.payment_method_id} />
            </Title>
            <Divider type="horizontal" />

            {paymentChannel.deleted_at && (
                <p>
                    <Alert
                        message={`Канал удален –– ${tsToString(paymentChannel.deleted_at)}`}
                        type="warning"
                        showIcon
                    />
                </p>
            )}

            <p>
                <Text strong>ID: </Text>
                <Text>{paymentChannel.id}</Text>
            </p>
            <p>
                <Text strong>Лимит: </Text>
                <Text>
                    <Amount
                        value={paymentChannel.min_amount}
                        currencyId={paymentChannel.currency_id}
                    />
                    <span> –– </span>
                    <Amount
                        value={paymentChannel.max_amount}
                        currencyId={paymentChannel.currency_id}
                    />
                </Text>
            </p>
            <p>
                <Text strong>gate_id: </Text>
                <Text>{paymentChannel.gate_id}</Text>
            </p>
            <p>
                <Text strong>account_id: </Text>
                <Text>{paymentChannel.account_id}</Text>
            </p>
            <p>
                <Text strong>is_convertible: </Text>
                <Text>{JSON.stringify(paymentChannel.is_convertible)}</Text>
            </p>
            <p>
                <Text strong>priority: </Text>
                <Text>{JSON.stringify(paymentChannel.priority)}</Text>
            </p>
            <p>
                <Text strong>Статус: </Text>
                <Text>{statuses[paymentChannel.status]}</Text>
            </p>
        </div>
    );
};

export default withData(PaymentChannel);
