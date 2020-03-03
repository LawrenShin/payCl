import { connect } from 'react-redux';
import { logOut } from '@client/store/authentication/actions';

export default connect(
    null,
    {
        logOut,
    },
);
