import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge, Avatar, Dropdown, Menu, Space, Switch } from 'antd'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { BellOutlined } from '@ant-design/icons'
import { loginActions } from 'pages/login/loginSlice'
import { userInfoActions } from 'src/store/userInfo/userInfoSlice'
import classes from './styles.module.scss'

// theme
import { useTheme } from 'next-themes'

const HeaderInner = () => {
  const token = Boolean(Cookies.get('token'))
  const dispatch = useAppDispatch()

  // state

  // reducer
  const userInfoReducer = useAppSelector((state) => state.userInfo)

  const handleLogout = () => {
    dispatch(loginActions.doLogout())
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <Link href="/account">Info User</Link>,
        },
        {
          key: '2',
          label: <div onClick={handleLogout}>Logout</div>,
        },
      ]}
    />
  )

  useEffect(() => {
    if (token) {
      dispatch(userInfoActions.doUserInfo())
    }
  }, [token, dispatch])

  // start theme and fix err theme
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     // require('./themeDark.less')
  //   }
  // }, [theme])

  if (!mounted) {
    return null
  }
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }
  // end theme and fix err theme
  return (
    <>
      <Space size="large">
        <Switch
          checked={theme === 'dark' ? true : false}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <div className={classes.listItem}>
          <div className={classes.item}>
            <Link href="/account/noti">
              <Badge size="small" count={0} showZero>
                <BellOutlined />
              </Badge>
            </Link>
          </div>
          <div className={classes.itemUser}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Space size={10}>
                <Avatar src={userInfoReducer?.data?.avatar}>
                  {userInfoReducer?.data?.fullName?.charAt(0)}
                </Avatar>
                <div className={classes.itemUserName}>
                  {userInfoReducer?.data?.fullName}
                </div>
              </Space>
            </Dropdown>
          </div>
        </div>
      </Space>
    </>
  )
}
export default HeaderInner
