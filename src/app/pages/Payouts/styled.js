import styled from 'styled-components';
// import { Card } from 'antd';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-areas: 'header' 'sidebar' 'content';
    grid-gap: 24px;
`;
export const Header = styled.div`
    grid-area: header;
`;
export const Content = styled.div`
    grid-area: content;
    width: 100%;
    
    .ant-table {
        background-color: #ffffff;
    }
`;
export const Side = styled.div`
    grid-area: sidebar;
    position: relative;
`;
