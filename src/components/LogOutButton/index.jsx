import React from 'react';
import { Button } from 'antd';
import withData from './data';

@withData
class LogOutButton extends React.PureComponent {
    render() {
        const { logOut } = this.props;
        return (
            <Button
                type="primary"
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    marginLeft: '50%',
                    transform: 'translate(-50%, 0)',
                }}
                onClick={logOut}
            >
                Log out
            </Button>
        );
    }
}
export default LogOutButton;
