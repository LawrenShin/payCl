import { connect } from 'react-redux';

export default connect(
    (state, props) => ({
        currency: state.dictionary.currencies.find(({ id }) => id === props.currencyId).iso_code,
    }),
);
