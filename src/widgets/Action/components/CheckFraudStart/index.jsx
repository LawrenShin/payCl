import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFraudStart } from '@client/store/payouts';
import Base from '../Base';

const CheckFraudStartButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return (
        <Base
            icon="security-scan"
            {...props}
            onConfirm={onConfirm}
            loading={loading}
        />
    );
};

CheckFraudStartButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

CheckFraudStartButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: checkFraudStart,
    },
)(CheckFraudStartButton);
