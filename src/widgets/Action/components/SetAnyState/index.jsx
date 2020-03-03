import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import withData from './data';
import Base from '../Base';

const SetAnyStateButton = (props) => {
    const {
        ids,
        action,
        states,
        disabled,
    } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback((state) => {
        setLoading(true);
        action({ ids, state }, () => setLoading(false));
    }, [ids]);

    return (
        <Base
            icon="pic-center"
            {...props}
            disabled={disabled}
            loading={loading}
            onConfirm={onConfirm}
            options={states}
        />
    );
};

SetAnyStateButton.propTypes = {
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
};

SetAnyStateButton.defaultProps = {
    expanded: false,
    onClick: () => {},
};

export default withData(SetAnyStateButton);
