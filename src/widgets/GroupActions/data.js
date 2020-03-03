import { connect } from 'react-redux';

export default connect(
    (state, props) => {
        const { list } = props;
        const { payment, payout } = state.dictionary.actions;
        const allActions = {
            ...payment,
            ...payout,
        };
        const actions = Object.keys(allActions).reduce((memo, key) => {
            if (list.indexOf(key) > -1) {
                // eslint-disable-next-line no-param-reassign
                memo[key] = allActions[key];
            }

            return memo;
        }, {});

        return {
            actions,
        };
    },
);
