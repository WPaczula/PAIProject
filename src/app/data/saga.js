import { all } from 'redux-saga/effects'
import userSaga from './user/saga'
import categorySaga from './category/saga'
import eventSaga from './event/saga'
import globalSaga from './global/saga'
import Api from '../lib/api/index'
import { apiUrl } from '../../../config'

const api = new Api(apiUrl)

export default function* sagas() {
  yield all([
    userSaga(api),
    categorySaga(api),
    eventSaga(api),
    globalSaga(api),
  ])
}
