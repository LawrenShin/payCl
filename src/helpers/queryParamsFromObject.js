import qs from 'querystring';

export default params => '?'.concat(qs.stringify(params));
