import styled from 'styled-components';
import { Input } from 'antd';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Group = styled.div`
    position: relative;

    & + & {
        margin-left: 40px;
    }
`;

export const Symbol = styled(Input)`
    width: 36px;
    text-align: center;

    & + & {
        margin-left: 16px;
    }
`;
