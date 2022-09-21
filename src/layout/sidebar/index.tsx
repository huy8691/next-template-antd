import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import {
  UserOutlined,
  PieChartOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import classes from './styles.module.scss'

// theme
import { useTheme } from 'next-themes'

// start menu
type MenuItem = Required<MenuProps>['items'][number]
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}
const items: MenuItem[] = [
  getItem(
    <Link href="/">
      <a>Dashboard</a>
    </Link>,
    'dashboard',
    <PieChartOutlined />
  ),
  getItem('User', 'user', <UserOutlined />, [
    getItem(
      <Link href="/list-user">
        <a>List user</a>
      </Link>,
      'listUser'
    ),
    getItem(
      <Link href="/create-user">
        <a>Create User</a>
      </Link>,
      'createUser'
    ),
  ]),
  getItem('Product', 'product', <TeamOutlined />, [
    getItem(
      <Link href="/products">
        <a>List product</a>
      </Link>,
      'listProduct'
    ),
    getItem('Create product', 'createProduct'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]
// end menu

const SideBar = () => {
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  // start theme and fix err theme
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  // end theme and fix err theme

  return (
    <>
      <Link href="/">
        <a>
          <div className={classes.logo} />
        </a>
      </Link>
      <Menu
        theme={theme && theme === 'light' ? 'light' : 'dark'}
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        selectedKeys={[current]}
        items={items}
        onClick={onClick}
      />
    </>
  )
}
export default SideBar
