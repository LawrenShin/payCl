import { connect } from 'react-redux';

export default connect(
    state => ({
        currencies: state.dictionary.currencies,
    }),
);
