import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../../../../store/slice/common';
import { useDispatch } from 'react-redux';
import { DownSquareOutlined, MenuUnfoldOutlined } from '@ant-design/icons';


function RightTopDropdown() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const logout = () => {
        dispatch(setIsLogin(false))

        navigator('/login');
    };

    const dropdownMenu = (
        <Menu>
            <Menu.Item key="1" icon={<MenuUnfoldOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<MenuUnfoldOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<MenuUnfoldOutlined />} onClick={logout}>
                退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={dropdownMenu}>
            <DownSquareOutlined style={{ fontSize: 24, verticalAlign: 'middle' }} onClick={(e) => e.preventDefault()} />
        </Dropdown>
    );
}

export default RightTopDropdown;
