import { connect } from 'react-redux';

export default connect((
    { dictionary },
    {
        value,
        currencyId,
    },
) => {
    const {
        iso_code: currency,
    } = dictionary.currencies.find(item => item.id === currencyId);
    const formatter = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency,
    });

    return {
        formattedValue: formatter.format(value),
    };
});
