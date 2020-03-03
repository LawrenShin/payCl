import { connect } from 'react-redux';

export default connect(
    (state, props) => ({
        name: state.dictionary.paymentMethods.find(({ id }) => id === props.id).name,
    }),
);
