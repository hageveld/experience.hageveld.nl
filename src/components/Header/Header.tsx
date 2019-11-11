import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { Menu, Icon, Badge } from 'antd';
import { useSelector } from '../../hooks';

const { SubMenu } = Menu;

const Header: FunctionComponent = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const auth = useSelector(state => state.auth.auth);

    return (
        <Menu
            onClick={() => false}
            selectedKeys={[]}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="home">
                <Link to="/">
                    <Icon type="home" />
                    Hageveld Experience
                </Link>
            </Menu.Item>
            {isLoggedIn ? (
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            <Icon type="user" />
                            {isLoggedIn ? auth.roepnaam : 'Gebruiker'}
                        </span>
                    }
                    style={{
                        float: 'right'
                    }}
                >
                    {auth.admin && (
                        <Menu.Item key="setting:0">
                            <Link to="/admin">
                                <Icon type="crown" /> Admin
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="setting:1">
                        <Link to="/inschrijven">
                            <Icon type="edit" /> Inschrijven
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/uitloggen">
                            <Icon type="user-delete" /> Uitloggen
                        </Link>
                    </Menu.Item>
                </SubMenu>
            ) : (
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            <Icon type="user" />
                            {isLoggedIn ? auth.roepnaam : 'Gebruiker'}
                        </span>
                    }
                    style={{
                        float: 'right'
                    }}
                >
                    <Menu.Item key="setting:1">
                        <Link to="/inloggen">
                            <Icon type="form" /> Inloggen
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/registreren">
                            <Icon type="user-add" /> Registreren
                        </Link>
                    </Menu.Item>
                </SubMenu>
            )}
            {isLoggedIn && (
                <SubMenu
                    title={
                        <Badge count={5} dot={true}>
                            <Icon type="bell" style={{ marginRight: '0px' }} />
                        </Badge>
                    }
                    style={{
                        float: 'right'
                    }}
                >
                    {auth.admin && (
                        <Menu.Item key="setting:0">
                            <Link to="/admin">
                                <Icon type="crown" /> Admin
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="setting:1">
                        <Link to="/inschrijven">
                            <Icon type="edit" /> Inschrijven
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/uitloggen">
                            <Icon type="user-delete" /> Uitloggen
                        </Link>
                    </Menu.Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default Header;
