import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toRecreate } from '@client/store/payouts';
import Base from '../Base';

const ToRecreateButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return <Base icon="inbox" {...props} onConfirm={onConfirm} loading={loading} />;
};

ToRecreateButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

ToRecreateButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: toRecreate,
    },
)(ToRecreateButton);
