import * as Yup from 'yup'

const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/

const schema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập tên đăng nhập của bạn'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu ít nhất có 8 ký tự')
    // .matches(/^(?=.*[a-z])/, 'Phải chứa ít nhất một ký tự viết thường')
    .matches(/^(?=.*[A-Z])/, 'Phải chứa ít nhất một ký tự viết hoa')
    .matches(/^(?=.*[0-9])/, 'Phải chứa ít nhất một chữ số'),
  // .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
  email: Yup.string()
    .email('Email không đúng')
    .max(255)
    .required('Vui lòng nhập email'),
  dob: Yup.date()
    .required('Vui lòng nhập ngày sinh')
    .nullable()
    .default(undefined),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không đúng'),
  phoneOtp: Yup.string().required('Vui lòng nhập mã OTP'),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
})

export { schema, phoneRegExp }
