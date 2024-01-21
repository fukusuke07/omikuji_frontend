import { combineReducers, createStore, compose, applyMiddleware} from 'redux'
import { reducer, State } from './reducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import {rootSaga} from './saga'

const sagaMiddleware = createSagaMiddleware()

export type AppState = {
  state: State
}

const configureStore = () => {
  const store = createStore(combineReducers<AppState>({
    state: reducer
  }), composeWithDevTools(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(rootSaga)

  return store
}

const store = configureStore()

export default store