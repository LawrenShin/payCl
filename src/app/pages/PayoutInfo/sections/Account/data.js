import { connect } from 'react-redux';

export default connect(
    state => ({
        statuses: state.dictionary.change.statusAccount,
    }),
);
