import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import TableActions from '../TableActions';
import { Wrapper, ActionsWrapper } from './styled';

const { Text } = Typography;

const Header = (props) => {
    const {
        actions,
        ids,
        model,
        actionsLocked,
        shouldUpdate,
        // total,
        onRefresh,
    } = props;
    return (
        <Wrapper>
            <ActionsWrapper>
                <Text type="secondary">
                    <span>Выбрано: </span>
                    <span>{ids.length}</span>
                </Text>

                <TableActions
                    list={actions}
                    ids={ids}
                    model={model}
                    disabled={actionsLocked || ids.length === 0}
                    shouldUpdate={shouldUpdate}
                    onRefresh={onRefresh}
                />
            </ActionsWrapper>
        </Wrapper>
    );
};

Header.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string),
    ids: PropTypes.arrayOf(PropTypes.number),
    model: PropTypes.oneOf(['payment', 'payout']).isRequired,
    actionsLocked: PropTypes.bool,
    shouldUpdate: PropTypes.bool,
    // total: PropTypes.number,
    onRefresh: PropTypes.func,
};

Header.defaultProps = {
    actions: {},
    ids: [],
    actionsLocked: false,
    shouldUpdate: false,
    // total: 0,
    onRefresh: () => {},
};

export default Header;
