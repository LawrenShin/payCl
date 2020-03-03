import { connect } from 'react-redux';

export default connect(
    state => ({
        authenticated: state.session.oauth?.accessToken,
    }),
);
