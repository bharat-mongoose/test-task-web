import { select, put, takeLatest, all } from 'redux-saga/effects';
import { getReq } from '../utils.js/basicReq';

function* getRepositoryData() {
  const { repositoryData, date, page } = yield select(state => state.allRepository);
  yield put({ type: 'SET_IS_LOADING', payload: (true) });
  const response = yield getReq(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`);
  try {
    if (response.status) {
      if (page > 1) {
        yield put({
          type: 'GET_REPOSITORY_DATA', payload: { data: [...repositoryData, ...response.data.items] }
        });
      }
      else {
        yield put({
          type: 'GET_REPOSITORY_DATA', payload: { data: [...response.data.items] }
        });
      }
    }
    else {

    }
    yield put({ type: 'SET_IS_LOADING', payload: (false) });
  } catch (e) {
    yield put({ type: 'SET_IS_LOADING', payload: (false) });
  }
}

function* actionWatcher() {
  yield takeLatest('SET_REPOSITORY_DATA', getRepositoryData);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}