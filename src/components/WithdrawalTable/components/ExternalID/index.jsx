import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const ExternalID = ({ value }) => (
    <Paragraph copyable={{ text: value }} style={{ marginBottom: 0 }}>
        {value.slice(0, 8).concat('...')}
    </Paragraph>
);

ExternalID.propTypes = {
    value: PropTypes.string.isRequired,
};

export default ExternalID;
