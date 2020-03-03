import { connect } from 'react-redux';

export default connect(
    (state, props) => ({
        name: state.dictionary.paymentSystems.find(({ id }) => id === props.id).name,
    }),
);
