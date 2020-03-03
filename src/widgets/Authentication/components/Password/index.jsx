import React, { useCallback, useEffect, useRef } from 'react';
import {
    Alert,
    Typography,
    Spin,
} from 'antd';
import { CodeInput } from '@client/components';
import withData from './data';
import { Wrapper, Content } from './styled';
import { Errors } from '../../styled';

const { Title } = Typography;

const Password = (props) => {
    const {
        twoFactorCheck,
        checking,
        errors,
    } = props;
    const field = useRef(null);

    const onComplete = useCallback((code) => {
        twoFactorCheck(code);
    }, []);

    useEffect(() => {
        if (field.current) {
            field.current.focus();
        }
    }, [field]);

    useEffect(() => {
        if (errors.length > 0) {
            field.current.reset();
        }
    }, [field, errors]);

    return (
        <Wrapper>
            <Title level={3}>Введите код</Title>
            <Spin spinning={checking}>
                <Content>
                    <CodeInput ref={field} pattern="XXX XXX" onComplete={onComplete} />
                    {errors.length > 0 && (
                        <Errors>
                            {errors.map(message => <Alert type="error" message={message} />)}
                        </Errors>
                    )}
                </Content>
            </Spin>
        </Wrapper>
    );
};

export default withData(Password);
