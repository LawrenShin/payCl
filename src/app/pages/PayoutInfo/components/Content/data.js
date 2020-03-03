import { connect } from 'react-redux';
import { push } from 'connected-react-router';

export default connect(
    state => ({
        tz: state.app.tz,
    }),
    {
        push,
    },
);
