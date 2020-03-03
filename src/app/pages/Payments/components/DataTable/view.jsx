import React from 'react';
import PropTypes from 'prop-types';
import { WithdrawalTable } from '@client/components';

const DataTable = (props) => {
    const {
        actions,
        data,
        loading,
        pagination,
        filterApply,
        actionsLocked,
        shouldUpdate,
    } = props;

    return (
        <WithdrawalTable
            actions={actions}
            data={data}
            loading={loading}
            pagination={pagination}
            onPaginate={filterApply}
            actionsLocked={actionsLocked}
            shouldUpdate={shouldUpdate}
            model="payment"
        />
    );
};

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    loading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape({
        current: PropTypes.number,
        total: PropTypes.number,
    }).isRequired,
    filterApply: PropTypes.func.isRequired,
    actionsLocked: PropTypes.bool.isRequired,
    shouldUpdate: PropTypes.bool.isRequired,
};

DataTable.defaultProps = {
    data: [],
};

export default DataTable;
