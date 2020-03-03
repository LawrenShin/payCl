import { store } from '@client/store';

export default (payouts) => {
    const { dictionary } = store.getState();
    const {
        paymentMethods,
        paymentSystems,
        statesPayout,
    } = dictionary;

    return payouts.map(payout => ({
        ...payout,
        paymentMethod: paymentMethods.find(({ id }) => id === payout.payment_method_id).name,
        paymentSystem: paymentSystems.find(({ id }) => id === payout.payment_system_id).name,
        stateName: statesPayout[payout.state],
    }));
};
