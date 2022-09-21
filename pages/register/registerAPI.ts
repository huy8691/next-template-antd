import { AxiosResponse } from 'axios'
import { callAPI } from 'src/services/jwt-axios'
import { RegisterType, RegisterResponseType } from './registerModels'

const registerAPI = (
  data: RegisterType
): Promise<AxiosResponse<RegisterResponseType>> => {
  return callAPI({
    url: '/customers',
    method: 'post',
    data: data,
  })
}

const phoneOtpAPI = (data: string): Promise<AxiosResponse> => {
  return callAPI({
    url: '/users/request-send-otp',
    method: 'post',
    data: {
      context: 'CREATE_CUSTOMER',
      identity: data,
      method: 'SMS',
      format: 'NUMBER_ONLY',
    },
  })
}

export { registerAPI, phoneOtpAPI }
