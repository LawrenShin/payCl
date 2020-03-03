import React from 'react';
import { Button } from 'antd';
import Action from '../Action';
import withData from './data';

const GroupActions = (props) => {
    const {
        ids,
        actions,
        disabled,
        expanded,
        size = 'default',
        model,
        className,
        style,
    } = props;

    return (
        <Button.Group size={size} className={className} style={style}>
            {Object.keys(actions).map(action => (
                <Action
                    key={action}
                    type={action}
                    title={actions[action]}
                    ids={ids}
                    expanded={expanded}
                    disabled={disabled}
                    model={model}
                />
            ))}
        </Button.Group>
    );
};

export default withData(GroupActions);
