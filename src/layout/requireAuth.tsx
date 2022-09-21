import Cookies from 'js-cookie'
import type { ReactElement } from 'react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Result } from 'antd'
import classes from './styles.module.scss'

const RequireAuth: React.FC<{
  children: ReactElement
}> = ({ children }) => {
  const token = Boolean(Cookies.get('token'))
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  const [is403, setIs403] = useState<boolean>(false)
  useEffect(() => {
    setIsLoggedIn(token)
    if (!token) {
      setIs403(true)
    }
  }, [token])
  return (
    <div className={classes.requireAuth}>
      {isLoggedIn && children}
      {is403 && (
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, bạn không được phép truy cập trang này."
          extra={
            <Button type="primary">
              <Link href="/login">
                <a>Quay lại trang chủ</a>
              </Link>
            </Button>
          }
        />
      )}
    </div>
  )
}
export default RequireAuth
