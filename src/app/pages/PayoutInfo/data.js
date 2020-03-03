import { withAPIData } from '@client/decorators';

export default withAPIData(props => `/payout/${props.match.params.id}`);
