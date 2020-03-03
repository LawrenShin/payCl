import React, { useContext } from 'react';
import {
    Typography,
    Row,
    Col,
} from 'antd';
import { tsToString } from '@client/helpers';
import { GroupActions } from '@client/widgets';
import { Context } from '../../components';

const { Text } = Typography;

const Info = () => {
    const { data } = useContext(Context);

    return (
        <div>
            <Row>
                <Col span={12}>
                    <p>
                        <Text strong>External ID: </Text>
                        <Text copyable>{data.external_id}</Text>
                    </p>
                    <p>
                        <Text strong>Wallet ID: </Text>
                        <Text>{data.wallet_id}</Text>
                    </p>
                    <p>
                        <Text strong>ARN: </Text>
                        <Text>{JSON.stringify(data.arn)}</Text>
                    </p>
                    <p>
                        <Text strong>Страна: </Text>
                        <Text>{JSON.stringify(data.country)}</Text>
                    </p>
                    <p>
                        <Text strong>IP: </Text>
                        <Text copyable>{data.ip}</Text>
                    </p>
                    <p>
                        <Text strong>Создан: </Text>
                        <Text>{tsToString(data.created_at)}</Text>
                    </p>
                    <p>
                        <Text strong>Обновлен: </Text>
                        <Text>{tsToString(data.updated_at)}</Text>
                    </p>
                    {data.expired_at && (
                        <p>
                            <Text strong>Истекает: </Text>
                            <Text>{tsToString(data.expired_at)}</Text>
                        </p>
                    )}
                    {data.confirmed_at && (
                        <p>
                            <Text strong>Подтвержден: </Text>
                            <Text>{tsToString(data.confirmed_at)}</Text>
                        </p>
                    )}
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    {data.actions.length > 0 && (
                        <GroupActions
                            ids={[data.id]}
                            list={data.actions}
                            expanded
                            model="payment"
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Info;
