import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refundPayment } from '@client/store/payments';
import Base from '../Base';

const RefundPaymentButton = props => <Base icon="rollback" {...props} />;

RefundPaymentButton.propTypes = {
    expanded: PropTypes.bool,
    action: PropTypes.func,
};

RefundPaymentButton.defaultProps = {
    expanded: false,
    action: () => {},
};

export default connect(
    () => ({}),
    {
        action: refundPayment,
    },
)(RefundPaymentButton);
