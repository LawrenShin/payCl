import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recreate } from '@client/store/payouts';
import Base from '../Base';

const RecreateButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return <Base icon="interaction" {...props} onConfirm={onConfirm} loading={loading} />;
};

RecreateButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

RecreateButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: recreate,
    },
)(RecreateButton);
