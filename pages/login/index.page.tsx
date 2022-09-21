import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch } from 'src/store/hooks'
import { Button, Checkbox, Form, Input, Col, Row, Space } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { loginActions } from './loginSlice'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validations'

// layout
// layout
import type { ReactElement } from 'react'
import WrapLayout from 'src/layout/wrapLayout'
import type { NextPageWithLayout } from 'pages/_app.page'

import classes from './styles.module.scss'

const Login: NextPageWithLayout = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    dispatch(loginActions.doLogin(values))
  }

  return (
    <Row>
      <Col span={10}>
        <div>
          <Image
            src="https://images.pexels.com/photos/2473990/pexels-photo-2473990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Picture of the author"
            width={500}
            height={500}
            layout="fill"
          />
        </div>
      </Col>
      <Col span={14}>
        <div className={classes.loginContainer}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Link href="/">
              <a>
                <img src="/images/logoft.png" alt="Logo" />
              </a>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="identity"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.identity && 'error'}
                    help={errors.identity && `${errors.identity.message}`}
                  >
                    <Input
                      {...field}
                      prefix={<UserOutlined />}
                      placeholder="Email/ số điện thoại"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.password && 'error'}
                    help={errors.password && `${errors.password.message}`}
                  >
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined />}
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="remember"
                render={({ field }) => (
                  <Form.Item valuePropName="checked">
                    <Checkbox {...field}>Lưu mật khẩu</Checkbox>
                  </Form.Item>
                )}
              />
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Đăng nhập
                </Button>
              </Form.Item>
            </form>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Space>
        </div>
      </Col>
    </Row>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <WrapLayout>{page}</WrapLayout>
}

export default Login
