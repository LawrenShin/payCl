import React, { useCallback } from 'react';
import {
    Alert,
    Form,
    Input,
    Typography,
} from 'antd';
import withData from './data';
import { TextWrapper, UpdateButton } from './styled';
import { Errors } from '../../styled';

const { Title, Text } = Typography;

const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@()$%^&*=_{}[\]:;"'|\\<>,./~`±§+-]).{7,}$/;

const OutdatedPassword = (props) => {
    const {
        form: { getFieldDecorator },
        form,
        setting,
        errors,
        setPassword,
    } = props;

    const onSubmit = useCallback((event) => {
        event.preventDefault();

        form.validateFields((err, { current, updated, copied }) => {
            if (!err) {
                setPassword(current, updated, copied);
            }
        });
    }, []);
    const validateConfirmation = useCallback((rule, value, callback) => {
        if (value !== form.getFieldValue('updated')) {
            callback(true);
            return;
        }

        callback();
    }, [form]);

    return (
        <Form onSubmit={onSubmit}>
            <Title level={3}>Ваш пароль устарел</Title>
            <TextWrapper>
                <Text type="secondary">
                    Из-за соображений безопасности необходимо переодически менять пароль.
                </Text>
            </TextWrapper>
            {errors.length > 0 && (
                <Errors>
                    {errors.map(message => <Alert type="error" message={message} />)}
                    <div style={{ height: 26 }} />
                </Errors>
            )}
            <Form.Item>
                {getFieldDecorator('current', {
                    rules: [{
                        required: true,
                        message: 'Введите текущий пароль',
                    }],
                })(
                    <Input.Password placeholder="Текущий пароль" size="large" />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('updated', {
                    rules: [{
                        required: true,
                        message: 'Введите новый пароль',
                    }, {
                        pattern: PASSWORD_PATTERN,
                        // eslint-disable-next-line max-len
                        message: 'Пароль должен быть не менее 7 символов, содержать цифры, спец. символы, буквы верхнего и нижнего регистров',
                    }],
                })(
                    <Input.Password placeholder="Новый пароль" size="large" />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('copied', {
                    rules: [{
                        required: true,
                        message: 'Введите новый пароль еще раз',
                    }, {
                        validator: validateConfirmation,
                        message: 'Пароли должны совпадать',
                    }],
                })(
                    <Input.Password placeholder="Новый пароль еще раз" size="large" />,
                )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
                <UpdateButton type="primary" size="large" htmlType="submit" loading={setting}>
                    Обновить
                </UpdateButton>
            </Form.Item>
        </Form>
    );
};

export default withData(OutdatedPassword);
