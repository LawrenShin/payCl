import React from 'react';
import { Popover, Typography } from 'antd';
import { Wrapper } from './styled';

const { Text } = Typography;

const User = (props) => {
    const {
        email,
        phone,
        pinCode,
        lastName,
        firstName,
        countryCode,
    } = props;

    return (
        <Popover
            content={(
                <div>
                    <p>
                        <Text strong>Имя: </Text>
                        <Text>{`${firstName} ${lastName}`}</Text>
                    </p>
                    <p>
                        <Text strong>Телефон: </Text>
                        <Text>{phone}</Text>
                    </p>
                    <p>
                        <Text strong>Pin-code: </Text>
                        <Text>{pinCode}</Text>
                    </p>
                    <p>
                        <Text strong>Страна: </Text>
                        <Text>{countryCode}</Text>
                    </p>
                </div>
            )}
        >
            <Wrapper>{email}</Wrapper>
        </Popover>
    );
};

export default User;
