import { connect } from 'react-redux';
import { setAnyState as paymentSetAnyState } from '@client/store/payments';
import { setAnyState as payoutSetAnyState } from '@client/store/payouts';

export default connect(
    (state, props) => {
        const states = state.dictionary.workflow[props.model];

        return {
            states: Object.keys(states).map(key => ({ value: key, label: states[key] })),
        };
    },
    (dispatch, { model }) => ({
        action: (params, callback) => dispatch(
            model === 'payment'
                ? paymentSetAnyState(params, callback)
                : payoutSetAnyState(params, callback),
        ),
    }),
);
