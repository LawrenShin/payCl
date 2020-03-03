import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

const UserMenu = () => {
    const profile = useSelector(state => state.session.user);

    if (!profile) return null;

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
        >
            <Menu.SubMenu title="SubMenu">
                <Menu.Item>SubMenuItem</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default UserMenu;
