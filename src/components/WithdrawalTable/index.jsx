import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import * as R from 'ramda';
import { State } from '@client/components';
import { withRouter } from 'react-router-dom';
import {
    ExternalID,
    Amount,
    RecordActions,
    Header,
    User,
} from './components';

class WithdrawalTable extends React.Component {
    state = {
        selectedIds: [],
        actions: [],
    };

    onChangeSelection = (selectedRowKeys) => {
        const { data } = this.props;
        const rowsActions = data
            .filter(({ id }) => selectedRowKeys.indexOf(id) > -1)
            .map(({ actions }) => actions);
        const selectedActions = rowsActions.length
            ? rowsActions.reduce((memo, actions) => R.intersection(memo, actions))
            : [];

        this.setState({
            selectedIds: selectedRowKeys,
            actions: selectedActions,
        });
    };

    onChange = ({ current }) => {
        const { onPaginate } = this.props;

        onPaginate(current);
    };

    getCheckboxProps = record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    });

    getColumns = () => {
        const { model } = this.props;

        return [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${this.props.location.pathname}/${id}`}
                >
                    {id}
                </a>
            ),
        }, {
            title: 'Ext. ID',
            dataIndex: 'external_id',
            key: 'externalId',
            render: externalId => (externalId && <ExternalID value={externalId} />),
        }, {
            title: 'Пользователь',
            dataIndex: 'payData',
            key: 'user',
            render: ({ userData }) => <User {...userData} />,
        }, {
            title: 'Система',
            dataIndex: 'paymentSystem',
            key: 'system',
        }, {
            title: 'Метод',
            dataIndex: 'paymentMethod',
            key: 'method',
        }, {
            title: 'Сумма',
            dataIndex: 'amount_client',
            key: 'amount',
            render: (
                amount,
                {
                    paymentChannel: {
                        currency_id: currencyId,
                    },
                },
            ) => (
                <Amount
                    value={amount}
                    currencyId={currencyId}
                />
            ),
        }, {
            title: 'Статус',
            dataIndex: 'state',
            key: 'state',
            render: state => <State value={state} />,
        }, {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            width: 100,
            render: (actions, { id }) => <RecordActions ids={[id]} list={actions} model={model} />,
        }];
    };

    render() {
        const { selectedIds, actions } = this.state;
        const {
            data,
            loading,
            actionsLocked,
            shouldUpdate,
            pagination,
            model,
            onPaginate,
        } = this.props;

        return (
            <div>
                <Table
                    title={() => (
                        <Header
                            ids={selectedIds}
                            actions={actions}
                            actionsLocked={actionsLocked}
                            shouldUpdate={shouldUpdate}
                            total={pagination.total}
                            model={model}
                            onRefresh={() => onPaginate(pagination.current)}
                        />
                    )}
                    loading={loading}
                    size="middle"
                    columns={this.getColumns()}
                    dataSource={data}
                    rowKey="id"
                    rowClassName="row"
                    rowSelection={{
                        onChange: this.onChangeSelection,
                        getCheckboxProps: this.getCheckboxProps,
                    }}
                    onChange={this.onChange}
                    pagination={{
                        ...pagination,
                        position: 'both',
                    }}
                />
            </div>
        );
    }
}

WithdrawalTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    actions: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    pagination: PropTypes.shape({
        current: PropTypes.number,
        total: PropTypes.number,
    }).isRequired,
    model: PropTypes.oneOf(['payment', 'payout']).isRequired,
    actionsLocked: PropTypes.bool,
    shouldUpdate: PropTypes.bool,
    onPaginate: PropTypes.func.isRequired,
};

WithdrawalTable.defaultProps = {
    data: [],
    location: {},
    actions: [],
    actionsLocked: false,
    shouldUpdate: false,
};

export default withRouter(WithdrawalTable);
