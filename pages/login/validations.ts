import * as yup from 'yup'

const schema = yup.object().shape({
  identity: yup.string().required('Vui lòng nhập tên đăng nhập của bạn'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  // .password('Password invalid'),
})

export { schema }
