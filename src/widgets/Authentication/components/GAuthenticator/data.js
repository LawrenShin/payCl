import { connect } from 'react-redux';
import { twoFactorConnect } from '@client/store/authentication/actions';

export default connect(
    state => ({
        visible: !state.authentication.twoFactor.enabled,
        qrCodeString: state.authentication.twoFactor.qrCodeString,
        connecting: state.authentication.twoFactor.connecting,
        errors: state.authentication.twoFactor.errors,
    }),
    {
        twoFactorConnect,
    },
);
