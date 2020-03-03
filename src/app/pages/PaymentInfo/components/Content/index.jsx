import React, {
    useState,
    useCallback,
    useContext, useMemo,
} from 'react';
import {
    Col,
    Row,
    Statistic,
    Typography,
    Menu,
    Divider,
} from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router';
import { State } from '@client/components';
import { Currency } from '@client/widgets';
import * as section from '../../sections';
import Context from '../Context';
import withData from './data';
import { AmountRow, SecondaryStatistic } from './styled';

const { Title } = Typography;

const Content = (props) => {
    const { data } = useContext(Context);
    const { push } = props;
    const { path, params } = useRouteMatch();
    const exactPath = useMemo(() => path.replace(/\/:section$/, ''), [path]);
    const [activeKey, setActiveKey] = useState(params.section || 'info');

    const onSelect = useCallback(({ key }) => {
        push(`/payments/${data.id}/${key}`);
        setActiveKey(key);
    }, [push, data]);

    return (
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <div>
                        <Title level={2} style={{ display: 'inline-block', marginRight: 14 }}>
                            {`Платеж #${data.id}`}
                        </Title>
                        <State value={data.state} style={{ verticalAlign: 'text-bottom' }} />
                    </div>
                </Col>
                <Col span={12}>
                    <AmountRow>
                        <Statistic
                            value={data.amount_client}
                            suffix={<Currency id={data.paymentChannel.currency_id} />}
                        />
                        <Divider type="vertical" />
                        <SecondaryStatistic
                            value={data.amount_external}
                            suffix={<Currency id={data.paymentChannel.currency_id} />}
                        />
                    </AmountRow>
                </Col>
            </Row>

            <Menu onClick={onSelect} selectedKeys={[activeKey]} mode="horizontal">
                <Menu.Item key="info">Инфо</Menu.Item>
                <Menu.Item key="account">Аккаунт</Menu.Item>
                <Menu.Item key="payment_channel">Платежный канал</Menu.Item>
                <Menu.Item key="pay_data">Данные платежа</Menu.Item>
                <Menu.Item key="commissions">Комиссии</Menu.Item>
                <Menu.Item key="logs">Логи</Menu.Item>
            </Menu>

            <div style={{ paddingTop: 24 }}>
                <Switch>
                    <Route exact path={[exactPath, `${exactPath}/info`]} component={section.Info} />
                    <Route exact path={`${exactPath}/account`} component={section.Account} />
                    <Route
                        exact
                        path={`${exactPath}/payment_channel`}
                        component={section.PaymentChannel}
                    />
                    <Route exact path={`${exactPath}/pay_data`} component={section.PayData} />
                    <Route
                        exact
                        path={`${exactPath}/commissions`}
                        component={section.Commissions}
                    />
                    <Route exact path={`${exactPath}/logs`} component={section.Logs} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default withData(Content);
