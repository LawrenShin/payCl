import { amount } from '@client/helpers';
import withData from './data';

const Amount = ({ value, currency }) => amount('ru-RU', value, currency);

export default withData(Amount);
