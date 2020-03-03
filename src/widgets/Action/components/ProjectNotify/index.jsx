import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { projectNotify } from '@client/store/payments';
import Base from '../Base';

const ProjectNotifyButton = (props) => {
    const { ids, action } = props;
    const [loading, setLoading] = useState(false);

    const onConfirm = useCallback(() => {
        setLoading(true);
        action({ ids }, () => setLoading(false));
    }, [ids]);

    return (
        <Base icon="bell" {...props} onConfirm={onConfirm} loading={loading} />
    );
};

ProjectNotifyButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

ProjectNotifyButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: projectNotify,
    },
)(ProjectNotifyButton);
