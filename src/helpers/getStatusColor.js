export default (status) => {
    switch (status) {
        case 'transferApplied':
        case 'okPaymentSystem':
        case 'complete':
        case 'payoutSystemOk':
        case 'processingAccept':
        case 'psOk':
        case 'accept':
        case 'unHold':
        case 'reCreated':
            return 'green';
        case 'failPaymentSystem':
        case 'error':
        case 'payoutSystemFail':
        case 'processingDecline':
        case 'canceled':
        case 'declined':
        case 'antiFraudFail':
        case 'decline':
        case 'psFail':
        case 'errorAfterAccept':
            return 'volcano';
        case 'projectNotified':
        case 'workProcessing':
        case 'new':
        case 'holdMoney':
        case 'psStart':
        case 'psStatus':
        case 'hold':
        case 'antiFraud':
            return 'blue';
        case 'workPaymentLayer':
        case 'waitPaymentSystem':
        case 'payoutSystemWaitOne':
        case 'payoutSystemWaitTwo':
            return 'gold';
        case 'processingWait':
            return 'cyan';
        case 'processingDelay':
        case 'waitAccept':
        case 'delay':
            return 'orange';
        default:
            return 'gray';
    }
};
