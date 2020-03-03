import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delay } from '@client/store/payouts';
import Base from '../Base';

const DelayButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return <Base icon="clock-circle" {...props} onConfirm={onConfirm} loading={loading} />;
};

DelayButton.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number),
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

DelayButton.defaultProps = {
    ids: [],
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: delay,
    },
)(DelayButton);
