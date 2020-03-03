import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';
import withData from './data';

const AcceptButton = (props) => {
    const { ids, action, paymentSystems } = props;
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line camelcase
    const onConfirm = useCallback((payment_system_id) => {
        setLoading(true);
        action({ ids, payment_system_id }, () => setLoading(false));
    }, [ids, action]);

    return (
        <Base
            icon="check"
            {...props}
            options={paymentSystems}
            onConfirm={onConfirm}
            loading={loading}
        />
    );
};

AcceptButton.propTypes = {
    paymentSystems: PropTypes.arrayOf(PropTypes.number),
    expanded: PropTypes.bool,
    onAccept: PropTypes.func,
};

AcceptButton.defaultProps = {
    paymentSystems: [],
    expanded: false,
    onAccept() {},
};

export default withData(AcceptButton);
