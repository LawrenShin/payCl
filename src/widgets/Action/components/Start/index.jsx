import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { start } from '@client/store/payouts';
import Base from '../Base';

const StartButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids, action]);

    return (
        <Base
            icon="caret-right"
            onConfirm={onConfirm}
            loading={loading}
            {...props}
        />
    );
};

StartButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

StartButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: start,
    },
)(StartButton);
