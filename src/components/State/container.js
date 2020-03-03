import { connect } from 'react-redux';
import View from './view';

export default connect(
    (state, props) => {
        const { value } = props;
        const { dictionary } = state;
        const { workflow } = dictionary;
        const statesAll = {
            ...workflow.payment,
            ...workflow.payout,
            ...workflow.antiFraud,
        };

        return {
            text: statesAll[value],
        };
    },
)(View);
