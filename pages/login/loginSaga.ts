/**
 * @Copyright 2020, Exnodes. All Rights Reserved.
 * @date 2022/02/08 21:48
 */
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { call, put, takeLatest } from 'redux-saga/effects'
import { loginAPI } from './loginAPI'
import { LoginResponseType } from './loginModels'
import { loginActions } from './loginSlice'
import { loadingActions } from 'src/store/loading/loadingSlice'
import { notificationActions } from 'src/store/notification/notificationSlice'

function* handleLogin({ payload }: ReturnType<typeof loginActions.doLogin>) {
  try {
    yield put(loadingActions.doLoading())
    const { data }: AxiosResponse<LoginResponseType> = yield call(
      loginAPI,
      payload
    )
    yield put(loginActions.doLoginSuccess(data))
    yield put(loadingActions.doLoadingSuccess())
    yield put(
      notificationActions.doNotification({
        message: 'Đăng nhập thành công',
      })
    )
    window.location.reload()
  } catch (error: any) {
    yield put(loginActions.doLoginFailure())
    yield put(loadingActions.doLoadingFailure())
    yield put(
      notificationActions.doNotification({
        message: error.response.data.message,
        type: 'error',
      })
    )
  }
}

function* handleLogout() {
  yield Cookies.remove('token')
  yield (window.location.href = '/login')
  // yield put(notificationActions.doNotification({
  //   message:"Đăng xuất thành công"
  // }));
}

function* loginSaga() {
  yield takeLatest(loginActions.doLogin.type, handleLogin)
  yield takeLatest(loginActions.doLogout.type, handleLogout)
}

export default loginSaga
