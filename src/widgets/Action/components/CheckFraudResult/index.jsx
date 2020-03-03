import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFraudResult } from '@client/store/payouts';
import Base from '../Base';

const CheckFraudResultButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return (
        <Base
            icon="file-search"
            {...props}
            onConfirm={onConfirm}
            loading={loading}
        />
    );
};

CheckFraudResultButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

CheckFraudResultButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: checkFraudResult,
    },
)(CheckFraudResultButton);
