import React, { useState, useEffect } from 'react'
import HeaderInner from './header'
import SideBar from './sidebar'
import type { ReactElement } from 'react'
import WrapLayout from './wrapLayout'
import { Layout, Space } from 'antd'

// import RequireAuth from './requireAuth'
import classes from './styles.module.scss'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
type Props = {
  children: ReactElement
}

const { Sider, Content, Header } = Layout
const NestedLayout: React.FC<Props> = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  // start theme and fix err theme
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // end theme and fix err theme
  return (
    <>
      <WrapLayout>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={classes.slider}
          >
            <SideBar />
          </Sider>
          <Layout>
            <Header
              className={`${classes.header} ${
                collapsed ? classes.collapsed : ''
              }`}
            >
              <Space size="large">
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
                <HeaderInner />
              </Space>
            </Header>
            <Content
              className={`${classes.siteContent} ${
                collapsed ? classes.collapsed : ''
              }`}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </WrapLayout>
    </>
  )
}
export default NestedLayout
