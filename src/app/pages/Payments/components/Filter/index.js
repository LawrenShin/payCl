import { connect } from 'react-redux';
import moment from 'moment';
import * as paymentsActions from '@client/store/payments';
import Filter from '@client/components/Filter';

export default connect(
    state => ({
        loading: state.payments.loading,
        states: state.dictionary.workflow.payment,
        systems: state.dictionary.paymentSystems
            .filter(({ project_id: projectId }) => projectId === state.app.project),
        methods: state.dictionary.paymentMethods,
        filter: {
            ...state.payments.filter,
            method: state.payments.filter.payment_method_id,
            system: state.payments.filter.payment_system_id,
            created_at: state.payments.filter.created_at.length > 0
                ? [
                    moment(state.payments.filter.created_at[0]),
                    moment(state.payments.filter.created_at[1]),
                ]
                : undefined,
            confirmed_at: state.payments.filter.confirmed_at.length > 0
                ? [
                    moment(state.payments.filter.confirmed_at[0]),
                    moment(state.payments.filter.confirmed_at[1]),
                ]
                : undefined,
        },
    }),
    {
        ...paymentsActions,
    },
)(Filter);
