import React from 'react';
import PropTypes from 'prop-types';
import withData from './data';


@withData
class Amount extends React.Component {
    render() {
        const { formattedValue } = this.props;

        return formattedValue;
    }
}

Amount.propTypes = {
    formattedValue: PropTypes.string,
};
Amount.defaultProps = {
    formattedValue: '',
};

export default Amount;
