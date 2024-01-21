import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TextInputActions } from './actions';

import { User } from "interfaces/index"

import { Score } from "interfaces/index"
import { Action, AnyAction } from 'redux';

export interface State {
    loading: boolean
    user: User | null 
    score: Score | null 
    error: Error | null 
}

export const initialState: State = {
    loading: true,
    user: null,
    score: null,
    error: null
}

export const reducer = reducerWithInitialState(initialState)
.case(TextInputActions.signIn.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.signIn.done, (state, payload) => {
    return { ...state, user:payload.result, loading: false, error: null }
})
.case(TextInputActions.signIn.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.signUp.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.signUp.done, (state, payload) => {
    return { ...state, user:payload.result, loading: false, error: null }
})
.case(TextInputActions.signUp.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.signOut.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.signOut.done, (state) => {
    return { ...state, user:null, score:null, loading: false, error: null }
})
.case(TextInputActions.signOut.failed, (state, payload) => {
    return { ...state, user:null, score:null, loading: false, error: payload.error }
})

.case(TextInputActions.updateUser.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.updateUser.done, (state, payload) => {
    return { ...state, user:payload.result, loading: false, error: null }
})
.case(TextInputActions.updateUser.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.deleteUser.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.deleteUser.done, (state) => {
    return { ...state, user:null, score:null, loading: false, error: null }
})
.case(TextInputActions.deleteUser.failed, (state, payload) => {
    return { ...state, user:null, score:null, loading: false, error: payload.error }
})

.case(TextInputActions.fetchUser.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.fetchUser.done, (state, payload) => {
    return { ...state, user:payload.result, loading: false, error: null }
})
.case(TextInputActions.fetchUser.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error  }
})

.case(TextInputActions.fetchScore.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.fetchScore.done, (state, payload) => {
    return { ...state, score:payload.result ,loading: false, error: null }
})
.case(TextInputActions.fetchScore.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.createScore.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.createScore.done, (state, payload) => {
    return { ...state, score:payload.result ,loading: false, error: null }
})
.case(TextInputActions.createScore.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.updateScore.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.updateScore.done, (state, payload) => {
    return { ...state, score:payload.result, loading: false, error: null }
})
.case(TextInputActions.updateScore.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.addUserIdToScore.started, (state) => {
    return { ...state, loading: true, error: null }
})
.case(TextInputActions.addUserIdToScore.done, (state, payload) => {
    return { ...state, score:payload.result, loading: false, error: null }
})
.case(TextInputActions.addUserIdToScore.failed, (state, payload) => {
    return { ...state, loading: false, error: payload.error }
})

.case(TextInputActions.clearState.started, (state) => {
    return { ...state, loading: true }
})
.case(TextInputActions.clearState.done, (state) => {
    return { ...state, loading: false, user: null, score: null, error:null}
})



/*export const Reducer = (state = initialState, action: Action | AnyAction) =>{
    switch (action.type) {

        case START_LOADING :{
            return { ...state, loading: true }
        }
        case FINISH_LOADING :{
            return { ...state, loading: false }
        }

        case FETCH_USER :{
            return { ...state }
        }
        case SUCCESS_FETCH_USER_API :{
            return { ...state, user: action.user }
        }
        case FAIL_FETCH_USER_API :{
            return { ...state }
        }

        case FETCH_SCORE :{
            return { ...state }
        }
        case SUCCESS_FETCH_SCORE_API :{
            return { ...state, score: action.score as Score }
        }
        case FAIL_FETCH_SCORE_API :{
            return { ...state }
        }

        case CREATE_SCORE :{
            return { ...state}
        }
        case SUCCESS_CREATE_SCORE_API :{
            return { ...state, score: action.score  as Score}
        }
        case FAIL_CREATE_SCORE_API :{
            return { ...state }
        }

        case UPDATE_SCORE :{
            return { ...state}
        }
        case SUCCESS_UPDATE_SCORE_API :{
            return { ...state, score: action.score as Score }
        }
        case FAIL_UPDATE_SCORE_API :{
            return { ...state }
        }
        
    }
}*/