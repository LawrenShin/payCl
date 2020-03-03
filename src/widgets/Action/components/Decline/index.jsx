import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decline } from '@client/store/payouts';
import Base from '../Base';

const DeclineButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return <Base icon="close" {...props} onConfirm={onConfirm} loading={loading} />;
};

DeclineButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

DeclineButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: decline,
    },
)(DeclineButton);
