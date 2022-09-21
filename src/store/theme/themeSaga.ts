import { takeLatest } from 'redux-saga/effects'
import { themeActions } from './themeSlice'

function* handleTheme() {}
function* themeSaga() {
  yield takeLatest(themeActions.doTheme.type, handleTheme)
}
export default themeSaga
