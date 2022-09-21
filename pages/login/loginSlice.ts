import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAuthToken } from 'src/services/jwt-axios'
import { LoginResponseType, LoginType, UserInfoType } from './loginModels'

interface initialLoginStateType {
  data?: {
    access_token: string
    userInfo: UserInfoType
  }
}

const initialState: initialLoginStateType = {
  data: {
    access_token: '',
    userInfo: {
      avatar: '',
      email: '',
      fullName: '',
      id: 0,
      phoneNumber: '',
      status: 0,
    },
  },
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    doLogin(state: initialLoginStateType, _action: PayloadAction<LoginType>) {},
    doLoginSuccess(
      state: initialLoginStateType,
      action: PayloadAction<LoginResponseType>
    ) {
      const { data }: LoginResponseType = action.payload
      if (state.data) {
        state.data.access_token = data.access_token
        state.data.userInfo = data.userInfo
      }
      setAuthToken(data.access_token)
    },
    doLoginFailure(state: initialLoginStateType) {},
    doLogout(state: initialLoginStateType) {
      state.data = undefined
    },
  },
})

export const loginActions = loginSlice.actions
export default loginSlice.reducer
