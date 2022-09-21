import React, { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Spin, notification } from 'antd'
import { useAppSelector } from 'src/store/hooks'
import { Provider } from 'react-redux'
import { store } from 'src/store/store'
import classes from './styles.module.scss'
import { ConfigProvider } from 'antd'
// import vi_VN from 'antd/lib/locale/vi_VN'
// import 'moment/locale/vi'
import { ThemeProvider } from 'next-themes'

type Props = {
  children: ReactElement
}
const LayoutInner = ({ children }: Props) => {
  const notificationApp = useAppSelector((state) => state.notification)
  const loading = useAppSelector((state) => state.loading)
  useEffect(() => {
    if (notificationApp.message) {
      const request = () => {
        if (notificationApp.type === undefined) {
          return 'success'
        }
        return notificationApp.type
      }
      notification[request()]({
        message: notificationApp.message,
        placement: 'bottomLeft',
        duration: notificationApp.duration,
      })
    }
  }, [notificationApp])
  return (
    <>
      {children}
      {loading.isLoading && (
        <div className={classes.loading}>
          <Spin size="large" />
        </div>
      )}
    </>
  )
}
const WrapLayout = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ConfigProvider>
          <LayoutInner>{children}</LayoutInner>
        </ConfigProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default WrapLayout
