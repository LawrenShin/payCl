import { connect } from 'react-redux';

export default connect(
    state => ({
        taxTypes: state.dictionary.change.statusPaymentChannelType,
    }),
);
