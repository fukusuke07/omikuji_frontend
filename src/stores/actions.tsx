import { actionCreatorFactory } from 'typescript-fsa';
import { State } from './reducer'
import { SignInData, SignUpData, UpdateUserFormData, User } from "interfaces/index"
import { Score } from "interfaces/index"

/*export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

export const FETCH_USER = 'FETCH_USER'
export const SUCCESS_FETCH_USER_API = 'SUCCESS_FETCH_USER_API'
export const FAIL_FETCH_USER_API = 'FAIL_FETCH_USER_API'

export const SEARCH_SCORE = 'SEARCH_SCORE'
export const SUCCESS_SEARCH_SCORE_API = 'SUCCESS_SEARCH_SCORE_API'
export const FAIL_SEARCH_SCORE_API = 'FAIL_SEARCH_SCORE_API'

export const FETCH_SCORE = 'FETCH_SCORE'
export const SUCCESS_FETCH_SCORE_API = 'SUCCESS_FETCH_SCORE_API'
export const FAIL_FETCH_SCORE_API = 'FAIL_FETCH_SCORE_API'

export const CREATE_SCORE = 'CREATE_SCORE'
export const SUCCESS_CREATE_SCORE_API = 'SUCCESS_CREATE_SCORE_API'
export const FAIL_CREATE_SCORE_API = 'FAIL_CREATE_SCORE_API'

export const UPDATE_SCORE = 'UPDATE_SCORE'
export const SUCCESS_UPDATE_SCORE_API = 'SUCCESS_UPDATE_SCORE_API'
export const FAIL_UPDATE_SCORE_API = 'FAIL_UPDATE_SCORE_API'

export const CLEAR_STATE = 'CLEAR_STATE'*/

const actionCreator = actionCreatorFactory("saga")
 
export const fetchStateFromCookiesOperation = actionCreator<void>('FETCH_STATE_FROM_COOKIES_OPERATION')

export const signInOperation = actionCreator<{
    signInData: SignInData;
    delay: number;
    promise?: {
        resolve(result: { quote: User | null }): void;
        reject(error: string[]): void;
    };
}>('SIGN_IN_OPERATION')

export const signUpOperation = actionCreator<{
    signUpData: SignUpData;
    delay: number;
    promise?: {
        resolve(result: { quote: User | null }): void;
        reject(error: string[]): void;
    };
}>('SIGN_UP_OPERATION')

export const signOutOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: string | null }): void;
        reject(error: string[]): void;
    };
}>('SIGN_OUT_OPERATION')

export const updateUserOperation = actionCreator<{
    delay: number;
    updateUserFormData: UpdateUserFormData;
    promise?: {
        resolve(result: { quote: User| null }): void;
        reject(error: string[]): void;
    };
}>('UPDATE_USER_OPERATION')

export const deleteUserOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: string | null }): void;
        reject(error: string[]): void;
    };
}>('DELETE_USER_OPERATION')

export const fetchUserOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: User | null }): void;
        reject(error: string[]): void;
    };
}>('FETCH_USER_OPERATION')

export const fetchScoreOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: Score | null }): void;
        reject(error: string[]): void;
    };
}>('FETCH_SCORE_OPERATION')

export const createScoreOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: Score | null }): void;
        reject(error: string[]): void;
    };
}>('CREATE_SCORE_OPERATION')

export const updateScoreOperation = actionCreator<{
    signInData: SignInData;
    delay: number;
    promise?: {
        resolve(result: { quote: Score | null }): void;
        reject(error: string[]): void;
    };
}>('UPDATE_SCORE_OPERATION')

export const clearStateOperation = actionCreator<{
    delay: number;
    promise?: {
        resolve(result: { quote: string | null }): void;
    };
}>('CLEAR_STATE_OPERATION')

export const errorOperation = actionCreator('ERROR_OPERATION')

export const TextInputActions = {

    fetchStateFromCookies: actionCreator.async<void,State,Error>('FETCH_STATE_FROM_COOKIES'),

    signIn: actionCreator.async<void,User,Error>('SIGN_IN'),

    signUp: actionCreator.async<void,User,Error>('SIGN_UP'),

    signOut: actionCreator.async<void,void,Error>('SIGN_OUT'),

    deleteUser: actionCreator.async<void,void,Error>('DELETE_USER'),

    updateUser: actionCreator.async<void,User,Error>('UPDATE_USER'),

    fetchUser: actionCreator.async<void,User,Error>('FETCH_USER'),

    fetchScore: actionCreator.async<void,Score,Error>('FETCH_SCORE'),

    createScore: actionCreator.async<void,Score,Error>('CREATE_SCORE'),
 
    updateScore: actionCreator.async<void,Score,Error>('UPDATE_SCORE'),

    clearState: actionCreator.async<void,void,Error>('CLEAR_STATE'),

    addUserIdToScore: actionCreator.async<void,Score,Error>('ADD_USER_ID_TO_SCORE'),

}

