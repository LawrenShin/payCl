export default (action) => {
    switch (action) {
        case 'checkPaymentStatus':
            return 'security-scan';
        case 'approve':
        case 'applyTransfer':
            return 'check';
        case 'projectNotify':
            return 'notification';
        case 'refundPayment':
            return 'calculator';
        default:
            return 'question';
    }
};
