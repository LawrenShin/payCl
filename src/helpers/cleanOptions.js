export default options => Object.keys(options).reduce((result, key) => {
    const option = options[key];

    if (
        !option
        || (
            typeof option === 'object'
            && option.length === 0
        )
    ) {
        return result;
    }

    return {
        ...result,
        [key]: option,
    };
}, {});
