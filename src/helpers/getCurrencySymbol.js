export default (currencyISO) => {
    switch (currencyISO) {
        case 'AUD':
            return 'A$';
        case 'RUB':
            return '₽';
        case 'BRL':
            return 'R$';
        case 'USD':
            return '$';
        default:
            return '';
    }
};
