import localForage from 'localforage';

const endpoint = 'http://processing.local/api/v1/admin';

const authorizedFetch = (url, options) => fetch(endpoint + url, options);
export const authorizedGet = async (url) => {
    const token = await localForage.getItem('accessToken');

    return authorizedFetch(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
export const authorizedPost = async (url, body) => {
    const token = await localForage.getItem('accessToken');

    return authorizedFetch(url, {
        method: 'POST',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};
