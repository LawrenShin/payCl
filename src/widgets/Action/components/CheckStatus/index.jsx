import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkStatus as payoutCheckStatus } from '@client/store/payouts';
import { checkStatus as paymentCheckStatus } from '@client/store/payments';
import Base from '../Base';

const CheckStatusButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return <Base icon="monitor" {...props} onConfirm={onConfirm} loading={loading} />;
};

CheckStatusButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

CheckStatusButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    (dispatch, { model }) => ({
        action: (params, callback) => dispatch(
            model === 'payment'
                ? paymentCheckStatus(params, callback)
                : payoutCheckStatus(params, callback),
        ),
    }),
)(CheckStatusButton);
