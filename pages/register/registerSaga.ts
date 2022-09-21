/**
 * @Copyright 2020, Exnodes. All Rights Reserved.
 * @date 2022/02/08 21:48
 */
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { registerAPI } from './registerAPI'
import { RegisterResponseType } from './registerModels'
import { registerActions } from './registerSlice'
import { loadingActions } from 'src/store/loading/loadingSlice'
import { notificationActions } from 'src/store/notification/notificationSlice'

function* handleRegister({
  payload,
}: ReturnType<typeof registerActions.doRegister>) {
  try {
    yield put(loadingActions.doLoading())
    const { data }: AxiosResponse<RegisterResponseType> = yield call(
      registerAPI,
      payload
    )
    yield put(registerActions.doRegisterSuccess(data))
    yield put(
      notificationActions.doNotification({
        message: 'Tạo tài khoản thành công',
      })
    )
    yield put(loadingActions.doLoadingSuccess())
  } catch (error: any) {
    yield put(registerActions.doRegisterFailure())
    yield put(loadingActions.doLoadingFailure())
    yield put(
      notificationActions.doNotification({
        message: error.response.data.message,
        type: 'error',
      })
    )
  }
}

function* registerSaga() {
  yield takeLatest(registerActions.doRegister.type, handleRegister)
}

export default registerSaga
