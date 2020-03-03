import React from 'react';
import PropTypes from 'prop-types';
import { WithdrawalTable } from '@client/components';
import withData from './data';


@withData
class DataTable extends React.Component {
    render() {
        const {
            data,
            actions,
            loading,
            pagination,
            actionsLocked,
            shouldUpdate,
            filterApply,
        } = this.props;

        return (
            <WithdrawalTable
                data={data}
                actions={actions}
                loading={loading}
                pagination={pagination}
                actionsLocked={actionsLocked}
                shouldUpdate={shouldUpdate}
                onPaginate={filterApply}
                model="payout"
            />
        );
    }
}

DataTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: PropTypes.shape({
        current: PropTypes.number,
        total: PropTypes.number,
    }).isRequired,
    filterApply: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()),
    actions: PropTypes.arrayOf(PropTypes.string),
    actionsLocked: PropTypes.bool,
    shouldUpdate: PropTypes.bool,
};
DataTable.defaultProps = {
    data: [],
    actions: [],
    actionsLocked: false,
    shouldUpdate: false,
};

export default DataTable;
