import { connect } from 'react-redux';
import { accept } from '@client/store/payouts';

export default connect(
    (state, props) => {
        const { dictionary, payouts } = state;
        const { ids } = props;
        const changedSystems = payouts.items.filter(({
            id,
            available_system_ids: availableSystemIds,
        }) => availableSystemIds && ids.includes(id));

        if (ids.length > changedSystems.length) return [];

        const commonSystemIds = changedSystems.reduce(
            (commonIds, { available_system_ids: availableSystemIds }, i) => (
                i === 0
                    ? availableSystemIds
                    : availableSystemIds.filter(systemId => commonIds.includes(systemId))
            ),
            [],
        );

        return {
            paymentSystems: dictionary.paymentSystems
                .filter(system => commonSystemIds.includes(system.id))
                .map(({ id, name }) => ({ value: id, label: name })),
        };
    },
    {
        action: accept,
    },
);
