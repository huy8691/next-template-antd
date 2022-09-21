import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  Button,
  Select,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Typography,
  Space,
} from 'antd'
import { registerActions } from './registerSlice'
import { phoneOtpAPI } from './registerAPI'
import { loadingActions } from 'src/store/loading/loadingSlice'
import { notificationActions } from 'src/store/notification/notificationSlice'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import Cookies from 'js-cookie'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, phoneRegExp } from './validations'

// layout
import type { ReactElement } from 'react'
import WrapLayout from 'src/layout/wrapLayout'
import type { NextPageWithLayout } from 'pages/_app.page'

import classes from './styles.module.scss'

const { Option } = Select
const Register: NextPageWithLayout = () => {
  const register = useAppSelector((state) => state.register)
  const [count, setCount] = useState<number>(120)
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    dispatch(registerActions.doRegister(values))
  }

  //Disable Date of Birth
  const disabledDate = (current: any) => {
    return current && current > moment().endOf('day')
  }

  const handleSendOTP = () => {
    // check null phone number
    let phoneNumber = getValues('phoneNumber')
    if (!phoneNumber) {
      setError(
        'phoneNumber',
        {
          type: 'focus',
          message: 'Vui lòng nhập số điện thoại',
        },
        { shouldFocus: true }
      )
      return
    }

    // check format phone number
    let regex = new RegExp(phoneRegExp)
    if (!regex.test(phoneNumber)) {
      setError(
        'phoneNumber',
        {
          type: 'focus',
          message: 'Số điện thoại không đúng',
        },
        { shouldFocus: true }
      )
    } else {
      clearErrors(['phoneNumber'])
      phoneOtpAPI(phoneNumber)
        .then(() => {
          dispatch(loadingActions.doLoadingSuccess())
          dispatch(
            notificationActions.doNotification({
              message: 'Gởi OTP thành công',
            })
          )

          // set count down
          let time = Math.floor(Date.now() / 1000)
          Cookies.set('timeCountCookies', time.toString())
          setCount(119)
          let countDown = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount === 1) {
                clearInterval(countDown)
                prevCount = 120
                return prevCount
              }
              prevCount = prevCount - 1
              return prevCount
            })
          }, 1000)
        })
        .catch(() => {
          dispatch(loadingActions.doLoadingFailure())
          dispatch(
            notificationActions.doNotification({
              type: 'error',
              message: 'Gởi OTP không thành công',
            })
          )
        })
    }
  }

  // set time count down in cookie
  // const countFunction = useMemo(() => {
  //   let time = Math.floor(Date.now() / 1000)
  //   let timeCountCookies = Cookies.get('timeCountCookies')
  //   if (timeCountCookies) {
  //     if (time - parseInt(timeCountCookies) > 120) {
  //       setCount(120)
  //       Cookies.remove('timeCountCookies')
  //     } else {
  //       setCount(120 - time + parseInt(timeCountCookies))
  //       let countDown = setInterval(() => {
  //         setCount((prevCount) => {
  //           if (prevCount === 1) {
  //             clearInterval(countDown)
  //             prevCount = 120
  //             return prevCount
  //           }
  //           prevCount = prevCount - 1
  //           return prevCount
  //         })
  //       }, 1000)
  //     }
  //   }
  // }, [])

  // clear form when create account success
  useEffect(() => {
    if (register.data) {
      reset()
    }
  }, [register, reset])

  return (
    <Row>
      <Col span={10}>
        <div>
          <Image
            src="https://images.pexels.com/photos/1161375/pexels-photo-1161375.jpeg?cs=srgb&dl=pexels-nathan-cowley-1161375.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            layout="fill"
          />
        </div>
      </Col>
      <Col span={14}>
        <div className={classes.registerContainer}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Link href="/">
              <a>
                <img src="/images/logoft.png" alt="Logo" />
              </a>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.fullName && 'error'}
                    help={errors.fullName && `${errors.fullName.message}`}
                  >
                    <Input {...field} placeholder="Họ và tên" />
                  </Form.Item>
                )}
              />
              <Row gutter={24}>
                <Col span={16}>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Form.Item
                        validateStatus={errors.phoneNumber && 'error'}
                        help={
                          errors.phoneNumber && `${errors.phoneNumber.message}`
                        }
                      >
                        <Input {...field} placeholder="Số điện thoại" />
                      </Form.Item>
                    )}
                  />
                </Col>
                <Col span={8}>
                  <Button
                    type="primary"
                    block
                    onClick={() => handleSendOTP()}
                    disabled={count > 0 && count < 120}
                  >
                    Gởi mã {count > 0 && count < 120 && count}
                  </Button>
                </Col>
              </Row>
              <Controller
                control={control}
                name="phoneOtp"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.phoneOtp && 'error'}
                    help={errors.phoneOtp && `${errors.phoneOtp.message}`}
                  >
                    <Input {...field} placeholder="Mã xác nhận" />
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.email && 'error'}
                    help={errors.email && `${errors.email.message}`}
                  >
                    <Input {...field} placeholder="Email" />
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
                    <Input.Password {...field} placeholder="Mật khẩu" />
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.dob && 'error'}
                    help={errors.dob && `${errors.dob.message}`}
                  >
                    <DatePicker
                      {...field}
                      status={errors.dob && 'error'}
                      style={{ width: '100%' }}
                      format="DD/MM/YYYY"
                      placeholder="Ngày sinh"
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.gender && 'error'}
                    help={errors.gender && `${errors.gender.message}`}
                  >
                    <Select placeholder="Giới tính" {...field}>
                      <Option value="MALE">Nam</Option>
                      <Option value="FEMALE">Nữ</Option>
                      <Option value="OTHER">Khác</Option>
                    </Select>
                  </Form.Item>
                )}
              />
              {/* <Controller
        control={control}
        name="receivePromotion"
        render={({ field }) => (
          <Form.Item valuePropName="checked">
            <Checkbox {...field}>
              Nhận các thông tin và chương trình khuyến mãi của Vua Rau Sạch qua
              email.
            </Checkbox>
          </Form.Item>
        )}
      /> */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Đăng ký
                </Button>
              </Form.Item>
              <Typography>
                Khi bạn nhấn Đăng ký, bạn đã đồng ý thực hiện mọi giao dịch mua
                bán theo{' '}
                <Link href="/" target="_blank">
                  <a>điều kiện sử dụng và chính sách</a>
                </Link>
              </Typography>
            </form>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Space>
        </div>
      </Col>
    </Row>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <WrapLayout>{page}</WrapLayout>
}

export default Register
