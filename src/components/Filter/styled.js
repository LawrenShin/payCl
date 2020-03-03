import styled from 'styled-components';
import { Form } from 'antd';

export const FormItem = styled(Form.Item)`
    margin-bottom: ${props => (props.drop ? 0 : 24)}px;
`;

export const InlineItem = styled(Form.Item)`
    display: inline-block;
    width: calc(50% - 12px);
    margin-bottom: 0;
`;

export const InlineDivider = styled.span`
    display: inline-block;
    width: 24px;
    text-align: center;
`;

export const ClearWrapper = styled.div`
    margin-bottom: 10px;
`;
