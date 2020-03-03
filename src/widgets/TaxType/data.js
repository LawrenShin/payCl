import { connect } from 'react-redux';

export default connect(
    (state, props) => ({
        name: state.dictionary.change.statusPaymentChannelType[props.id],
    }),
);
