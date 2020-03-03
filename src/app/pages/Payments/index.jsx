import React, { useEffect } from 'react';
import { DataTable, Filter } from './components';
import {
    Wrapper,
    Header,
    Content,
    Side,
} from './styled';

const TITLE = 'Заявки на ввод денег';

export default () => {
    useEffect(() => {
        document.title = TITLE;
    }, []);

    return (
        <Wrapper>
            <Header>
                <h1 style={{ marginTop: 0 }}>{TITLE}</h1>
            </Header>
            <Content size="small" bordered={false}>
                <DataTable />
            </Content>
            <Side>
                <Filter />
            </Side>
        </Wrapper>
    );
};
