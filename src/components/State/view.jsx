import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { getStatusColor } from '@client/helpers';

const State = ({ value, text, style }) => (
    <Tag color={getStatusColor(value)} style={style}>{text}</Tag>
);

State.propTypes = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string,
    style: PropTypes.shape(),
};

State.defaultProps = {
    text: '',
    style: {},
};

export default State;
