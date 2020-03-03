import styled from 'styled-components';
import { Row, Col } from 'antd';

export const Wrapper = styled.div`
    text-align: center;
`;

export const Content = styled.div`
    padding-top: 26px;
`;

export const QRCodeFrame = styled.canvas`
    width: 244px;
    height: 244px;
`;

export const Info = styled(Row)`
    margin-top: 26px;
    text-align: left;
`;

export const GuideCol = styled(Col)`
    padding-top: 10px;
`;
