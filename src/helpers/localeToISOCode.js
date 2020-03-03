export default (locale) => {
    switch (locale) {
        case 'ru-RU':
            return 'ru';
        case 'en-US':
            return 'us';
        case 'en-UK':
            return 'gb';
        case 'pt-BR':
            return 'br';
        default:
            return 'world';
    }
};
