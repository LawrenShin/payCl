import { connect } from 'react-redux';
import moment from 'moment';
import * as paymentsActions from '@client/store/payouts';
import Filter from '@client/components/Filter';

export default connect(
    state => ({
        loading: state.payouts.loading,
        states: state.dictionary.workflow.payout,
        systems: state.dictionary.paymentSystems
            .filter(({ project_id: projectId }) => projectId === state.app.project),
        methods: state.dictionary.paymentMethods,
        filter: {
            ...state.payouts.filter,
            method: state.payouts.filter.payout_method_id,
            system: state.payouts.filter.payout_system_id,
            created_at: state.payouts.filter.created_at.length > 0
                ? [
                    moment(state.payouts.filter.created_at[0]),
                    moment(state.payouts.filter.created_at[1]),
                ]
                : undefined,
            confirmed_at: state.payouts.filter.confirmed_at.length > 0
                ? [
                    moment(state.payouts.filter.confirmed_at[0]),
                    moment(state.payouts.filter.confirmed_at[1]),
                ]
                : undefined,
        },
    }),
    {
        ...paymentsActions,
    },
)(Filter);
