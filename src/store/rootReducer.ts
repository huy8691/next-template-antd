/**
 * @Copyright 2020, Exnodes. All Rights Reserved.
 * @date 2022/02/08 21:48
 */

import loginReducer from 'pages/login/loginSlice'
import themeReducer from '../store/theme/themeSlice'
import registerReducer from 'pages/register/registerSlice'
import loadingReducer from '../store/loading/loadingSlice'
import notificationReducer from '../store/notification/notificationSlice'
import userInfoSaga from '../store/userInfo/userInfoSlice'
export const rootReducer = {
  login: loginReducer,
  register: registerReducer,
  loading: loadingReducer,
  theme: themeReducer,
  notification: notificationReducer,
  userInfo: userInfoSaga,
}

export default rootReducer
