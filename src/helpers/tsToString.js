import moment from 'moment';
import { store } from '@client/store';

export default (ts) => {
    const { tz } = store.getState().app;
    const creationDate = moment(ts * 1000);
    const offset = creationDate.utcOffset();
    const tzAbbr = moment.tz.zone(tz).abbr(offset);

    return `${creationDate.format('DD MMMM YYYY, HH:mm:ss')} ${tzAbbr}`;
};
