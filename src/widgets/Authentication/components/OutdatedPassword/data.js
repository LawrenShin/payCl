import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form } from 'antd';
import { setPassword } from '@client/store/authentication';

export default compose(
    Form.create({ name: 'outdatedPassword' }),
    connect(
        state => ({
            setting: state.authentication.password.setting,
            errors: state.authentication.password.errors,
        }),
        {
            setPassword,
        },
    ),
);
