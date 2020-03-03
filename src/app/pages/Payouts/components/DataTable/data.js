import { connect } from 'react-redux';
import { mergePayoutsWithDictionary } from '@client/helpers';
import { filterApply } from '@client/store/payouts/actions';

export default connect(
    ({
        dictionary: { actions },
        payouts,
        payouts: { pagination },
    }) => ({
        actions: Object.keys(actions.payout),
        data: mergePayoutsWithDictionary(payouts.items),
        pagination: {
            current: pagination.current_page,
            total: pagination.total,
            pageSize: pagination.per_page,
        },
        loading: payouts.loading,
        actionsLocked: payouts.actionsLocked,
        shouldUpdate: payouts.shouldUpdate,
    }),
    { filterApply },
);
