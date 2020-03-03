import { withAPIData } from '@client/decorators';

export default withAPIData(props => `/payment/${props.match.params.id}`);
