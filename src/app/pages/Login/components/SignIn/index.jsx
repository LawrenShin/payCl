import React, { useCallback } from 'react';
import {
    Alert,
    Form,
    Icon,
    Input,
} from 'antd';
import withData from './data';
import { FormStyled, ButtonWrapper, SignInButton } from './styles';

const SignIn = (props) => {
    const {
        form,
        form: { getFieldDecorator },
        signInCheck,
        checking,
        errors,
    } = props;

    const onSubmit = useCallback((event) => {
        event.preventDefault();

        form.validateFields((err, { username, password }) => {
            if (!err) {
                signInCheck(username, password);
            }
        });
    }, []);

    return (
        <FormStyled onSubmit={onSubmit}>
            {errors.length > 0 && (
                <Form.Item>
                    {errors.map(message => <Alert type="error" message={message} />)}
                </Form.Item>
            )}
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Введите имя пользователя' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        size="large"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Введите пароль' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        size="large"
                    />,
                )}
            </Form.Item>
            <ButtonWrapper>
                <SignInButton type="primary" htmlType="submit" size="large" loading={checking}>
                    Войти
                </SignInButton>
            </ButtonWrapper>
        </FormStyled>
    );
};

export default withData(SignIn);
