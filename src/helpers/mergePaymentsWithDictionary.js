import { store } from '@client/store';

export default (payments) => {
    const { dictionary } = store.getState();
    const {
        paymentMethods,
        paymentSystems,
    } = dictionary;

    return payments.map(payment => ({
        ...payment,
        paymentMethod: paymentMethods
            .find(({ id }) => id === payment.paymentChannel.payment_method_id).name,
        paymentSystem: paymentSystems
            .find(({ id }) => id === payment.paymentChannel.payment_system_id).name,
    }));
};
