import { connect } from 'react-redux';
import { mergePaymentsWithDictionary } from '@client/helpers';
import { filterApply } from '@client/store/payments/actions';
import View from './view';

export default connect(
    state => ({
        actions: Object.keys(state.dictionary.actions.payment),
        data: mergePaymentsWithDictionary(state.payments.items),
        pagination: {
            current: state.payments.pagination.current_page,
            total: state.payments.pagination.total,
            pageSize: state.payments.pagination.per_page,
        },
        loading: state.payments.loading,
        actionsLocked: state.payments.actionsLocked,
        shouldUpdate: state.payments.shouldUpdate,
    }),
    {
        filterApply,
    },
)(View);
