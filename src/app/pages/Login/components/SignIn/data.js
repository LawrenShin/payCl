import { Form } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signInCheck } from '@client/store/authentication';

export default compose(
    Form.create({ name: 'normal_login' }),
    connect(
        state => ({
            checking: state.authentication.signIn.checking,
            errors: state.authentication.signIn.errors,
        }),
        {
            signInCheck,
        },
    ),
);
