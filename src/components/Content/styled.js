import styled, { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import { Layout } from 'antd';

export const GlobalStyles = createGlobalStyle`
    ${normalize}
`;

export const Header = styled(Layout.Header)`
    text-align: right;
`;

export const Wrapper = styled(Layout)`
    height: 100vh;
`;

export const SpinWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
`;

export const Page = styled(Layout)`
    padding: 24px;
`;

export const ProjectSelector = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 16px;
    width: 100%;
`;

export const Flag = styled.img`
    vertical-align: baseline;
    margin-right: 8px;

    @media (max-width: 960px) {
        margin-right: 0;
    }
`;

export const ProjectName = styled.span`
    max-width: 85px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;

    @media (max-width: 960px) {
        display: none !important;
    }
`;
