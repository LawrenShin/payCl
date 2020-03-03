const amount = (locale = 'ru-RU', value, currency) => {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });

    return formatter.format(value);
};

export default amount;
