import React, { useRef, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import {
    Alert,
    Spin,
    Typography,
    Col,
} from 'antd';
import { CodeInput } from '@client/components';
import withData from './data';
import {
    Wrapper,
    QRCodeFrame,
    Info,
    GuideCol,
    Content,
} from './styled';
import { Errors } from '../../styled';

const { Title } = Typography;

const GAuthenticator = (props) => {
    const {
        qrCodeString,
        twoFactorConnect,
        connecting,
        errors,
    } = props;
    const frame = useRef(null);
    const field = useRef(null);

    const onComplete = useCallback((code) => {
        twoFactorConnect(code);
    }, [twoFactorConnect]);

    useEffect(() => {
        if (frame.current && qrCodeString) {
            QRCode.toCanvas(frame.current, qrCodeString);
        }
    }, [frame, qrCodeString]);

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
            <Spin spinning={connecting}>
                <Content>
                    <CodeInput ref={field} pattern="XXX XXX" onComplete={onComplete} />
                    {errors.length > 0 && (
                        <Errors>
                            {errors.map(message => <Alert type="error" message={message} />)}
                        </Errors>
                    )}
                    <Info gutter={16}>
                        <Col span={12}>
                            <QRCodeFrame ref={frame} />
                        </Col>
                        <GuideCol span={12}>
                            <Title level={4}>Где взять код?</Title>
                            <p>1. Скачать приложение Google Authenticator</p>
                            <p>2. Отсканировать QR-код</p>
                        </GuideCol>
                    </Info>
                </Content>
            </Spin>
        </Wrapper>
    );
};

export default withData(GAuthenticator);
