import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Divider,
    Icon,
    Tooltip,
} from 'antd';
import { GroupActions } from '@client/widgets';
import { Wrapper, WarnWrapper } from './styled';

const TableActions = (props) => {
    const {
        ids,
        list,
        model,
        disabled,
        shouldUpdate,
        onRefresh,
    } = props;

    return (
        <Wrapper>
            <GroupActions ids={ids} list={list} expanded disabled={disabled} model={model} />
            <Divider type="vertical" />
            {shouldUpdate && (
                <WarnWrapper>
                    <Tooltip
                        title={
                            'В таблице представлены неактуальные данные. '
                            + 'Советуем обновить заявки.'
                        }
                    >
                        <Icon
                            type="exclamation-circle"
                            theme="twoTone"
                            twoToneColor="#faad14"
                        />
                    </Tooltip>
                </WarnWrapper>
            )}
            <Button onClick={onRefresh}>Обновить заявки</Button>
        </Wrapper>
    );
};

TableActions.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number),
    list: PropTypes.arrayOf(PropTypes.string),
    model: PropTypes.oneOf(['payment', 'payout']).isRequired,
    disabled: PropTypes.bool,
    shouldUpdate: PropTypes.bool,
    onRefresh: PropTypes.func,
};

TableActions.defaultProps = {
    ids: [],
    list: {},
    disabled: false,
    shouldUpdate: false,
    onRefresh: () => {},
};

export default TableActions;
