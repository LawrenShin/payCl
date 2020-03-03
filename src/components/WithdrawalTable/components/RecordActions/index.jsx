import React from 'react';
import PropTypes from 'prop-types';
import { GroupActions } from '@client/widgets';

const RecordActions = ({ list, ids, model }) => (
    <GroupActions
        size="small"
        ids={ids}
        list={list}
        model={model}
    />
);

RecordActions.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    list: PropTypes.shape(),
    model: PropTypes.oneOf(['payment', 'payout']).isRequired,
};

RecordActions.defaultProps = {
    list: {},
};

export default RecordActions;
