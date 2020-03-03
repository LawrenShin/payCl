import { connect } from 'react-redux';

export default connect(
    state => ({
        visible: (
            !state.authentication.twoFactor.enabled
            || !state.authentication.twoFactor.complete
            || state.authentication.password.outdated
        ),
        twoFactorVisible: !state.authentication.twoFactor.enabled,
        codeVisible: !state.authentication.twoFactor.complete,
        passwordVisible: state.authentication.password.outdated,
    }),
);
