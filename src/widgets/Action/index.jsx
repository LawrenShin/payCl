import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as types from '@client/helpers/payoutActions';
import * as ActionButton from './components';

const Action = ({ type, ...other }) => {
    const ActionComponent = useMemo(() => {
        switch (type) {
            // Common
            case types.SET_ANY_STATE:
                return ActionButton.SetAnyState;
            case types.CHECK_STATUS:
                return ActionButton.CheckStatus;
            // Payments
            case types.PROJECT_NOTIFY:
                return ActionButton.ProjectNotify;
            case types.REFUND_PAYMENT:
                return ActionButton.RefundPayment;
            // Payouts
            case types.ACCEPT:
                return ActionButton.Accept;
            case types.DECLINE:
                return ActionButton.Decline;
            case types.DELAY:
                return ActionButton.Delay;
            case types.CHECK_FRAUD_START:
                return ActionButton.CheckFraudStart;
            case types.CHECK_FRAUD_RESULT:
                return ActionButton.CheckFraudResult;
            case types.START_PAYOUT:
                return ActionButton.Start;
            case types.TO_RECREATE:
                return ActionButton.ToRecreate;
            case types.RECREATE:
                return ActionButton.Recreate;
            default:
                return null;
        }
    }, [type]);

    return <ActionComponent {...other} />;
};

Action.propTypes = {
    type: PropTypes.string.isRequired,
    model: PropTypes.oneOf(['payment', 'payout']).isRequired,
};

export default Action;
