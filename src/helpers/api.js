import { signInFailed, twoFactorFailed, passwordOutdated } from '@client/store/authentication';
import { cleanOptions, queryParamsFromObject, uid } from '@client/helpers';

class API {
    static dependencyType = {
        otpDisabled: 0,
        otpCheck: 1,
        oldPassword: 2,
    };

    static mapDepType(type) {
        switch (type) {
            case 'otpEnable':
                return API.dependencyType.otpDisabled;
            case 'otpCheck':
                return API.dependencyType.otpCheck;
            case 'passwordChange':
                return API.dependencyType.oldPassword;
            default:
                return type;
        }
    }

    constructor() {
        this.baseURL = 'http://processing.local/api/v1/admin';
        this.pending = [];
        this.resolvingDependency = null;
    }

    setStore(store) {
        this.store = store;
    }

    getURL(endpoint, params) {
        const qs = params ? queryParamsFromObject(cleanOptions(params)) : '';

        return `${this.baseURL}${endpoint}${qs}`;
    }

    getHeaders() {
        const token = this.store.getState().session.oauth?.accessToken;

        return new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
    }

    unauthorized() {
        this.store.dispatch(signInFailed());
    }

    failedDependency(id, type) {
        if (!this.resolvingDependency) {
            switch (type) {
                case API.dependencyType.otpDisabled:
                case API.dependencyType.otpCheck:
                    this.store.dispatch(twoFactorFailed());
                    break;
                case API.dependencyType.oldPassword:
                    this.store.dispatch(passwordOutdated());
                    break;
                default:
                    throw new Error('Unknown dependency type');
            }
        }

        // для каждого запроса с ошибкой `Failed Dependency` ждем пока юзер пройдет аунтефикацию
        // и после пробуем еще раз получить данные
        return new Promise((resolve) => {
            this.resolvingDependency = true;
            let prevTwoFactorComplete;

            this.store.subscribe(() => {
                const twoFactorComplete = this.store.getState().authentication.twoFactor.complete;

                if (!prevTwoFactorComplete && twoFactorComplete) {
                    this.resolvingDependency = false;
                    this.retryRequest(id).then(resolve);
                }

                prevTwoFactorComplete = twoFactorComplete;
            });
        });
    }

    async errorHandler(id, status, data) {
        switch (status) {
            case 200:
            case 422:
            case 500:
                return data;
            case 401:
                return this.unauthorized();
            case 424:
                return this.failedDependency(id, API.mapDepType(data.data.type));
            default:
                throw new Error('Unknown error');
        }
    }

    addPendingRequest(method, args) {
        const id = uid();

        this.pending.push({ id, method, args });

        return id;
    }

    removePendingRequest(id) {
        const index = this.pending.findIndex(request => request.id === id);

        this.pending.splice(index, 1);
    }

    async retryRequest(id) {
        if (this.pending.length === 0) return Promise.resolve();

        const request = this.pending.find(req => req.id === id);

        this.removePendingRequest(request.id);

        return this[request.method](...request.args);
    }

    async responseHandler(id, httpStatus, data) {
        if (data.status > 0) {
            return this.errorHandler(id, httpStatus, data);
        }

        this.removePendingRequest(id);

        return data;
    }

    get(endpoint, params) {
        const requestId = this.addPendingRequest('get', [endpoint, params]);
        let status = 0;

        return fetch(this.getURL(endpoint, params), {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then((response) => {
                // eslint-disable-next-line prefer-destructuring
                status = response.status;
                return response.json();
            })
            .then(json => this.responseHandler(requestId, status, json));
    }

    post(endpoint, data) {
        const requestId = this.addPendingRequest('post', [endpoint, data]);
        let status = 0;

        return fetch(this.getURL(endpoint), {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        })
            .then((response) => {
                // eslint-disable-next-line prefer-destructuring
                status = response.status;
                return response.json();
            })
            .then(json => this.responseHandler(requestId, status, json));
    }

    getToken(data) {
        return fetch('http://processing.local/oauth/token', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
    }
}

export default new API();
