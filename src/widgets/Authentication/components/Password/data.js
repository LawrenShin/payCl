import { connect } from 'react-redux';
import { twoFactorCheck } from '@client/store/authentication/actions';

export default connect(
    state => ({
        checking: state.authentication.twoFactor.checking,
        errors: state.authentication.twoFactor.errors,
    }),
    {
        twoFactorCheck,
    },
);
