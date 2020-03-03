import styled from 'styled-components';
import { Statistic } from 'antd';

export const AmountRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const SecondaryStatistic = styled(Statistic)`
    .ant-statistic-content {
        color: rgba(0,0,0,.45);
    }
`;
