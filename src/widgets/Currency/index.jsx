import { useMemo } from 'react';
import withData from './data';

const Currency = (props) => {
    const { id, currencies } = props;
    const { iso_code: iso } = useMemo(() => (
        currencies.find(currency => currency.id === id)
    ), [id, currencies]);
    const symbol = useMemo(() => {
        const formatter = new Intl.NumberFormat('ru', { style: 'currency', currency: iso });
        const parts = formatter.formatToParts(0);
        const { value } = parts.find(({ type }) => type === 'currency');

        return value;
    }, [iso]);

    return symbol;
};

export default withData(Currency);
